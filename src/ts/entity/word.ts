class Word {
  readonly id: string;
  readonly group: number;
  readonly page: number;
  readonly word: string;
  readonly image: string;
  readonly audio: string;
  readonly audioMeaning: string;
  readonly audioExample: string;
  readonly textMeaning: string;
  readonly textExample: string;
  readonly transcription: string;
  readonly textExampleTranslate: string;
  readonly textMeaningTranslate: string;
  readonly wordTranslate: string;

  constructor(
    id: string,
    group: number,
    page: number,
    word: string,
    image: string,
    audio: string,
    audioMeaning: string,
    audioExample: string,
    textMeaning: string,
    textExample: string,
    transcription: string,
    textExampleTranslate: string,
    textMeaningTranslate: string,
    wordTranslate: string
  ) {
    this.id = id;
    this.group = group;
    this.page = page;
    this.word = word;
    this.image = image;
    this.audio = audio;
    this.audioMeaning = audioMeaning;
    this.audioExample = audioExample;
    this.textMeaning = textMeaning;
    this.textExample = textExample;
    this.transcription = transcription;
    this.textExampleTranslate = textExampleTranslate;
    this.textMeaningTranslate = textMeaningTranslate;
    this.wordTranslate = wordTranslate;
  }
}

export default Word;
