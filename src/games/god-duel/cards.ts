import type { Card } from './types';

export const CARD_DATABASE: Card[] = [
  // --- WEAPONS ---
  {
    id: 'w_bronze_sword',
    name: 'Bronze Blade',
    type: 'weapon',
    value: 3,
    icon: '🗡️',
    description: 'Deals 3 physical damage.',
    rarity: 'common'
  },
  {
    id: 'w_iron_spear',
    name: 'Iron Spear',
    type: 'weapon',
    value: 5,
    icon: '🔱',
    description: 'Thrusts for 5 physical damage.',
    rarity: 'common'
  },
  {
    id: 'w_storm_bow',
    name: 'Storm Bow',
    type: 'weapon',
    value: 4,
    icon: '🏹',
    description: 'Swift shot dealing 4 damage.',
    rarity: 'common'
  },
  {
    id: 'w_warhammer',
    name: 'Warhammer',
    type: 'weapon',
    value: 7,
    icon: '🔨',
    description: 'Heavy strike dealing 7 physical damage.',
    rarity: 'rare'
  },
  {
    id: 'w_dragon_blade',
    name: 'Dragonfang Saber',
    type: 'weapon',
    value: 9,
    icon: '⚔️',
    description: 'Fiery blade slashing for 9 damage.',
    rarity: 'divine'
  },
  {
    id: 'w_assassin_dagger',
    name: 'Shadow Dagger',
    type: 'weapon',
    value: 3,
    icon: '🗡️',
    description: 'Unblockable sneak attack dealing 3 pure damage.',
    rarity: 'rare',
    effect: 'unblockable'
  },
  {
    id: 'w_vampire_scythe',
    name: 'Soul Scythe',
    type: 'weapon',
    value: 5,
    icon: '⛏️',
    description: 'Deals 5 damage and absorbs 3 HP.',
    rarity: 'rare',
    effect: 'drain'
  },
  {
    id: 'w_thunder_cleaver',
    name: 'Thunder Cleaver',
    type: 'weapon',
    value: 6,
    icon: '🪓',
    description: 'Chops for 6 lightning-infused damage.',
    rarity: 'common'
  },

  // --- SHIELDS ---
  {
    id: 's_wooden_buckler',
    name: 'Wooden Buckler',
    type: 'shield',
    value: 3,
    icon: '🪵',
    description: 'Blocks up to 3 incoming damage.',
    rarity: 'common'
  },
  {
    id: 's_iron_shield',
    name: 'Iron Kite Shield',
    type: 'shield',
    value: 5,
    icon: '🛡️',
    description: 'Solid defense blocking up to 5 damage.',
    rarity: 'common'
  },
  {
    id: 's_tower_barrier',
    name: 'Tower Shield',
    type: 'shield',
    value: 7,
    icon: '🏰',
    description: 'Fortified guard blocking up to 7 damage.',
    rarity: 'rare'
  },
  {
    id: 's_aegis_mirror',
    name: 'Aegis of the Sun',
    type: 'shield',
    value: 10,
    icon: '☀️',
    description: 'Divine light barrier blocking up to 10 damage.',
    rarity: 'divine'
  },
  {
    id: 's_mirror_shield',
    name: 'Spike Barricade',
    type: 'shield',
    value: 4,
    icon: '🪞',
    description: 'Blocks 4 damage and counters 2 damage back.',
    rarity: 'rare',
    effect: 'counter'
  },
  {
    id: 's_mystic_ward',
    name: 'Rune Ward',
    type: 'shield',
    value: 6,
    icon: '🔮',
    description: 'Enchanted ward absorbing 6 damage.',
    rarity: 'common'
  },

  // --- MIRACLES (Cost MP) ---
  {
    id: 'm_divine_heal',
    name: 'Prayer of Life',
    type: 'miracle',
    value: 6,
    costMp: 3,
    icon: '✨',
    description: 'Heals 6 HP (Costs 3 MP).',
    rarity: 'common'
  },
  {
    id: 'm_thunderstrike',
    name: 'Wrath of Zeus',
    type: 'miracle',
    value: 8,
    costMp: 4,
    icon: '⚡',
    description: 'Heavenly bolt dealing 8 unblockable damage! (Costs 4 MP).',
    rarity: 'rare',
    effect: 'unblockable'
  },
  {
    id: 'm_super_nova',
    name: 'Solar Cataclysm',
    type: 'miracle',
    value: 12,
    costMp: 7,
    icon: '💥',
    description: 'Massive blast dealing 12 damage! (Costs 7 MP).',
    rarity: 'divine'
  },
  {
    id: 'm_divine_blessing',
    name: 'Nectar of Gods',
    type: 'miracle',
    value: 10,
    costMp: 5,
    icon: '🌟',
    description: 'Restores 10 HP to divine vessel (Costs 5 MP).',
    rarity: 'rare'
  },
  {
    id: 'm_mind_gale',
    name: 'Hermes Gust',
    type: 'miracle',
    value: 0,
    costMp: 2,
    icon: '🌪️',
    description: 'Draw 3 new cards instantly (Costs 2 MP).',
    rarity: 'common',
    effect: 'draw'
  },

  // --- ITEMS & CONSUMABLES ---
  {
    id: 'i_health_potion',
    name: 'Healing Elixir',
    type: 'item',
    value: 4,
    icon: '🧪',
    description: 'Quick gulp restoring 4 HP instantly.',
    rarity: 'common'
  },
  {
    id: 'i_mana_crystal',
    name: 'Aether Shard',
    type: 'item',
    value: 4,
    icon: '💎',
    description: 'Crush to restore 4 Miracle Points (MP).',
    rarity: 'common'
  },
  {
    id: 'i_poison_dart',
    name: 'Viper Dart',
    type: 'item',
    value: 3,
    icon: '🎯',
    description: 'Piercing dart dealing 3 unblockable poison damage.',
    rarity: 'common',
    effect: 'unblockable'
  },
  {
    id: 'i_smoke_bomb',
    name: 'Fog Bomb',
    type: 'item',
    value: 5,
    icon: '💨',
    description: 'Creates a smoke screen providing 5 shield defense.',
    rarity: 'common'
  }
];

// Helper to draw a random card weighted by rarity
export function getRandomCard(): Card {
  const roll = Math.random();
  let pool: Card[];
  if (roll < 0.65) {
    pool = CARD_DATABASE.filter(c => c.rarity === 'common');
  } else if (roll < 0.90) {
    pool = CARD_DATABASE.filter(c => c.rarity === 'rare');
  } else {
    pool = CARD_DATABASE.filter(c => c.rarity === 'divine');
  }
  const chosen = pool[Math.floor(Math.random() * pool.length)];
  // Return unique instance with distinct ID
  return { ...chosen, id: `${chosen.id}_${Math.random().toString(36).substring(2, 7)}` };
}

// Draw a starting hand of 5 cards with balanced distribution
export function getStartingHand(): Card[] {
  const hand: Card[] = [];
  // Ensure at least 1 weapon and 1 shield
  const weapons = CARD_DATABASE.filter(c => c.type === 'weapon');
  const shields = CARD_DATABASE.filter(c => c.type === 'shield');
  hand.push({ ...weapons[Math.floor(Math.random() * weapons.length)], id: `init_w_${Math.random()}` });
  hand.push({ ...shields[Math.floor(Math.random() * shields.length)], id: `init_s_${Math.random()}` });
  while (hand.length < 5) {
    hand.push(getRandomCard());
  }
  return hand;
}
