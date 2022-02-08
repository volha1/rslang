import Navigo from 'navigo';
import main from './pages/main/main';
import textbook from './pages/textbook/textbook';
import statistics from './pages/statistics/statistics';
import audioCall from './pages/audio-call/audio-call';
import sprint from './pages/sprint/sprint';
import wordList from './pages/word-list/word-list';
import * as constants from './constants';
import Routes from './enums/routes';

export default function routing(): void {
  const router = new Navigo('/', { hash: true });
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
    .on('/textbook/chapter/:chapter/page/:page', () => {
      localStorage.setItem(constants.currentRoute, Routes.textbook);
      wordList(1, 1);
    })
    .on('/mini-games/audio-call', () => {
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
