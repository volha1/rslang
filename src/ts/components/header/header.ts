import template from 'lodash.template';
import Component from '../abstract-component';
import HeaderHTML from './header.html';
import './header.scss';
import * as constants from '../../constants';

export default class Header extends Component {
  constructor() {
    super('header', 'header');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(HeaderHTML)();
    this.addListeners();
    return this.container;
  }

  private addListeners(): void {
    const currentRoute = localStorage.getItem(constants.currentRoute);
    this.container.querySelectorAll<HTMLElement>('.nav-link').forEach((item) => {
      if (item.dataset.route === currentRoute) {
        item.classList.add('active');
      }
    });
  }
}
