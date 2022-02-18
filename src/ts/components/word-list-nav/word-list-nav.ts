import template from 'lodash.template';
import Component from '../abstract-component';
import WordListNavHTML from './word-list-nav.html';
import './word-list-nav.scss';
import AuthService from '../../services/auth-service';
import * as constants from '../../constants';
import store from '../../store';

export default class WordListNav extends Component {
  easyPages: number[];
  constructor(easyPages: number[]) {
    super('div', 'word-list-nav');
    this.easyPages = easyPages;
  }
  render(): HTMLElement {
    this.container.innerHTML = template(WordListNavHTML)({ chapter: store.chapter, page: store.page });
    const gamesFromPage = this.container.querySelector<HTMLButtonElement>('.games-from-page');
    if (gamesFromPage && store.markedWordsCounter === constants.numberOfWords) {
      gamesFromPage.disabled = true;
      gamesFromPage.style.cursor = 'not-allowed';
    }
    const chooseChapter = this.container.querySelector('.choose-chapter');
    let numberOfChapters = constants.numberOfChaptersNoUser;
    if (AuthService.isLogged()) {
      numberOfChapters = constants.numberOfChaptersUser;
    }
    for (let i = 1; i <= numberOfChapters; i++) {
      const li = document.createElement('li');
      li.classList.add(`chapter${i}`);
      li.innerHTML = `<a class="dropdown-item" href="/textbook/chapter/${i}/page/1" data-navigo>Раздел ${i}</a>`;
      chooseChapter?.append(li);
    }
    const choosePage = this.container.querySelector('.choose-page');
    let numberOfPages = constants.numberOfPagesAllChapters;
    if (store.chapter === constants.difficultWordsChapter) {
      numberOfPages = constants.numberOfPagesChapter7;
    }
    for (let i = 1; i <= numberOfPages; i++) {
      const li = document.createElement('li');
      li.innerHTML = `<a class="dropdown-item" href="/textbook/chapter/${store.chapter}/page/${i}" data-navigo>Страница ${i}</a>`;
      if (this.easyPages.indexOf(i) !== -1) {
        li.classList.add('easy-page');
      }
      choosePage?.append(li);
    }

    return this.container;
  }
}
