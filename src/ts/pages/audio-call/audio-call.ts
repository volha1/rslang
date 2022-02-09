import template from 'lodash.template';
import Header from '../../components/header/header';
import AudioCallHTML from './audio-call.html';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';

export default function bootstrap(): void {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  main.innerHTML = template(AudioCallHTML)();
  body?.append(main);
  const registration = new Registration();
  main.append(registration.render());
  const login = new Login();
  main.append(login.render());
}
