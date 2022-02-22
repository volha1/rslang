import * as constants from '../constants';
import LocalStorageService from './storage-service';
import ResponseCodes from '../enums/responseCodes';

const createUser = async (user: { name: string, email: string, password: string }): Promise<void> => {
  (await fetch(`${constants.usersUrl}`, {
    method: 'POST',
    headers: {
       Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })).json();
};

const refreshToken = async (): Promise<void> => {
  const refreshToken = LocalStorageService.getRefreshToken();
  const userId = LocalStorageService.getUserID();
  const response = await fetch(`${constants.usersUrl}/${userId}/tokens`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${refreshToken}` },
  });
  if (response.status !== ResponseCodes.OK) {
    LocalStorageService.deleteUserData();
    window.location.reload();
  }
  const data = await response.json();
  LocalStorageService.saveTokens(data.token, data.refreshToken);
};

export default { createUser, refreshToken };
