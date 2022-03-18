import template from 'lodash.template';
import Component from '../abstract-component';
import AudioCallOptionsHTML from './audio-call-options.html';
import * as utils from '../../utils';
import audioCall from '../../pages/audio-call/audio-call';
import { deleteUserWord } from '../../services/user-words-services';
import state from '../../state';
import * as constants from '../../constants';

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
    function showAnswerElements(): void {
      document.querySelector('.audiocall-answer')?.classList.remove('invisible');
      document.querySelector('.btn-next')?.classList.remove('invisible');
      document.querySelector('.speaker-button')?.classList.add('invisible');
      document.querySelector('.btn-unknown')?.classList.add('invisible');
      document.querySelectorAll<HTMLButtonElement>('.btn-option').forEach((item) => {
        item.style.pointerEvents = 'none';
      });
    }

    function showGuessElements(): void {
      document.querySelector('.audiocall-answer')?.classList.add('invisible');
      document.querySelector('.btn-next')?.classList.add('invisible');
      document.querySelector('.speaker-button')?.classList.remove('invisible');
      document.querySelector('.btn-unknown')?.classList.remove('invisible');
    }

    function processGuess(button: HTMLButtonElement): void {
      const guess = button.dataset.word;
      const answerWordObject = state.gameWordsForGuessing[state.wordsCounter];
      const answer = answerWordObject.wordTranslate;
      button.classList.remove('btn-outline-info');

      if (guess === answer) {
        button.classList.add('btn-success');
        state.gameRightAnswers.push(answerWordObject);
      } else {
        const rightAnswer = document.querySelector<HTMLButtonElement>(`[data-word="${answer}"]`)!;
        button.classList.add('btn-danger');
        rightAnswer.classList.remove('btn-outline-info');
        rightAnswer.classList.add('btn-success');
        state.gameWrongAnswers.push(answerWordObject);
        const userId = localStorage.getItem(constants.userId);
        if (userId && answerWordObject?._id && answerWordObject?.userWord?.difficulty === 'easy') {
          deleteUserWord(userId, answerWordObject._id);
        }
      }
      showAnswerElements();
    }

    this.container.querySelectorAll<HTMLElement>('.btn-option').forEach((item) => {
      item.addEventListener('click', (event) => {
        const button = <HTMLButtonElement>event.target;
        processGuess(button);
      });
    });

    this.container.querySelector<HTMLButtonElement>('.btn-next')?.addEventListener('click', async () => {
      if (state.wordsCounter === state.gameWordsForGuessing.length - 1) {
        state.preventAudioPlay = true;
        await audioCall();
        if (localStorage.getItem(constants.userId)) {
          await utils.saveAudiocallStatistics();
        }

        document.querySelector<HTMLButtonElement>('.btn-game-results')?.click();
      } else {
        state.wordsCounter++;
        await audioCall();
        showGuessElements();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (+event.key === 1) {
        processGuess(document.querySelector<HTMLButtonElement>("[data-number='1']")!);
      }

      if (+event.key === 2) {
        processGuess(document.querySelector<HTMLButtonElement>("[data-number='2']")!);
      }

      if (+event.key === 3) {
        processGuess(document.querySelector<HTMLButtonElement>("[data-number='3']")!);
      }

      if (+event.key === 4) {
        processGuess(document.querySelector<HTMLButtonElement>("[data-number='4']")!);
      }

      if (+event.key === 5) {
        processGuess(document.querySelector<HTMLButtonElement>("[data-number='5']")!);
      }

      if (event.key === ' ') {
        processGuess(document.querySelector<HTMLButtonElement>("[data-number='6']")!);
      }
    });
  }
}
