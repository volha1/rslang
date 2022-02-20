import template from 'lodash.template';
import Component from '../abstract-component';
import SprintQuestionHTML from './sprint-question.html';
import './sprint-question.scss';
import store from '../../store';
import * as constants from '../../constants';

export default class SprintQuestion extends Component {
  constructor() {
    super('div', 'container justify-content-center sprint-question');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(SprintQuestionHTML)();
    this.addListeners();
    return this.container;
  }
  addListeners(): void {}
}
