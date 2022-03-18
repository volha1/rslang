import template from 'lodash.template';
import Component from '../abstract-component';
import GameResultHTML from './game-result.html';
import state from '../../state';
import * as constants from '../../constants';
import { router } from '../../router';
import './game-result.scss';

export default class GameResult extends Component {
  constructor() {
    super('div', 'game-result');
  }

  render(): HTMLElement {
    this.container.innerHTML = template(GameResultHTML)({
      rightAnswers: state.gameRightAnswers,
      wrongAnswers: state.gameWrongAnswers,
    });
    this.addListeners();
    return this.container;
  }

  private addListeners(): void {
    this.container.querySelectorAll<HTMLElement>('.result-audio-btn').forEach((item) => {
      item.addEventListener('click', (event) => {
        const audioFile = (<HTMLButtonElement>event.currentTarget).dataset.audio;
        const wordAudio = new Audio(`${constants.url}${audioFile}`);
        wordAudio.play();
      });
    });

    this.container.querySelector('.btn-repeat')?.addEventListener('click', () => {
      router?.navigate(`${state.repeatGameBtnLink}`);
    });

    this.container.querySelector('.btn-textbook')?.addEventListener('click', () => {
      router?.navigate('/textbook');
    });
  }
}
