import { JSONWord } from './types/word';
import getWords from './services/word-list-service';
import { getUserWords } from './services/user-words-services';
import state from './state';
import store from './store';
import * as constants from './constants';
import AuthService from './services/auth-service';

function getRandomNumber(max: number): number {
  return Math.floor(1 + Math.random() * max);
}

async function getWordsPerPage(): Promise<void> {
  if (AuthService.isLogged()) {
    const userId = localStorage.getItem(constants.userId);
    const fromTextbook = (state.repeatGameBtnLink).includes('start');
    if (userId && store.chapter !== constants.difficultWordsChapter && fromTextbook) {
      state.gameWordsForGuessing.push(...await getUserWords(userId, 'allExcludedEasy'));
    } else if (userId && store.chapter !== constants.difficultWordsChapter && !fromTextbook) {
      state.gameWordsForGuessing = await getUserWords(userId, 'all');
    } else if (userId) {
      state.gameWordsForGuessing = await getUserWords(userId, 'allHard');
    }
  } else if (store.chapter !== constants.difficultWordsChapter) {
    state.gameWordsForGuessing = await getWords();
  }
}

function shuffleArray(array: Array<JSONWord>): Array<JSONWord> {
  const arrayCopy = array;
  for (let i = arrayCopy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
}

async function getWordsForGame(): Promise<void> {
  const initialPage = store.page;
  while (state.gameWordsForGuessing.length < constants.numberOfWords && store.page > 0) {
    // eslint-disable-next-line no-await-in-loop
    await getWordsPerPage();
    store.page -= 1;
  }

  store.page = initialPage;
  state.gameWordsForGuessing = shuffleArray(state.gameWordsForGuessing.slice(0, 20));
}

function getRandomAnswerOptions(): Array<JSONWord> {
  const answer = state.gameWordsForGuessing[state.wordsCounter];
  const guessingWords = [...state.gameWordsForGuessing];
  const newWords = shuffleArray(guessingWords).filter((item) => item.word !== answer.word);
  const result = [];
  for (let i = 0; i < constants.gameAnswerOptionsNumber; i++) {
    result.push(newWords[i]);
  }

  result.push(answer);
  return shuffleArray(result);
}

function cleanGameData(): void {
  state.wordsCounter = 0;
  state.gameRightAnswers = [];
  state.gameWrongAnswers = [];
  state.gameWordsForGuessing = [];
  state.preventAudioPlay = false;
}

export { getRandomNumber, shuffleArray, getWordsPerPage, getRandomAnswerOptions, cleanGameData, getWordsForGame };
