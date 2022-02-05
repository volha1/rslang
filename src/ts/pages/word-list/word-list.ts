import template from 'lodash.template';
import Header from '../../components/header/header';
import WordListHTML from './word-list.html';

export default function bootstrap(chapter: number, page: number): void {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  main.innerHTML = template(WordListHTML)({ chapter, page });
  body?.append(main);
}
