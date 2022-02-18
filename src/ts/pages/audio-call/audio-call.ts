import Header from '../../components/header/header';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';
import GameProgress from '../../components/game-progress/game-progress';
import GameResult from '../../components/game-result/game-result';
import AudioCallAnswer from '../../components/audio-call-answer/audio-call-answer';
import AudioCallSpeaker from '../../components/audio-call-speaker/audio-call-speaker';
import AudioCallOptions from '../../components/audio-call-options/audio-call-options';
import './audio-call.scss';
import { router } from '../../router';
import state from '../../state';

 export default async function bootstrap(): Promise<void> {
  console.log('words for guessing ' + state.gameWordsForGuessing.map(item => item.word));
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }

  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');

  const audiocallContainer = document.createElement('div');
  audiocallContainer.classList.add('container', 'audio-call-container', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center');
  const answer = new AudioCallAnswer();
  audiocallContainer.append(answer.render());
  const speaker = new AudioCallSpeaker();
  audiocallContainer.append(speaker.render());
  const options = new AudioCallOptions();
  audiocallContainer.append(options.render());
  main.append(audiocallContainer);

  body?.append(main);
  const registration = new Registration();
  main.append(registration.render());
  const login = new Login();
  main.append(login.render());
  const gameProgress = new GameProgress();
  main.append(gameProgress.render());
  const gameResult = new GameResult();
  main.append(gameResult.render());
  router?.updatePageLinks();
}
