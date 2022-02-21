import template from 'lodash.template';
import Component from '../abstract-component';
import SprintQuestionHTML from './sprint-question.html';
import './sprint-question.scss';
import state from '../../state';
import * as utils from '../../utils';

export default class SprintQuestion extends Component {
  constructor() {
    super('div', 'container justify-content-center sprint-question');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(SprintQuestionHTML)({
      isCorrectAnswer: state.isCorrestAnswer,
      score: 110,
      pointsForRightAnswer: 10,
      word: state.gameWordsForGuessing[state.wordsCounter].word,
      translate: state.sprintGameProposedAnswer,
    });
    this.addListeners();
    return this.container;
  }
  addListeners(): void {
    const answerButtons = this.container.querySelectorAll<HTMLButtonElement>('.answer-button');
    answerButtons.forEach((item) =>
      item.addEventListener('click', async () => {
        state.wordsCounter += 1;
        const proposedAnswer = utils.getRandomSprintAnswer()?.wordTranslate;
        if (proposedAnswer) {
          state.sprintGameProposedAnswer = proposedAnswer;
        }
        this.render();
      })
    );
  }
}
