import template from 'lodash.template';
import Component from '../abstract-component';
import RegistrationHTML from './registration.html';
import UserService from '../../services/user-service';
import ResponseCodes from '../../enums/responseCodes';

export default class Registration extends Component {
  constructor() {
    super('div', 'registration');
  }

  render(): HTMLElement {
    this.container.innerHTML = template(RegistrationHTML)();
    this.addListeners();
    return this.container;
  }

  private addListeners(): void {
    this.container.addEventListener('submit', async () => {
      const name = this.container.querySelector<HTMLInputElement>('.name')?.value;
      const email = this.container.querySelector<HTMLInputElement>('.email')?.value;
      const password = this.container.querySelector<HTMLInputElement>('.password')?.value;
      const status = await UserService.createUser({ name, email, password });
      if (status !== ResponseCodes.OK) {
        this.container.querySelector<HTMLFormElement>('.registration-form')?.reset();
        document.querySelector('.error-message')?.classList.remove('invisible');
      } else {
        document.querySelector<HTMLButtonElement>('.message-login')?.click();
      }
    });

    this.container.addEventListener('change', () => {
      document.querySelector('.error-message')?.classList.add('invisible');
    });
  }
}
