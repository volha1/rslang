import template from 'lodash.template';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';
import GameStartHTML from './game-start.html';
import store from '../../store';
import * as utils from '../../utils';
import { router } from '../../router';
import './game-start.scss';
import state from '../../state';

export default async function bootstrap(): Promise<void> {
  utils.cleanGameData();
  await utils.getWordsForGame();

  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  main.classList.add('main');
  main.innerHTML = template(GameStartHTML)({ chapter: store.chapter, currentGame: state.currentGame });
  body?.append(main);
  const footer = new Footer();
  body?.append(footer.render());
  const registration = new Registration();
  main.append(registration.render());
  const login = new Login();
  main.append(login.render());
  router?.updatePageLinks();
}
