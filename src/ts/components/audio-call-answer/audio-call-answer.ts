import template from 'lodash.template';
import Word from '../../entity/word';
import Component from '../abstract-component';
import AudioCallHTML from './audio-call-answer.html';
import * as constants from '../../constants';
import state from '../../state';

export default class AudioCallAnswer extends Component {
  private word: Word;

  constructor() {
    super('div', 'row mb-2 audiocall-answer invisible');
    this.word = state.gameWordsForGuessing[state.wordsCounter];
  }

  render(): HTMLElement {
    this.container.innerHTML = template(AudioCallHTML)({ image: this.word.image, word: this.word.word });
    this.addListeners();
    return this.container;
  }

  addListeners(): void {
    const wordAudio = new Audio(`${constants.url}${this.word.audio}`);

    async function playAudio(): Promise<void> {
      await wordAudio.play();
    }

    this.container.querySelector<HTMLButtonElement>('.button-sound')?.addEventListener('click', playAudio);
  }
}
