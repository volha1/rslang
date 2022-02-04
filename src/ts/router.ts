import Navigo from 'navigo';
import main from './pages/main/main';
import textbook from './pages/textbook/textbook';
import miniGames from './pages/mini-games/mini-games';
import statistics from './pages/statistics/statistics';
import audioCall from './pages/audio-call/audio-call';
import sprint from './pages/sprint/sprint';
import wordList from './pages/word-list/word-list';

export default function routing(): void {
  const router = new Navigo('/', { hash: true });

  router
    .on('/', () => {
      main();
    })
    .on('/textbook', () => {
      textbook();
    })
    .on('/textbook/chapter/:chapter/page/:page', () => {
      wordList(1, 1);
    })
    .on('/mini-games', () => {
      miniGames();
    })
    .on('/mini-games/audio-call', () => {
      audioCall();
    })
    .on('/mini-games/sprint', () => {
      sprint();
    })
    .on('/statistics', () => {
      statistics();
    })
    .resolve();
}
