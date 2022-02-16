import Header from '../../components/header/header';
import WordListNav from '../../components/word-list-nav/word-list-nav';
import getWords from '../../services/word-list-service';
import WordCard from '../../components/word/word';
import PrevNextButtons from '../../components/prev-next-buttons/prev-next-buttons';
import Footer from '../../components/footer/footer';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';
import { router } from '../../router';
import store from '../../store';
import AuthService from '../../services/auth-service';
import { getUserWords } from '../../services/user-words-services';
import { JSONWords } from '../../types/word';
import * as constants from '../../constants';
import './word-list.scss';

function changeElementsVisibility(): void {
  if (!AuthService.isLogged()) {
    const authUserVisibleButtons = document.querySelectorAll<HTMLElement>('.auth-user-visible-buttons');
    authUserVisibleButtons?.forEach((item) => item.classList.add('invisible-btn'));
  } else if (AuthService.isLogged() && store.chapter === 7) {
    const buttonLearned = document.querySelectorAll<HTMLElement>('.button-learned');
    buttonLearned?.forEach((item) => item.classList.add('invisible-btn'));
  }
}

export default async function bootstrap(): Promise<void> {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  const wordsContainer = document.createElement('div');

  const userId = localStorage.getItem(constants.userId);
  const easyPages: number[] = [];

  async function checkIsEasyPage(): Promise<void> {
    if (userId) {
      const allHardOrEasyWordsInChapter = await getUserWords(userId, 'hardOrEasy');
      const counterHardOrEasyWordsOnPage = allHardOrEasyWordsInChapter.map((item) => item.page);
      for (let i = 0; i < constants.numberOfPagesAllChapters; i++) {
        if (counterHardOrEasyWordsOnPage.filter((item) => item === i).length === 20) {
          easyPages.push(i + 1);
        }
      }
    }
  }

  async function getWordsForPage(): Promise<JSONWords | undefined> {
    let wordsArray;
    if (AuthService.isLogged()) {
      if (userId && store.chapter !== 7) {
        wordsArray = await getUserWords(userId, 'all');
        await checkIsEasyPage();
      } else if (userId) {
        wordsArray = await getUserWords(userId, 'allHard');
      }
    } else if (store.chapter !== 7) {
      wordsArray = await getWords();
    }
    return wordsArray;
  }
  store.markedWordsCounter = 0;
  const wordsArray = await getWordsForPage();
  wordsArray?.forEach((item) => {
    const {
      id,
      _id,
      word,
      image,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textExample,
      transcription,
      textExampleTranslate,
      textMeaningTranslate,
      wordTranslate,
      userWord,
    } = item;
    const wordCard = new WordCard(
      id,
      _id,
      word,
      image,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textExample,
      transcription,
      textExampleTranslate,
      textMeaningTranslate,
      wordTranslate,
      userWord
    );
    wordsContainer.append(wordCard.render());
  });

  if (store.markedWordsCounter === 20 && store.chapter !== 7) {
    main.classList.add('easy-main');
  }

  main.append(wordsContainer);
  const wordListNav = new WordListNav(easyPages);
  main?.prepend(wordListNav.render());
  if (store.chapter !== 7) {
    const prevNextButtons = new PrevNextButtons();
    main.append(prevNextButtons.render());
  }
  body?.append(main);
  const footer = new Footer();
  body?.append(footer.render());
  const registration = new Registration();
  main.append(registration.render());
  const login = new Login();
  main.append(login.render());
  router?.updatePageLinks();
  changeElementsVisibility();
}
