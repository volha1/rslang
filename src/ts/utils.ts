import { JSONWord } from './types/word';
import getWords from './services/word-list-service';
import state from './state';
import * as constants from './constants';

function getRandomNumber(max: number): number {
  return Math.floor(1 + Math.random() * max);
}

async function getWordsPerPage(): Promise<void> {
  state.gameWordsForGuessing = await getWords();
}

function shuffleArray(array: Array<JSONWord>): Array<JSONWord> {
  const arrayCopy = array;
  for (let i = arrayCopy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
}

function getRandomAnswerOptions(): Array<JSONWord> {
  const answer = state.gameWordsForGuessing[state.wordsCounter];
  const guessingWords = [...state.gameWordsForGuessing];
  const newWords = shuffleArray(guessingWords).filter((item) => item.id !== answer.id);
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
}

export { getRandomNumber, shuffleArray, getWordsPerPage, getRandomAnswerOptions, cleanGameData };
