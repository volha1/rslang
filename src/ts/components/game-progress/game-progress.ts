import template from 'lodash.template';
import Component from '../abstract-component';
import GameProgressHTML from './game-progress.html';
import state from '../../state';
import { router } from '../../router';
import * as utils from '../../utils';

export default class GameProgress extends Component {
  constructor() {
    super('div', 'game-progress');
  }

  render(): HTMLElement {
    let rightAnswersPercentage = 0;
    if (state.gameRightAnswers.length + state.gameWrongAnswers.length !== 0) {
      rightAnswersPercentage = Math.round(
        (state.gameRightAnswers.length / (state.gameRightAnswers.length + state.gameWrongAnswers.length)) * 100
      );
    }
    this.container.innerHTML = template(GameProgressHTML)({ percentage: rightAnswersPercentage });
    this.addListeners();
    (async (): Promise<void> => {
      await utils.addWordToLearnedIfGuessed();
    })();
    return this.container;
  }

  addListeners(): void {
    this.container.querySelector('.btn-repeat')?.addEventListener('click', () => {
      router?.navigate(`${state.repeatGameBtnLink}`);
    });

    this.container.querySelector('.btn-textbook')?.addEventListener('click', () => {
      router?.navigate('/textbook');
    });
  }
}
