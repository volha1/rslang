import template from 'lodash.template';
import Component from '../abstract-component';
import HeaderHTML from './header.html';
import './header.scss';
import * as constants from '../../constants';
import LocalStorageService from '../../services/storage-service';
import AuthService from '../../services/auth-service';
import Routes from '../../enums/routes';

export default class Header extends Component {
  constructor() {
    super('header', 'header');
  }
  render(): HTMLElement {
    const userName = LocalStorageService.getUserName();
    this.container.innerHTML = template(HeaderHTML)({ name: userName });
    this.changeElementsVisibility();
    this.addListeners();
    return this.container;
  }

  private addListeners(): void {
    const currentRoute = localStorage.getItem(constants.currentRoute);
    this.container.querySelectorAll<HTMLElement>('.nav-link').forEach((item) => {
      if (
        item.dataset.route === currentRoute ||
        (item.dataset.route === 'textbook' && currentRoute === Routes.wordList)
      ) {
        item.classList.add('active');
      }
    });

    this.container.querySelector<HTMLElement>('.btn-logout')?.addEventListener('click', () => {
      LocalStorageService.deleteUserData();
      window.location.reload();
    });
  }

  private changeElementsVisibility(): void {
    if (AuthService.isLogged()) {
      this.container.querySelector<HTMLElement>('.btn-login')?.classList.add('invisible');
      this.container.querySelector<HTMLElement>('.nav-statistics')?.classList.add('visible');
    } else {
      this.container.querySelector<HTMLElement>('.btn-logout')?.classList.add('invisible');
      this.container.querySelector<HTMLElement>('.nav-statistics')?.classList.add('invisible');
    }
  }
}
