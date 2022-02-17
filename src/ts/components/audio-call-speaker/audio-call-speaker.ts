import template from 'lodash.template';
import Component from '../abstract-component';
import AudioCallSpeakerHTML from './audio-call-speaker.html';
import * as constants from '../../constants';
import state from '../../state';
import { JSONWord } from '../../types/word';

export default class AudioCallSpeaker extends Component {
  private word: JSONWord;

  constructor() {
    super('div', 'row mb-5 speaker-button');
    this.word = state.gameWordsForGuessing[state.wordsCounter];
  }

  render(): HTMLElement {
    new Audio(`${constants.url}${this.word.audio}`).play();
    this.container.innerHTML = template(AudioCallSpeakerHTML)();
    this.addListeners();
    return this.container;
  }

  addListeners(): void {
    const wordAudio = new Audio(`${constants.url}${this.word.audio}`);

    async function playAudio(): Promise<void> {
      await wordAudio.play();
    }

    this.container.querySelector<HTMLButtonElement>('.btn-speaker')?.addEventListener('click', playAudio);
  }
}
