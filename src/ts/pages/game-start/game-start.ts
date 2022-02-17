import template from 'lodash.template';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';
import GameStartHTML from './game-start.html';
import store from '../../store';
import state from '../../state';
import './game-start.scss';

function addListeners(): void {
  document.querySelector('.start-link')!.addEventListener('click', async () => {
       state.repeatGameBtnLink = '/mini-games/audio-call/start';
    });
}

export default function bootstrap(): void {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  main.classList.add('main');
  main.innerHTML = template(GameStartHTML)({ chapter: store.chapter });
  body?.append(main);
  const footer = new Footer();
  body?.append(footer.render());
  const registration = new Registration();
  main.append(registration.render());
  const login = new Login();
  main.append(login.render());
  addListeners();
}
