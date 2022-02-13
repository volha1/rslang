import template from 'lodash.template';
import Component from '../abstract-component';
import AudioCallHTML from './audio-call-answer.html';

export default class AudioCallAnswer extends Component {
  constructor() {
    super('div', 'row mb-2 audiocall-answer invisible');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(AudioCallHTML)();
    return this.container;
  }
}
