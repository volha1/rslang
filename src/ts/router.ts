import Navigo from 'navigo';
import main from './pages/main/main';
import textbook from './pages/textbook/textbook';
import statistics from './pages/statistics/statistics';
import audioCall from './pages/audio-call/audio-call';
import sprint from './pages/sprint/sprint';
import wordList from './pages/word-list/word-list';
import gameSections from './pages/game-sections/game-sections';
import gameStart from './pages/game-start/game-start';
import * as constants from './constants';
import Routes from './enums/routes';
import store from './store';

export let router: undefined | Navigo;

export default function routing(): void {
  if (router) {
    return;
  }
  router = new Navigo('/', { hash: true });
  router.notFound(() => {
    localStorage.setItem(constants.currentRoute, Routes.main);
    main();
  });
  router
    .on('/', () => {
      localStorage.setItem(constants.currentRoute, Routes.main);
      main();
    })
    .on('/textbook', () => {
      localStorage.setItem(constants.currentRoute, Routes.textbook);
      textbook();
    })
    .on('/textbook/chapter/:chapter/page/:page', (data) => {
      localStorage.setItem(constants.currentRoute, Routes.wordList);
      if (data?.data?.chapter) {
        store.chapter = Number(data?.data?.chapter);
        store.page = Number(data?.data?.page);
      }
      wordList();
    })
    .on('/mini-games/audio-call', () => {
      localStorage.setItem(constants.currentRoute, Routes.miniGames);
      gameSections();
    })
    .on('/mini-games/audio-call/start', () => {
      localStorage.setItem(constants.currentRoute, Routes.miniGames);
      gameStart();
    })
    .on('/mini-games/audio-call/chapter/:chapter', () => {
      localStorage.setItem(constants.currentRoute, Routes.miniGames);
      audioCall();
    })
    .on('/mini-games/sprint', () => {
      localStorage.setItem(constants.currentRoute, Routes.miniGames);
      sprint();
    })
    .on('/statistics', () => {
      localStorage.setItem(constants.currentRoute, Routes.statistics);
      statistics();
    })
    .resolve();
}
