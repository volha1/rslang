import template from 'lodash.template';
import Component from '../abstract-component';
import './registration.scss';
import RegistrationHTML from './registration.html';
import UserService from '../../services/user-service';

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
    this.container.addEventListener('submit', async (event) => {
      event.preventDefault();
      const name = this.container.querySelector<HTMLInputElement>('.name')?.value;
      const email = this.container.querySelector<HTMLInputElement>('.email')?.value;
      const password = this.container.querySelector<HTMLInputElement>('.password')?.value;
      await UserService.createUser({ name: name!, email: email!, password: password! }).then(() =>
        this.container.querySelector<HTMLFormElement>('.registration-form')?.reset()
      );
    });
  }
}
