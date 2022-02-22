import * as constants from '../constants';
import ResponseCodes from '../enums/responseCodes';
import { UserWordById } from '../types/user-words';
import UserService from './user-service';
import { JSONWord, JSONWords } from '../types/word';
import store from '../store';
import LocalStorageService from './storage-service';

export async function createUserWord(userId: string, wordId: string, word: UserWordById): Promise<void> {
  const token = localStorage.getItem(constants.token);
  await fetch(`${constants.usersUrl}/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
}

export async function getUserWord(userId: string, wordId: string): Promise<{ content: UserWordById; status: number }> {
  const token = localStorage.getItem(constants.token);
  const response = await fetch(`${constants.usersUrl}/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const content = await response.json();
  const { status } = response;
  return { content, status };
}

export async function updateUserWord(userId: string, wordId: string, word: UserWordById): Promise<void> {
  const token = localStorage.getItem(constants.token);
  await fetch(`${constants.usersUrl}/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
}

export async function deleteUserWord(userId: string, wordId: string): Promise<void> {
  const token = localStorage.getItem(constants.token);
  await fetch(`${constants.usersUrl}/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getUserWords(userId: string, filter: string): Promise<JSONWords> {
  const page = store.page - 1;
  const group = store.chapter - 1;
  const objAll = { $and: [{ page, group }] };
  const objAllInGroup = { $and: [{ group }] };
  const objAllHard = { $and: [{ 'userWord.difficulty': 'hard' }] };
  const objHardOrEasy = {
    $and: [{ $or: [{ 'userWord.difficulty': 'hard' }, { 'userWord.difficulty': 'easy' }] }, { group }],
  };
  const objAllExcludedEasy = {
    $and: [{ $or: [{ 'userWord.difficulty': 'hard' }, { userWord: null }] }, { page, group }],
  };
  let obj = {};
  let wordsPerPage = 20;
  switch (filter) {
    case 'allExcludedEasy':
      obj = objAllExcludedEasy;
      break;
    case 'allHard':
      obj = objAllHard;
      wordsPerPage = 3600;
      break;
    case 'hardOrEasy':
      obj = objHardOrEasy;
      wordsPerPage = 600;
      break;
    case 'allInGroup':
      obj = objAllInGroup;
      wordsPerPage = 600;
      break;
    case 'all':
    default:
      obj = objAll;
  }
  async function sendRequest(): Promise<Response> {
    const token = localStorage.getItem(constants.token);
    const response = await fetch(
      `${constants.usersUrl}/${userId}/aggregatedWords?wordsPerPage=${wordsPerPage}&filter=${JSON.stringify(obj)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );
    return response;
  }
  let response = await sendRequest();
  if (response.status !== ResponseCodes.OK) {
    await UserService.refreshToken();
    response = await sendRequest();
    if (response.status !== ResponseCodes.OK) {
      LocalStorageService.deleteUserData();
      window.location.reload();
    }
  }
  const content = await response.json();
  const wordArray = content[0].paginatedResults;
  return wordArray;
}

export async function getAggregatedUserWord(userId: string, wordId: string): Promise<JSONWord> {
  async function sendRequest(): Promise<Response> {
    const token = localStorage.getItem(constants.token);
    const response = await fetch(`${constants.usersUrl}/${userId}/aggregatedWords/${wordId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    return response;
  }
  let response = await sendRequest();
  if (response.status !== ResponseCodes.OK) {
    await UserService.refreshToken();
    response = await sendRequest();
    if (response.status !== ResponseCodes.OK) {
      LocalStorageService.deleteUserData();
      window.location.reload();
    }
  }
  const content = await response.json();
  const word = content[0];
  return word;
}
