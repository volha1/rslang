import template from 'lodash.template';
import Header from '../../components/header/header';
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
}
