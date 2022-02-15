import template from 'lodash.template';
import Component from '../abstract-component';
import AudioCallOptionsHTML from './audio-call-options.html';
import * as utils from '../../utils';
import audioCall from '../../pages/audio-call/audio-call';
import state from '../../state';

export default class AudioCallOptions extends Component {
  constructor() {
    super('div', 'audiocall-options');
  }
  render(): HTMLElement {
    const answerOptions = utils.getRandomAnswerOptions();
    this.container.innerHTML = template(AudioCallOptionsHTML)({
      option1: answerOptions[0].wordTranslate,
      option2: answerOptions[1].wordTranslate,
      option3: answerOptions[2].wordTranslate,
      option4: answerOptions[3].wordTranslate,
      option5: answerOptions[4].wordTranslate,
    });
    this.addListeners();
    return this.container;
  }

  private addListeners(): void {
    function toggleSections(): void {
      document.querySelector<HTMLDivElement>('.audiocall-answer')?.classList.toggle('invisible');
      document.querySelector<HTMLDivElement>('.speaker-button')?.classList.toggle('invisible');
      document.querySelector<HTMLDivElement>('.btn-next')?.classList.toggle('invisible');
      document.querySelector<HTMLDivElement>('.btn-unknown')?.classList.toggle('invisible');
    }

    this.container.querySelectorAll<HTMLElement>('.btn-option').forEach((item) => {
      item.addEventListener('click', (event) => {
        const guess = (<HTMLButtonElement>event.target).dataset.word;
        const answerWordObject = state.gameWordsForGuessing[state.wordsCounter];
        const answer = answerWordObject.wordTranslate;

        if (guess === answer) {
          (<HTMLButtonElement>event.target).classList.remove('btn-outline-info');
          (<HTMLButtonElement>event.target).classList.add('btn-success');
          state.gameRightAnswers.push(answerWordObject!);
        } else {
          const rightAnswer = document.querySelector<HTMLButtonElement>(`[data-word="${answer}"]`)!;
          (<HTMLButtonElement>event.target).classList.remove('btn-outline-info');
          (<HTMLButtonElement>event.target).classList.add('btn-danger');
          rightAnswer.classList.remove('btn-outline-info');
          rightAnswer.classList.add('btn-success');
          state.gameWrongAnswers.push(answerWordObject!);
        }
        toggleSections();
      });
    });

    this.container.querySelector<HTMLButtonElement>('.btn-next')?.addEventListener('click', async () => {
      if (state.wordsCounter === state.gameWordsForGuessing.length - 1) {
        await audioCall();
        document.querySelector<HTMLButtonElement>('.btn-game-results')?.click();
      } else {
        audioCall();
        state.wordsCounter += 1;
        toggleSections();
      }
    });
  }
}
