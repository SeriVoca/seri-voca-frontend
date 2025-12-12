export interface Meaning {
  partOfSpeech: string;
  textKo: string;
}

export interface Word {
  id: string;
  textEn: string;
  meanings: Meaning[];
}
