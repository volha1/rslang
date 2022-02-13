import template from 'lodash.template';
import Component from '../abstract-component';
import GameResultHTML from './game-result.html';

export default class GameResult extends Component {
  constructor() {
    super('div', 'game-result');
  }

  render(): HTMLElement {
    this.container.innerHTML = template(GameResultHTML)();
    return this.container;
  }
}
