import template from 'lodash.template';
import Component from '../abstract-component';
import GameProgressHTML from './game-progress.html';

export default class GameProgress extends Component {
    constructor() {
      super('div', 'game-progress');
    }

    render(): HTMLElement {
      this.container.innerHTML = template(GameProgressHTML)();
      return this.container;
    }
  }
