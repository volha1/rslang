import * as constants from '../constants';

const saveTokens = (token: string, refreshToken: string): void => {
  localStorage.setItem(constants.token, token);
  localStorage.setItem(constants.refreshToken, refreshToken);
};

const deleteTokens = (): void => {
  localStorage.removeItem(constants.token);
  localStorage.removeItem(constants.refreshToken);
};

export default { saveTokens, deleteTokens };
