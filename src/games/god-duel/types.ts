export type CardType = 'weapon' | 'shield' | 'miracle' | 'item';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  value: number; // Attack power, Shield defense, or Heal amount
  costMp?: number; // MP cost for miracles
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'divine';
  effect?: 'unblockable' | 'drain' | 'counter' | 'draw';
}

export interface Combatant {
  name: string;
  title: string;
  avatar: string;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  hand: Card[];
  isAi: boolean;
}

export type TurnPhase = 
  | 'PLAYER_ACTION'      // Player deciding to attack, heal, or pass
  | 'AI_DEFENDING'       // AI choosing whether to block player attack
  | 'AI_ACTION'          // AI choosing to attack, heal, or pass
  | 'PLAYER_DEFENDING'   // Player choosing whether to block AI attack
  | 'RESOLVING'          // Animations and combat numbers playing
  | 'GAME_OVER';         // Victory or defeat screen

export interface AttackPending {
  attacker: 'player' | 'ai';
  card: Card;
  damage: number;
}

export interface CombatLogEntry {
  id: string;
  text: string;
  type: 'attack' | 'defend' | 'heal' | 'miracle' | 'system' | 'critical';
  timestamp: string;
}
