import template from 'lodash.template';
import Component from '../abstract-component';
import AudioCallOptionsHTML from './audio-call-options.html';

export default class AudioCallOptions extends Component {
  constructor() {
    super('div', 'row d-flex mb-4 mt-5 flex-lg-row flex-column audiocall-options');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(AudioCallOptionsHTML)();
    return this.container;
  }
}
