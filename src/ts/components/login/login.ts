import template from 'lodash.template';
import Component from '../abstract-component';
import LoginHTML from './login.html';

export default class Login extends Component {
  constructor() {
    super('div', 'login');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(LoginHTML)();
    return this.container;
  }
}
