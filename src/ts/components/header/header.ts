import template from 'lodash.template';
import Component from '../abstract-component';
import HeaderHTML from './header.html';

export default class Header extends Component {
  constructor() {
    super('header', 'header');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(HeaderHTML)({ sample: 'Статистика' });
    return this.container;
  }
}
