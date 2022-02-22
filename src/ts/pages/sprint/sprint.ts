import './sprint.scss';
import Header from '../../components/header/header';
import SprintQuestion from '../../components/sprint-question/sprint-question';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';
import { router } from '../../router';
import SprintTimer from '../../components/sprint-timer/sprint-timer';
import state from '../../state';
import * as utils from '../../utils';

export default async function bootstrap(): Promise<void> {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  if (state.gameWordsForGuessing.length === 0) {
    utils.resetSprintScore();
    await utils.getWordsForGame();
    state.sprintGameProposedAnswer = utils.getRandomSprintAnswer();
  }

  const sprintContainer = document.createElement('div');
  sprintContainer.classList.add(
    'container',
    'sprint-container',
    'd-flex',
    'flex-column',
    'align-items-center',
    'justify-content-center'
  );
  const timer = new SprintTimer();
  const question = new SprintQuestion();
  sprintContainer.append(timer.render(), question.render());
  main.append(sprintContainer);

  body?.append(main);
  const registration = new Registration();
  main.append(registration.render());
  const login = new Login();
  main.append(login.render());
  router?.updatePageLinks();
}
