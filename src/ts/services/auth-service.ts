import * as constants from '../constants';
import LocalStorageService from './storage-service';

const login = async (user: { email: string; password: string }): Promise<void> => {
  const response = await fetch(`${constants.signInUrl}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  LocalStorageService.saveTokens(data.token, data.refreshToken);
  LocalStorageService.saveUserID(data.userId);
  LocalStorageService.saveUserName(data.name);
};

const logout = (): void => {
  LocalStorageService.deleteUserData();
};

const isLogged = (): boolean => LocalStorageService.getUserID() !== null;

export default { login, logout, isLogged };
