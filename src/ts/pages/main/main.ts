import Header from '../../components/header/header';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';

export default function bootstrap(): void {
  const body = document.querySelector<HTMLElement>('body');
  const header = new Header();
  body?.append(header.render());
  body?.append(new Registration().render());
  body?.append(new Login().render());
}
