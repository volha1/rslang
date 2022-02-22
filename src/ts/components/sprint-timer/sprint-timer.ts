import template from 'lodash.template';
import state from '../../state';
import store from '../../store';
import Component from '../abstract-component';
import SprintTimerHTML from './sprint-timer.html';
import './sprint-timer.scss';
import GameProgress from '../game-progress/game-progress';
import GameResult from '../game-result/game-result';

export default class SprintTimer extends Component {
  constructor() {
    super('div', 'container justify-content-center sprint-timer');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(SprintTimerHTML)();
    let sec = 60;
    const intervalId = setInterval(async () => {
      const timeInTImer = this.container.querySelector('.time-in-timer');
      sec -= 1;
      if (timeInTImer) {
        if (sec > 9) {
          timeInTImer.innerHTML = `${sec}`;
        } else {
          timeInTImer.innerHTML = `0${sec}`;
        }
      }
      if (!sec) {
        clearInterval(intervalId);
        const main = document.querySelector('main');
        if (main) {
          const gameProgress = new GameProgress();
          main.append(gameProgress.render());
          const gameResult = new GameResult();
          main.append(gameResult.render());
        }
        document.querySelector<HTMLButtonElement>('.btn-game-results')?.click();
        const scoreInResult = document.querySelectorAll<HTMLElement>('.score-in-result');
        if (scoreInResult) {
          scoreInResult.forEach((item) => {
            item.innerHTML = `Результат: ${store.sprintScore} баллов`;
          });
        }
      }
      if (state.gameWordsForGuessing.length === state.wordsCounter) {
        const circle = this.container.querySelector<HTMLElement>('.circle');
        if (circle) {
          circle.style.animationDuration = '0s';
        }
        clearInterval(intervalId);
      }
    }, 1000);
    return this.container;
  }
}
