import * as constants from '../constants';
import store from '../store';
import { JSONWord, JSONWords } from '../types/word';

export default async function getWords(): Promise<JSONWords> {
  const response = await fetch(`${constants.wordsUrl}?page=${store.page - 1}&group=${store.chapter - 1}`);
  const wordsArray = await response.json();
  return wordsArray;
}

export async function getWordsInGroup(page: number): Promise<JSONWords> {
  const response = await fetch(`${constants.wordsUrl}?page=${page}&group=${store.chapter - 1}`);
  const wordsArray = await response.json();
  return wordsArray;
}

export async function getWord(wordId: string): Promise<JSONWord> {
  const response = await fetch(`${constants.wordsUrl}/${wordId}`);
  const word = await response.json();
  return word;
}
