import template from 'lodash.template';
import Header from '../../components/header/header';
import TextbookHTML from './textbook.html';
import './textbook.scss';

export default function load(): void {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  main.innerHTML = template(TextbookHTML)();
  body?.append(main);
}
