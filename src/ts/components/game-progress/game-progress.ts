import template from 'lodash.template';
import Component from '../abstract-component';
import GameProgressHTML from './game-progress.html';
import state from '../../state';

export default class GameProgress extends Component {
    constructor() {
      super('div', 'game-progress');
    }

    render(): HTMLElement {
      const rightAnswersPercentage = Math.round((state.gameRightAnswers.length / state.gameWordsForGuessing.length) * 100);
      this.container.innerHTML = template(GameProgressHTML)({ percentage: rightAnswersPercentage });
      return this.container;
    }
  }
