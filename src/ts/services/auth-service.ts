import * as constants from '../constants';
import LocalStorageService from './storage-service';

const login = async (user: { email: string; password: string }): Promise<{ id: string; name: string }> => {
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
  return { id: data.userId, name: data.name };
};

const logout = (): void => {
  LocalStorageService.deleteTokens();
};

export default { login, logout };
