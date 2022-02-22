import template from 'lodash.template';
import Component from '../abstract-component';
import SprintTimerHTML from './sprint-timer.html';
import './sprint-timer.scss';

export default class SprintTimer extends Component {
  constructor() {
    super('div', 'container justify-content-center sprint-timer');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(SprintTimerHTML)();
    let sec = 60;
    const intervalId = setInterval(() => {
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
      }
    }, 1000);
    return this.container;
  }
}
