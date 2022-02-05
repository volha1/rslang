import template from 'lodash.template';
import Component from '../abstract-component';
import LoginHTML from './login.html';
import AuthService from '../../services/auth-service';

export default class Login extends Component {
  constructor() {
    super('div', 'login');
  }
  render(): HTMLElement {
    this.container.innerHTML = template(LoginHTML)();
    this.addListeners();
    return this.container;
  }

  private addListeners(): void {
    this.container.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = this.container.querySelector<HTMLInputElement>('.login-form .email')?.value;
      const password = this.container.querySelector<HTMLInputElement>('.login-form .password')?.value;
      const user = await AuthService.login({ email: email!, password: password! }).then(() =>
        this.container.querySelector<HTMLFormElement>('.login-form')?.reset());
    });
  }
}
