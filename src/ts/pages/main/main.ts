import Header from '../../components/header/header';
import Registration from '../../components/registration/registration';

export default function bootstrap(): void {
  const body = document.querySelector<HTMLElement>('body');
  const header = new Header();
  const registration = new Registration();
  body?.append(header.render());
  body?.append(registration.render());
}
