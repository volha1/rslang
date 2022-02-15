import template from 'lodash.template';
import Component from '../abstract-component';
import GameResultHTML from './game-result.html';
import state from '../../state';

export default class GameResult extends Component {
  constructor() {
    super('div', 'game-result');
  }

  render(): HTMLElement {
    this.container.innerHTML = template(GameResultHTML)({ rightAnswers: state.gameRightAnswers, wrongAnswers: state.gameWrongAnswers });
    return this.container;
  }
}
