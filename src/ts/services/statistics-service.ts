import * as constants from '../constants';
import { Statistics } from '../types/statistics';

export async function updateStatistics(statistics: Statistics): Promise<void> {
  const token = localStorage.getItem(constants.token);
  const userId = localStorage.getItem(constants.userId);
  (
    await fetch(`${constants.usersUrl}/${userId}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(statistics),
    })
  ).json();
}

export async function getStatistics(): Promise<Statistics> {
  const token = localStorage.getItem(constants.token);
  const userId = localStorage.getItem(constants.userId);
  const response = await fetch(`${constants.usersUrl}/${userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  const statistics = await response.json();
  return statistics;
}
