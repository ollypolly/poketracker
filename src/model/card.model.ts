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
  supertype: CardType
  text: string[];
}

export enum Rarity {
  COMMON = 'common'
}

export enum CardType {
  TRAINER = 'Trainer'
}