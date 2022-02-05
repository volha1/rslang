import * as constants from '../constants';

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

export default { createUser };
