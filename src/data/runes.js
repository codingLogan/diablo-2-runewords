const RUNE_RECIPIES = {
  El: null,
  Eld: "3 El",
  Tir: "3 Eld",
  Nef: "3 Tir",
  Eth: "3 Nef",
  Ith: "3 Eth",
  Tal: "3 Ith",
  Ral: "3 Tal",
  Ort: "3 Ral",
  Thul: "3 Ort",
  Amn: "3 Thul + Chipped Topaz",
  Sol: "3 Amn + Chipped Amethyst",
  Shael: "3 Sol + Chipped Sapphire",
  Dol: "3 Shael + Chipped Ruby",
  Hel: "3 Dol + Chipped Emerald",
  Io: "3 Hel + Chipped Diamond",
  Lum: "3 Io + Flawed Topaz",
  Ko: "3 Lum + Flawed Amethyst",
  Fal: "3 Ko + Flawed Sapphire",
  Lem: "3 Fal + Flawed Ruby",
  Pul: "3 Lem + Flawed Emerald",
  Um: "2 Pul + Flawed Diamond",
  Mal: "2 Um + Topaz",
  Ist: "2 Mal + Amethyst",
  Gul: "2 Ist + Saphire",
  Vex: "2 Gul + Ruby",
  Ohm: "2 Vex + Emerald",
  Lo: "2 Ohm + Diamond",
  Sur: "2 Lo + Flawless Topaz",
  Ber: "2 Sur + Flawless Amethyst",
  Jah: "2 Ber + Flawless Sapphire",
  Cham: "2 Jah + Flawless Ruby",
  Zod: "2 Cham + Flawless Emerald",
};

const runes = [
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeEl.gif",
    name: "El",
    weapon: "+50 To Attack Rating, +1 Light Radius",
    armor: "+15 Defense, +1 To Light Radius",
    level: 11,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeEld.gif",
    name: "Eld",
    weapon: "+75% Damage To Undead, +50 Attack Rating Against Undead",
    armor: "15% Slower Stamina Drain/7% Increased Chance of Blocking(Shields)",
    level: 11,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeTir.gif",
    name: "Tir",
    weapon: "+2 To Mana After Each Kill",
    armor: "+2 To Mana After Each Kill",
    level: 13,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeNef.gif",
    name: "Nef",
    weapon: "Knockback",
    armor: "+30 Defense Vs. Missile",
    level: 13,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeEth.gif",
    name: "Eth",
    weapon: "-25% To Target Defense",
    armor: "Regenerate Mana 15%",
    level: 15,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeIth.gif",
    name: "Ith",
    weapon: "+9 To Maximum Damage",
    armor: "15% Damage Taken Goes to Mana",
    level: 15,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeTal.gif",
    name: "Tal",
    weapon: "+75 Poison Damage Over 5 Seconds",
    armor: "Poison Resist 30%/Poison Resist 35%(Shields)",
    level: 17,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeRal.gif",
    name: "Ral",
    weapon: "Adds 5-30 Fire Damage",
    armor: "Fire Resist 30%/Fire Resist 35%(Shields)",
    level: 19,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeOrt.gif",
    name: "Ort",
    weapon: "Adds 1-50 Lightning Damage",
    armor: "Lightning Resist 30%/Lightning Resist 35%(Shields)",
    level: 21,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeThul.gif",
    name: "Thul",
    weapon: "Adds 3-14 Cold Damage - 3 Second Duration",
    armor: "Cold Resist 30%/Cold Resist 35%(Shields)",
    level: 23,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeAmn.gif",
    name: "Amn",
    weapon: "7% Life Stolen Per Hit",
    armor: "Attacker Takes Damage of 14",
    level: 25,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeSol.gif",
    name: "Sol",
    weapon: "+9 To Minimum Damage",
    armor: "Damage Reduced By 7",
    level: 27,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeShae.gif",
    name: "Shael",
    weapon: "20% Increased Attack Speed",
    armor: "20% Faster Hit Recovery/20% Faster Block Rate(Shields)",
    level: 29,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeDol.gif",
    name: "Dol",
    weapon: "Hit Causes Monster To Flee 25%",
    armor: "Replenish Life +7",
    level: 31,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeHel.gif",
    name: "Hel",
    weapon: "Requirements -20%",
    armor: "Requirements -15%",
    level: 0,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeIo.gif",
    name: "Io",
    weapon: "+10 To Vitality",
    armor: "+10 To Vitality",
    level: 35,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeLum.gif",
    name: "Lum",
    weapon: "+10 To Energy",
    armor: "+10 To Energy",
    level: 37,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeKo.gif",
    name: "Ko",
    weapon: "+10 To Dexterity",
    armor: "+10 To Dexterity",
    level: 39,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeFal.gif",
    name: "Fal",
    weapon: "+10 To Strength",
    armor: "+10 To Strength",
    level: 41,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeLem.gif",
    name: "Lem",
    weapon: "75% Extra Gold From Monsters",
    armor: "50% Extra Gold From Monsters",
    level: 43,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runePul.gif",
    name: "Pul",
    weapon: "+75% Damage To Demons, +100 Attack Rating Against Demons",
    armor: "+30% Enhanced Defense",
    level: 45,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeUm.gif",
    name: "Um",
    weapon: "25% Chance of Open Wounds",
    armor: "All Resistances +15(Armor/Helms) +22(Shields)",
    level: 47,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeMal.gif",
    name: "Mal",
    weapon: "Prevent Monster Heal",
    armor: "Magic Damage Reduced By 7",
    level: 49,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeIst.gif",
    name: "Ist",
    weapon: "30% Better Chance of Getting Magic Items",
    armor: "25% Better Chance of Getting Magic Items",
    level: 51,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeGul.gif",
    name: "Gul",
    weapon: "20% Bonus To Attack Rating",
    armor: "5% To Maximum Poison Resist",
    level: 53,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeVex.gif",
    name: "Vex",
    weapon: "7% Mana Stolen Per Hit",
    armor: "5% To Maximum Fire Resist",
    level: 55,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeOhm.gif",
    name: "Ohm",
    weapon: "+50% Enhanced Damage",
    armor: "5% To Maximum Cold Resist",
    level: 57,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeLo.gif",
    name: "Lo",
    weapon: "20% Deadly Strike",
    armor: "5% To Maximum Lightning Resist",
    level: 59,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeSur.gif",
    name: "Sur",
    weapon: "Hit Blinds Target",
    armor: "Maximum Mana 5%/+50 To Mana (Shields)",
    level: 61,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeBer.gif",
    name: "Ber",
    weapon: "20% Chance of Crushing Blow",
    armor: "Damage Reduced by 8%",
    level: 63,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeJo.gif",
    name: "Jah",
    weapon: "Ignore Target's Defense",
    armor: "Increase Maximum Life 5%/+50 Life (Shields)",
    level: 65,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeCham.gif",
    name: "Cham",
    weapon: "Freeze Target +3",
    armor: "Cannot Be Frozen",
    level: 67,
  },
  {
    image:
      "http://classic.battle.net/images/battle/diablo2exp/images/runes/runeZod.gif",
    name: "Zod",
    weapon: "Indestructible",
    armor: "Indestructible",
    level: 69,
  },
];

export function getRunes() {
  return runes.map((rune) => ({
    ...rune,
    recipe: RUNE_RECIPIES[rune.name],
  }));
}

export default runes;
