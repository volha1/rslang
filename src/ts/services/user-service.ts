import * as constants from '../constants';

const createUser = async (user: { name: string, email: string, password: string }): Promise<void> => {
  const rawResponse = await fetch('https://learnwords-rslang-01.herokuapp.com/users', {
    method: 'POST',
    headers: {
       Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

 await rawResponse.json();
};

export default { createUser };
