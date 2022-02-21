import * as constants from '../constants';
import { Statistics } from '../types/statistics';

const createStatistics = async (userId: string, statistics: Statistics): Promise<void> => {
  const token = localStorage.getItem(constants.token);
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
};
