import template from 'lodash.template';
import { JSONWord } from '../../types/word';
import Component from '../abstract-component';
import AudioCallHTML from './audio-call-answer.html';
import * as constants from '../../constants';
import state from '../../state';

export default class AudioCallAnswer extends Component {
  private wordObject: JSONWord;

  constructor() {
    super('div', 'row mb-2 audiocall-answer invisible');
    this.wordObject = state.gameWordsForGuessing[state.wordsCounter];
  }

  render(): HTMLElement {
    this.container.innerHTML = template(AudioCallHTML)({ image: this.wordObject.image, word: this.wordObject.word });
    this.addListeners();
    return this.container;
  }

  addListeners(): void {
    const wordAudio = new Audio(`${constants.url}${this.wordObject.audio}`);

    async function playAudio(): Promise<void> {
      await wordAudio.play();
    }

    this.container.querySelector<HTMLButtonElement>('.button-sound')?.addEventListener('click', playAudio);
  }
}
