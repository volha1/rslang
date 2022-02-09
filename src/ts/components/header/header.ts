import template from 'lodash.template';
import Component from '../abstract-component';
import HeaderHTML from './header.html';
import './header.scss';
import * as constants from '../../constants';
import LocalStorageService from '../../services/storage-service';

export default class Header extends Component {
  constructor() {
    super('header', 'header');
  }
  render(): HTMLElement {
    const userName = LocalStorageService.getUserName() ?? '';
    this.container.innerHTML = template(HeaderHTML)({ name: userName });
    this.showAuthButtons(userName);
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

    this.container.querySelector<HTMLElement>('.btn-logout')?.addEventListener('click', () => {
      LocalStorageService.deleteUserData();
      window.location.replace('/');
    });
  }

  private showAuthButtons(userName: string): void {
    if (userName === '') {
      this.container.querySelector<HTMLElement>('.btn-logout')?.classList.add('hide');
    } else {
      this.container.querySelector<HTMLElement>('.btn-login')?.classList.add('hide');
    }
  }
}
