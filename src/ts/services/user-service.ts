import * as constants from '../constants';
import LocalStorageService from './storage-service';
import ResponseCodes from '../enums/responseCodes';

const createUser = async (user: { name: string | undefined; email: string | undefined; password: string | undefined }): Promise<number> => {
  const response = await fetch(`${constants.usersUrl}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.status;
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
