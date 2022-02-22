import { JSONWord } from './types/word';
import getWords, { getWordsInGroup } from './services/word-list-service';
import { getUserWords } from './services/user-words-services';
import state from './state';
import store from './store';
import * as constants from './constants';
import AuthService from './services/auth-service';
import { updateStatistics, getStatistics } from './services/statistics-service';

function getRandomNumber(max: number): number {
  return Math.floor(1 + Math.random() * max);
}

function shuffleArray(array: Array<JSONWord>): Array<JSONWord> {
  const arrayCopy = array;
  for (let i = arrayCopy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
}

async function getWordsPerPage(): Promise<void> {
  const fromTextbook = state.repeatGameBtnLink.includes('start');
  if (AuthService.isLogged()) {
    const userId = localStorage.getItem(constants.userId);
    if (userId && store.chapter !== constants.difficultWordsChapter && fromTextbook) {
      const array = await getUserWords(userId, 'allExcludedEasy');
      state.gameWordsForGuessing.push(...shuffleArray(array));
    } else if (userId && store.chapter !== constants.difficultWordsChapter && !fromTextbook) {
      state.gameWordsForGuessing = shuffleArray(await getUserWords(userId, 'allInGroup'));
    } else if (userId) {
      state.gameWordsForGuessing = shuffleArray(await getUserWords(userId, 'allHard'));
    }
  } else if (store.chapter !== constants.difficultWordsChapter && fromTextbook) {
    const array = await getWords();
    state.gameWordsForGuessing.push(...shuffleArray(array));
  } else if (store.chapter !== constants.difficultWordsChapter && !fromTextbook) {
    const promiseArray = [];
    for (let i = 0; i < constants.numberOfPagesAllChapters; i += 1) {
      promiseArray.push(getWordsInGroup(i));
    }
    const array = await Promise.all(promiseArray);
    state.gameWordsForGuessing = shuffleArray(array.flat());
  }
}

async function getWordsForGame(): Promise<void> {
  const initialPage = store.page;
  if (state.currentGame === 'sprint' || !AuthService.isLogged()) {
    while (store.page > 0) {
      // eslint-disable-next-line no-await-in-loop
      await getWordsPerPage();
      store.page -= 1;
    }
  } else {
    while (state.gameWordsForGuessing.length < constants.numberOfWords && store.page > 0) {
      // eslint-disable-next-line no-await-in-loop
      await getWordsPerPage();
      store.page -= 1;
    }
  }

  store.page = initialPage;
  if (state.currentGame === 'audio-call') {
    state.gameWordsForGuessing = shuffleArray(state.gameWordsForGuessing.slice(0, 20));
  }
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

function getRandomSprintAnswer(): JSONWord | undefined {
  const answer = state.gameWordsForGuessing[state.wordsCounter];
  const guessingWords = [...state.gameWordsForGuessing];
  let possibleAnswer = shuffleArray(guessingWords).find((item) => item.word !== answer.word);
  if (Math.round(Math.random())) {
    possibleAnswer = answer;
  }
  return possibleAnswer;
}

function cleanGameData(): void {
  state.wordsCounter = 0;
  state.gameRightAnswers = [];
  state.gameWrongAnswers = [];
  state.gameWordsForGuessing = [];
  state.preventAudioPlay = false;
}

async function saveAudiocallStatistics(): Promise<void> {
  let audiocallRightAnswers;
  const statistics = await getStatistics();
  const sprintRightAnswers = statistics.optional?.sprintRightAnswers;
  let audiocallNewWords = statistics.optional?.newWords?.audiocall || [];
  const sprintNewWords = statistics.optional?.newWords?.sprint || [];

  if (statistics.optional?.audiocallRightAnswers) {
    audiocallRightAnswers = Math.round(
      ((state.gameRightAnswers.length / state.gameWordsForGuessing.length) * 100 +
        statistics.optional.audiocallRightAnswers) /
        2
    );
  } else {
    audiocallRightAnswers = Math.round((state.gameRightAnswers.length / state.gameWordsForGuessing.length) * 100);
  }

  state.gameWordsForGuessing.forEach((item) => audiocallNewWords.push(item._id!));
  audiocallNewWords = [...new Set(audiocallNewWords)];

  const statObj = {
    optional: {
      audiocallRightAnswers,
      sprintRightAnswers,
      newWords: {
        audiocall: audiocallNewWords,
        sprint: sprintNewWords
      }
    },
  };
  updateStatistics(statObj);
}

async function saveSprintStatistics(): Promise<void> {
  let sprintRightAnswers;
  const statistics = await getStatistics();
  const audiocallRightAnswers = statistics.optional?.audiocallRightAnswers;
  let sprintNewWords = statistics.optional?.newWords?.sprint || [];
  const audiocallNewWords = statistics.optional?.newWords?.audiocall || [];

  if (statistics.optional?.sprintRightAnswers) {
    sprintRightAnswers = Math.round(
      ((state.gameRightAnswers.length / state.gameWordsForGuessing.length) * 100 +
        statistics.optional.sprintRightAnswers) /
        2
    );
  } else {
    sprintRightAnswers = Math.round((state.gameRightAnswers.length / state.gameWordsForGuessing.length) * 100);
  }

  [...state.gameWrongAnswers, ...state.gameRightAnswers].forEach((item) => sprintNewWords.push(item._id!));
  sprintNewWords = [...new Set(sprintNewWords)];

  const statObj = {
    optional: {
      audiocallRightAnswers,
      sprintRightAnswers,
      newWords: {
        audiocall: audiocallNewWords,
        sprint: sprintNewWords
      }
    },
  };
  updateStatistics(statObj);
}

function resetSprintScore(): void {
  store.sprintScore = 0;
  store.sprintPointsForRightAnswer = 10;
  store.sprintProgressBar = 0;
}

export {
  getRandomNumber,
  shuffleArray,
  getWordsPerPage,
  getRandomAnswerOptions,
  cleanGameData,
  getWordsForGame,
  getRandomSprintAnswer,
  resetSprintScore,
  saveAudiocallStatistics,
  saveSprintStatistics
};
