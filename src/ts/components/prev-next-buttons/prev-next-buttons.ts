import template from 'lodash.template';
import Component from '../abstract-component';
import PrevNextButtonsHTML from './prev-next-buttons.html';
import store from '../../store';
import { router } from '../../router';

export default class PrevNextButtons extends Component {
  constructor() {
    super('div', 'gap-2 d-flex justify-content-center mb-5');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(PrevNextButtonsHTML)();
    this.addListeners();
    return this.container;
  }
  addListeners(): void {
    const prev = this.container.querySelector('.button-prev');
    const next = this.container.querySelector('.button-next');
    prev?.addEventListener('click', () => {
      if (store.page !== 1) {
        router?.navigate(`/textbook/chapter/${store.chapter}/page/${store.page - 1}`);
      }
    });
    next?.addEventListener('click', () => {
        if (store.page !== 30) {
          router?.navigate(`/textbook/chapter/${store.chapter}/page/${store.page + 1}`);
        }
      });
  }
}
