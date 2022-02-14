import Word from './entity/word';
import getWords from './services/word-list-service';
import state from './state';
import * as constants from './constants';

function getRandomNumber(max: number): number {
  return Math.floor(1 + Math.random() * max);
}

async function getWordsPerPage(): Promise<void> {
  const wordsArray = await getWords();

  const words: Array<Word> = [];
  wordsArray.map(
      (item: Word) =>
      words.push(new Word(
          item.id,
          item.group,
          item.page,
          item.word,
          item.image,
          item.audio,
          item.audioMeaning,
          item.audioExample,
          item.textMeaning,
          item.textExample,
          item.transcription,
          item.textExampleTranslate,
          item.textMeaningTranslate,
          item.wordTranslate
        ))
    );
    state.gameWordsForGuessing = words;
}

function shuffleArray(array: Array<Word>): Array<Word> {
  const arrayCopy = array;
  for (let i = arrayCopy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
}

function getRandomAnswerOptions(): Array<Word> {
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

export { getRandomNumber, shuffleArray, getWordsPerPage, getRandomAnswerOptions };
