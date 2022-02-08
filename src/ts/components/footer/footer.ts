import template from 'lodash.template';
import Component from '../abstract-component';
import HeaderHTML from './footer.html';
import './footer.scss';

export default class Footer extends Component {
  constructor() {
    super('footer', 'bg-secondary');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(HeaderHTML)();
    return this.container;
  }
}
