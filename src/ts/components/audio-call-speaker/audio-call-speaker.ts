import template from 'lodash.template';
import Component from '../abstract-component';
import AudioCallSpeakerHTML from './audio-call-speaker.html';

export default class AudioCallSpeaker extends Component {
  constructor() {
    super('div', 'row mb-5 speaker-button');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(AudioCallSpeakerHTML)();
    return this.container;
  }
}
