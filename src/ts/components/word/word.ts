import template from 'lodash.template';
import Component from '../abstract-component';
import WordHTML from './word.html';
import './word.scss';

export default class WordCard extends Component {
  constructor(
    public word: string,
    public image: string,
    public audio: string,
    public audioMeaning: string,
    public audioExample: string,
    public textMeaning: string,
    public textExample: string,
    public transcription: string,
    public textExampleTranslate: string,
    public textMeaningTranslate: string,
    public wordTranslate: string
  ) {
    super('div', 'word-card container my-2');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(WordHTML)({
      word: this.word,
      image: this.image,
      audio: this.audio,
      audioMeaning: this.audioMeaning,
      audioExample: this.audioExample,
      textMeaning: this.textMeaning,
      textExample: this.textExample,
      transcription: this.transcription,
      textExampleTranslate: this.textExampleTranslate,
      textMeaningTranslate: this.textMeaningTranslate,
      wordTranslate: this.wordTranslate,
    });
    this.addListeners();
    return this.container;
  }

  addListeners(): void {
    const wordAudio = new Audio(`https://learnwords-rslang-01.herokuapp.com/${this.audio}`);
    const wordMeaningAudio = new Audio(`https://learnwords-rslang-01.herokuapp.com/${this.audioMeaning}`);
    const wordExampleAudio = new Audio(`https://learnwords-rslang-01.herokuapp.com/${this.audioExample}`);

    async function playAudio(): Promise<void> {
      await wordAudio.play();
    }
    async function playMeaningAudio(): Promise<void> {
      await wordMeaningAudio.play();
    }
    async function playExampleAudio(): Promise<void> {
      await wordExampleAudio.play();
    }
    wordAudio.addEventListener('ended', playMeaningAudio);
    wordMeaningAudio.addEventListener('ended', playExampleAudio);

    this.container.querySelector<HTMLButtonElement>('.button-sound')?.addEventListener('click', playAudio);
  }
}
