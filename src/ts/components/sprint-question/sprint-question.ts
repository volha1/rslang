import template from 'lodash.template';
import Component from '../abstract-component';
import SprintQuestionHTML from './sprint-question.html';
import './sprint-question.scss';
import state from '../../state';
import store from '../../store';
import * as utils from '../../utils';
import * as constants from '../../constants';

export default class SprintQuestion extends Component {
  constructor() {
    super('div', 'container justify-content-center sprint-question');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(SprintQuestionHTML)({
      width: store.sprintProgressBar,
      score: store.sprintScore,
      pointsForRightAnswer: store.sprintPointsForRightAnswer,
      word: state.gameWordsForGuessing[state.wordsCounter].word,
      translate: state.sprintGameProposedAnswer?.wordTranslate,
    });
    this.addListeners();
    return this.container;
  }
  addListeners(): void {
    const answerButtons = this.container.querySelectorAll<HTMLButtonElement>('.answer-button');
    const agreeButton = this.container.querySelector<HTMLButtonElement>('.agree-button');
    const disagreeButton = this.container.querySelector<HTMLButtonElement>('.disagree-button');
    const isRightAnswer = this.container.querySelector<HTMLElement>('.is-right-answer');
    const questionWrapper = this.container.querySelector<HTMLElement>('.question-wrapper');
    const progressBarSprint = this.container.querySelector<HTMLElement>('.progress-bar-sprint');

    function playWithKeyboard(e: KeyboardEvent): void {
      if (e.key === 'ArrowLeft') {
        disagreeButton?.click();
      }
      if (e.key === 'ArrowRight') {
        agreeButton?.click();
      }
    }

    function itIsRightAnswer(): void {
      if (isRightAnswer && progressBarSprint) {
        isRightAnswer.innerHTML = 'Верно!';
        isRightAnswer.classList.add('right-answer');
        questionWrapper?.classList.remove('border-info');
        questionWrapper?.classList.add('border-success');
        store.sprintScore += store.sprintPointsForRightAnswer;
        store.sprintProgressBar += 25;
        progressBarSprint.style.width = `${store.sprintProgressBar}%`;
        if (store.sprintProgressBar === 100) {
          store.sprintPointsForRightAnswer += 10;
          store.sprintProgressBar = 0;
        }
      }
    }
    function itIsWrongAnswer(): void {
      if (isRightAnswer && progressBarSprint) {
        isRightAnswer.innerHTML = 'Неверно.';
        isRightAnswer.classList.add('wrong-answer');
        questionWrapper?.classList.remove('border-info');
        questionWrapper?.classList.add('border-danger');
        store.sprintPointsForRightAnswer = 10;
        store.sprintProgressBar = 0;
        progressBarSprint.style.width = `${store.sprintProgressBar}%`;
      }
    }
    agreeButton?.addEventListener('click', () => {
      if (state.gameWordsForGuessing[state.wordsCounter].word === state.sprintGameProposedAnswer?.word) {
        itIsRightAnswer();
      } else {
        itIsWrongAnswer();
      }
    });

    disagreeButton?.addEventListener('click', () => {
      if (state.gameWordsForGuessing[state.wordsCounter].word !== state.sprintGameProposedAnswer?.word) {
        itIsRightAnswer();
      } else {
        itIsWrongAnswer();
      }
    });

    document.addEventListener('keyup', playWithKeyboard);

    answerButtons.forEach((item) =>
      item.addEventListener('click', async () => {
        console.log(state.wordsCounter);
        state.wordsCounter += 1;
        state.sprintGameProposedAnswer = utils.getRandomSprintAnswer();
        document.removeEventListener('keyup', playWithKeyboard);
        setTimeout(() => this.render(), 1000);
      })
    );

    const wordAudio = new Audio(`${constants.url}${state.gameWordsForGuessing[state.wordsCounter].audio}`);

    async function playAudio(): Promise<void> {
      await wordAudio.play();
    }

    this.container.querySelector<HTMLButtonElement>('.sprint-sound-button')?.addEventListener('click', playAudio);
  }
}
