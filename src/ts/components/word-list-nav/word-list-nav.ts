import template from 'lodash.template';
import Component from '../abstract-component';
import WordListNavHTML from './word-list-nav.html';
import AuthService from '../../services/auth-service';
import * as constants from '../../constants';
import store from '../../store';

export default class WordListNav extends Component {
  constructor() {
    super('div', 'word-list-nav');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(WordListNavHTML)({ chapter: store.chapter, page: store.page });
    const chooseChapter = this.container.querySelector('.choose-chapter');
    let numberOfChapters = constants.numberOfChaptersNoUser;
    if (AuthService.isLogged()) {
      numberOfChapters = constants.numberOfChaptersUser;
    }
    for (let i = 1; i <= numberOfChapters; i++) {
      const li = document.createElement('li');
      li.innerHTML = `<a class="dropdown-item" href="/textbook/chapter/${i}/page/1" data-navigo>Раздел ${i}</a>`;
      chooseChapter?.append(li);
    }
    const choosePage = this.container.querySelector('.choose-page');
    let numberOfPages = constants.numberOfPagesAllChapters;
    if (store.chapter === 7) {
      numberOfPages = constants.numberOfPagesChapter7;
    }
    for (let i = 1; i <= numberOfPages; i++) {
      const li = document.createElement('li');
      li.innerHTML = `<a class="dropdown-item" href="/textbook/chapter/${store.chapter}/page/${i}" data-navigo>Страница ${i}</a>`;
      choosePage?.append(li);
    }
    return this.container;
  }
}
