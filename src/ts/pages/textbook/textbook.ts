import template from 'lodash.template';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import TextbookHTML from './textbook.html';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';
import './textbook.scss';

export default function bootstrap(): void {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  main.classList.add('main');
  main.innerHTML = template(TextbookHTML)();
  body?.append(main);
  const footer = new Footer();
  body?.append(footer.render());
  const registration = new Registration();
  main.append(registration.render());
  const login = new Login();
  main.append(login.render());
}
