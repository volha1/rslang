import * as constants from '../constants';

const createUser = async (user: { name: string; email: string; password: string }): Promise<void> => {
  const rawResponse = await fetch(`${constants.default.backendUrl}//users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  await rawResponse.json();
};
