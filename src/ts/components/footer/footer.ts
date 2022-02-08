import template from 'lodash.template';
import Component from '../abstract-component';
import HeaderHTML from './footer.html';
import './footer.scss';
import * as constants from '../../constants';

export default class Footer extends Component {
  constructor() {
    super('footer', 'bg-secondary');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(HeaderHTML)();
    if (localStorage.getItem(constants.currentRoute) === 'textbook') {
      this.container.classList.add('textbook-footer');
    }
    return this.container;
  }
}
