import type { Card, Combatant, TurnPhase, AttackPending, CombatLogEntry } from './types';
import { getStartingHand, getRandomCard } from './cards';
import { sound } from './audio';

export interface DuelCallbacks {
  onStateChange: (state: DuelState) => void;
  onDamageEffect: (target: 'player' | 'ai', amount: number, isBlocked: boolean, isHeal?: boolean) => void;
}

export interface DuelState {
  player: Combatant;
  ai: Combatant;
  phase: TurnPhase;
  attackPending: AttackPending | null;
  log: CombatLogEntry[];
  winner: 'player' | 'ai' | null;
  turnCount: number;
}

export class GodDuelEngine {
  private state: DuelState;
  private callbacks: DuelCallbacks;

  constructor(callbacks: DuelCallbacks) {
    this.callbacks = callbacks;
    this.state = this.createInitialState();
  }

  private createInitialState(): DuelState {
    return {
      player: {
        name: 'Mortal Champion',
        title: 'Challenger',
        avatar: '🧙‍♂️',
        hp: 20,
        maxHp: 20,
        mp: 10,
        maxMp: 10,
        hand: getStartingHand(),
        isAi: false
      },
      ai: {
        name: 'Ares the War God',
        title: 'Deity of Conflict',
        avatar: '👹',
        hp: 20,
        maxHp: 20,
        mp: 10,
        maxMp: 10,
        hand: getStartingHand(),
        isAi: true
      },
      phase: 'PLAYER_ACTION',
      attackPending: null,
      log: [
        {
          id: 'log_0',
          text: '⚡ The celestial arena forms! Choose a card to strike, cast a miracle, or prepare your defense.',
          type: 'system',
          timestamp: '00:00'
        }
      ],
      winner: null,
      turnCount: 1
    };
  }

  public getState(): DuelState {
    return this.state;
  }

  public startNewGame() {
    this.state = this.createInitialState();
    this.callbacks.onStateChange(this.state);
  }

  private addLog(text: string, type: CombatLogEntry['type']) {
    const entry: CombatLogEntry = {
      id: `log_${Date.now()}_${Math.random()}`,
      text,
      type,
      timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' })
    };
    this.state.log.unshift(entry);
    if (this.state.log.length > 25) this.state.log.pop();
  }

  private refillHand(combatant: Combatant) {
    while (combatant.hand.length < 5) {
      combatant.hand.push(getRandomCard());
    }
  }

  // --- PLAYER ACTIONS ---

  public playerPlayCard(cardId: string) {
    if (this.state.phase !== 'PLAYER_ACTION') return;

    const cardIdx = this.state.player.hand.findIndex(c => c.id === cardId);
    if (cardIdx === -1) return;

    const card = this.state.player.hand[cardIdx];

    // Check MP cost for miracles
    if (card.type === 'miracle' && card.costMp && this.state.player.mp < card.costMp) {
      this.addLog(`❌ Not enough Miracle Points! Need ${card.costMp} MP.`, 'system');
      this.callbacks.onStateChange(this.state);
      return;
    }

    // Remove from hand
    this.state.player.hand.splice(cardIdx, 1);

    if (card.type === 'weapon') {
      sound.playAttack();
      this.addLog(`⚔️ You attack with ${card.name} for ${card.value} damage!`, 'attack');
      this.state.attackPending = {
        attacker: 'player',
        card,
        damage: card.value
      };
      this.state.phase = 'AI_DEFENDING';
      this.callbacks.onStateChange(this.state);

      // Trigger AI Defense Decision after brief pause for natural pacing
      setTimeout(() => this.executeAiDefense(), 750);

    } else if (card.type === 'miracle') {
      sound.playMiracle();
      if (card.costMp) this.state.player.mp -= card.costMp;

      if (card.effect === 'draw') {
        this.refillHand(this.state.player);
        this.addLog(`🌪️ You invoke ${card.name}, replenishing your hand!`, 'miracle');
      } else if (card.value > 0 && card.description.includes('Heal')) {
        // Healing miracle
        sound.playHeal();
        const healed = Math.min(card.value, this.state.player.maxHp - this.state.player.hp);
        this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + card.value);
        this.callbacks.onDamageEffect('player', card.value, false, true);
        this.addLog(`✨ You cast ${card.name} restoring +${healed} HP!`, 'heal');
      } else {
        // Offensive miracle
        this.addLog(`⚡ You summon ${card.name} blasting the deity for ${card.value} unblockable damage!`, 'critical');
        this.state.ai.hp = Math.max(0, this.state.ai.hp - card.value);
        this.callbacks.onDamageEffect('ai', card.value, false);
      }

      this.checkEndGameOrPassTurn('ai');

    } else if (card.type === 'item') {
      if (card.effect === 'unblockable') {
        sound.playAttack();
        this.state.ai.hp = Math.max(0, this.state.ai.hp - card.value);
        this.callbacks.onDamageEffect('ai', card.value, false);
        this.addLog(`🎯 You hurled ${card.name} dealing ${card.value} direct poison damage!`, 'attack');
      } else if (card.name.includes('Aether')) {
        sound.playHeal();
        this.state.player.mp = Math.min(this.state.player.maxMp, this.state.player.mp + card.value);
        this.addLog(`💎 You shattered ${card.name} gaining +${card.value} MP!`, 'heal');
      } else {
        sound.playHeal();
        const healed = Math.min(card.value, this.state.player.maxHp - this.state.player.hp);
        this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + card.value);
        this.callbacks.onDamageEffect('player', card.value, false, true);
        this.addLog(`🧪 You drank ${card.name} restoring +${healed} HP!`, 'heal');
      }
      this.checkEndGameOrPassTurn('ai');

    } else if (card.type === 'shield') {
      // Playing a shield on your own turn prepares a ward
      this.addLog(`🛡️ You hold ${card.name} in standby. Keep shields for defense reactions!`, 'system');
      this.state.player.hand.push(card); // return card
      this.callbacks.onStateChange(this.state);
    }
  }

  public playerPassTurn() {
    if (this.state.phase !== 'PLAYER_ACTION') return;
    sound.playCardDraw();
    this.state.player.mp = Math.min(this.state.player.maxMp, this.state.player.mp + 1);
    this.refillHand(this.state.player);
    this.addLog(`⏳ You prayed and rested (+1 MP, hand replenished). Turn passed.`, 'system');
    this.passTurnTo('ai');
  }

  // --- PLAYER DEFENSE REACTION ---

  public playerDefend(shieldId: string | null) {
    if (this.state.phase !== 'PLAYER_DEFENDING' || !this.state.attackPending) return;

    const attack = this.state.attackPending;

    if (shieldId) {
      const shieldIdx = this.state.player.hand.findIndex(c => c.id === shieldId);
      if (shieldIdx !== -1) {
        const shield = this.state.player.hand[shieldIdx];
        this.state.player.hand.splice(shieldIdx, 1);
        sound.playBlock();

        const remainingDamage = Math.max(0, attack.damage - shield.value);
        if (remainingDamage === 0) {
          this.addLog(`🛡️ PERFECT BLOCK! Your ${shield.name} completely absorbed the ${attack.damage} damage!`, 'defend');
          this.callbacks.onDamageEffect('player', 0, true);
        } else {
          this.state.player.hp = Math.max(0, this.state.player.hp - remainingDamage);
          this.callbacks.onDamageEffect('player', remainingDamage, false);
          this.addLog(`🛡️ Your ${shield.name} softened the blow! Took ${remainingDamage} damage (blocked ${shield.value}).`, 'defend');
        }

        // Spike shield counter effect
        if (shield.effect === 'counter') {
          this.state.ai.hp = Math.max(0, this.state.ai.hp - 2);
          this.callbacks.onDamageEffect('ai', 2, false);
          this.addLog(`🪞 Spike Barricade reflected 2 damage back at the deity!`, 'critical');
        }
      }
    } else {
      // Player takes full hit
      sound.playAttack();
      this.state.player.hp = Math.max(0, this.state.player.hp - attack.damage);
      this.callbacks.onDamageEffect('player', attack.damage, false);
      this.addLog(`💥 You endured the direct hit! Took -${attack.damage} damage.`, 'attack');
    }

    this.state.attackPending = null;
    this.refillHand(this.state.player);
    this.refillHand(this.state.ai);
    this.checkEndGameOrPassTurn('player');
  }

  // --- AI DECISION LOGIC ---

  private executeAiDefense() {
    if (this.state.phase !== 'AI_DEFENDING' || !this.state.attackPending) return;

    const attack = this.state.attackPending;
    const ai = this.state.ai;

    // Check if attack is unblockable
    if (attack.card.effect === 'unblockable') {
      sound.playAttack();
      ai.hp = Math.max(0, ai.hp - attack.damage);
      this.callbacks.onDamageEffect('ai', attack.damage, false);
      this.addLog(`💥 Unblockable! ${ai.name} took the full ${attack.damage} damage!`, 'critical');
      this.state.attackPending = null;
      this.refillHand(this.state.player);
      this.refillHand(ai);
      this.checkEndGameOrPassTurn('ai');
      return;
    }

    // AI searches for shields in hand
    const shields = ai.hand.filter(c => c.type === 'shield' || c.name.includes('Fog'));

    let chosenShield: Card | null = null;

    if (shields.length > 0) {
      // If incoming damage is lethal, MUST play best shield
      if (attack.damage >= ai.hp) {
        shields.sort((a, b) => b.value - a.value);
        chosenShield = shields[0];
      } else if (attack.damage >= 4) {
        // High damage: pick closest matching shield
        shields.sort((a, b) => Math.abs(a.value - attack.damage) - Math.abs(b.value - attack.damage));
        chosenShield = shields[0];
      } else if (Math.random() < 0.6) {
        // Light damage: 60% chance to guard, 40% save shield for later
        chosenShield = shields[0];
      }
    }

    if (chosenShield) {
      const idx = ai.hand.findIndex(c => c.id === chosenShield!.id);
      if (idx !== -1) ai.hand.splice(idx, 1);
      sound.playBlock();

      const remaining = Math.max(0, attack.damage - chosenShield.value);
      if (remaining === 0) {
        this.addLog(`🛡️ ${ai.name} raised ${chosenShield.name} completely blocking your ${attack.damage} damage!`, 'defend');
        this.callbacks.onDamageEffect('ai', 0, true);
      } else {
        ai.hp = Math.max(0, ai.hp - remaining);
        this.callbacks.onDamageEffect('ai', remaining, false);
        this.addLog(`🛡️ ${ai.name} raised ${chosenShield.name}! Blocked ${chosenShield.value}, taking ${remaining} damage.`, 'defend');
      }
    } else {
      sound.playAttack();
      ai.hp = Math.max(0, ai.hp - attack.damage);
      this.callbacks.onDamageEffect('ai', attack.damage, false);
      this.addLog(`💥 ${ai.name} took the direct hit for -${attack.damage} damage!`, 'attack');
    }

    this.state.attackPending = null;
    this.refillHand(this.state.player);
    this.refillHand(ai);
    this.checkEndGameOrPassTurn('ai');
  }

  private executeAiTurn() {
    if (this.state.winner) return;
    this.state.phase = 'AI_ACTION';
    this.callbacks.onStateChange(this.state);

    setTimeout(() => {
      const ai = this.state.ai;
      const player = this.state.player;

      // 1. Check if AI needs urgent healing (HP <= 7)
      const healCard = ai.hand.find(c => 
        (c.type === 'item' && c.description.includes('HP')) || 
        (c.type === 'miracle' && c.description.includes('Heal') && (!c.costMp || c.costMp <= ai.mp))
      );

      if (ai.hp <= 7 && healCard) {
        const idx = ai.hand.indexOf(healCard);
        ai.hand.splice(idx, 1);
        if (healCard.costMp) ai.mp -= healCard.costMp;
        sound.playHeal();
        const healed = Math.min(healCard.value, ai.maxHp - ai.hp);
        ai.hp = Math.min(ai.maxHp, ai.hp + healCard.value);
        this.callbacks.onDamageEffect('ai', healCard.value, false, true);
        this.addLog(`✨ ${ai.name} drank ${healCard.name} healing for +${healed} HP!`, 'heal');
        this.refillHand(ai);
        this.passTurnTo('player');
        return;
      }

      // 2. Check if lethal offensive miracle is available
      const lethalMiracle = ai.hand.find(c => 
        c.type === 'miracle' && c.value >= player.hp && (!c.costMp || c.costMp <= ai.mp)
      );
      if (lethalMiracle) {
        const idx = ai.hand.indexOf(lethalMiracle);
        ai.hand.splice(idx, 1);
        if (lethalMiracle.costMp) ai.mp -= lethalMiracle.costMp;
        sound.playMiracle();
        player.hp = Math.max(0, player.hp - lethalMiracle.value);
        this.callbacks.onDamageEffect('player', lethalMiracle.value, false);
        this.addLog(`⚡ ${ai.name} unleashes ${lethalMiracle.name} for lethal ${lethalMiracle.value} damage!`, 'critical');
        this.checkEndGameOrPassTurn('player');
        return;
      }

      // 3. Find weapons or attack items
      const weapons = ai.hand.filter(c => c.type === 'weapon' || (c.type === 'item' && c.effect === 'unblockable'));
      if (weapons.length > 0) {
        // Choose strongest weapon
        weapons.sort((a, b) => b.value - a.value);
        const weapon = weapons[0];
        const idx = ai.hand.indexOf(weapon);
        ai.hand.splice(idx, 1);

        sound.playAttack();
        this.addLog(`⚔️ ${ai.name} strikes with ${weapon.name} for ${weapon.value} damage!`, 'attack');

        this.state.attackPending = {
          attacker: 'ai',
          card: weapon,
          damage: weapon.value
        };
        this.state.phase = 'PLAYER_DEFENDING';
        this.callbacks.onStateChange(this.state);
        return;
      }

      // 4. If no weapons, check if non-lethal miracle is usable
      const miracle = ai.hand.find(c => c.type === 'miracle' && (!c.costMp || c.costMp <= ai.mp) && c.value > 0);
      if (miracle) {
        const idx = ai.hand.indexOf(miracle);
        ai.hand.splice(idx, 1);
        if (miracle.costMp) ai.mp -= miracle.costMp;
        sound.playMiracle();
        player.hp = Math.max(0, player.hp - miracle.value);
        this.callbacks.onDamageEffect('player', miracle.value, false);
        this.addLog(`⚡ ${ai.name} casts ${miracle.name} dealing ${miracle.value} divine damage!`, 'critical');
        this.checkEndGameOrPassTurn('player');
        return;
      }

      // 5. Otherwise pass and meditate
      sound.playCardDraw();
      ai.mp = Math.min(ai.maxMp, ai.mp + 1);
      this.refillHand(ai);
      this.addLog(`⏳ ${ai.name} gathers divine power (+1 MP). Passes turn.`, 'system');
      this.passTurnTo('player');
    }, 900);
  }

  // --- TURN & GAME OVER RESOLUTION ---

  private checkEndGameOrPassTurn(nextPlayer: 'player' | 'ai') {
    if (this.state.player.hp <= 0) {
      sound.playDefeat();
      this.state.winner = 'ai';
      this.state.phase = 'GAME_OVER';
      this.addLog(`💀 DEFEAT! You have fallen before the wrath of ${this.state.ai.name}.`, 'critical');
      this.callbacks.onStateChange(this.state);
      return;
    }

    if (this.state.ai.hp <= 0) {
      sound.playVictory();
      this.state.winner = 'player';
      this.state.phase = 'GAME_OVER';
      this.addLog(`👑 GLORY! You have vanquished the deity and claimed victory!`, 'critical');
      this.callbacks.onStateChange(this.state);
      return;
    }

    this.passTurnTo(nextPlayer);
  }

  private passTurnTo(next: 'player' | 'ai') {
    this.state.turnCount++;
    if (next === 'ai') {
      this.state.phase = 'AI_ACTION';
      this.callbacks.onStateChange(this.state);
      this.executeAiTurn();
    } else {
      this.state.phase = 'PLAYER_ACTION';
      this.callbacks.onStateChange(this.state);
    }
  }
}
