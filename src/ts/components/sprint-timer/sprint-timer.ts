import template from 'lodash.template';
import Component from '../abstract-component';
import SprintTimerHTML from './sprint-timer.html';
import './sprint-timer.scss';
import store from '../../store';
import * as constants from '../../constants';

export default class SprintTimer extends Component {
  constructor() {
    super('div', 'container justify-content-center sprint-timer');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(SprintTimerHTML)();
    this.addListeners();
    return this.container;
  }
  addListeners(): void {}
}
