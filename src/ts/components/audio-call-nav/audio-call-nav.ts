import template from 'lodash.template';
import Component from '../abstract-component';
import AudioCallNavHTML from './audio-call-nav.html';

export default class AudioCallNav extends Component {
  constructor() {
    super('div', 'row audiocall-nav');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(AudioCallNavHTML)();
    return this.container;
  }
}
