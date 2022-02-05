import template from 'lodash.template';
import Header from '../../components/header/header';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';
import MainHTML from './main.html';

export default function bootstrap(): void {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  main.innerHTML = template(MainHTML)();
  body?.append(main);
  main.append(new Registration().render());
  main.append(new Login().render());
}
