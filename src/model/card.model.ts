export interface SetData {
  code: string;
  expandedLegal: boolean;
  logoUrl: string;
  name: string;
  ptcgoCode: string;
  releaseDate: string;
  series: string;
  standardLegal: boolean;
  symbolUrl: string;
  totalCards: number;
  updatedAt: string;
}

export interface CardData {
  artist: string;
  id: string;
  imageUrl: string;
  imageUrlHiRes: string;
  name: string;
  number: string;
  rarity: Rarity;
  series: string;
  set: string;
  setCode: string;
  subtype: string;
  supertype: CardType;
  text: string[];
}

export enum Rarity {
  COMMON = "common",
}

export enum CardType {
  TRAINER = "Trainer",
}
