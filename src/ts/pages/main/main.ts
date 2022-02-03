import Header from '../../components/header/header';

export default function bootstrap(): void {
  const body = document.querySelector<HTMLElement>('body');
  const header = new Header();
  body?.append(header.render());
}
