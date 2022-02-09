import * as constants from '../constants';

const saveTokens = (token: string, refreshToken: string): void => {
  localStorage.setItem(constants.token, token);
  localStorage.setItem(constants.refreshToken, refreshToken);
};

const deleteUserData = (): void => {
  localStorage.removeItem(constants.token);
  localStorage.removeItem(constants.refreshToken);
  localStorage.removeItem(constants.userId);
  localStorage.removeItem(constants.userName);
};

const saveUserID = (id: string): void => {
  localStorage.setItem(constants.userId, id);
};

const saveUserName = (name: string): void => {
  localStorage.setItem(constants.userName, name);
};

const getUserName = (): string | null => localStorage.getItem(constants.userName) ?? '';

const getUserID = (): string | null => localStorage.getItem(constants.userId);

const getCurrentRoute = (): string | null => localStorage.getItem(constants.currentRoute);

export default { saveTokens, deleteUserData, saveUserID, saveUserName, getCurrentRoute, getUserName, getUserID };
