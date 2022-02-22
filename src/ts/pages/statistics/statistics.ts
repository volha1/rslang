import template from 'lodash.template';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import StatisticsHTML from './statistics.html';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';
import { getStatistics } from '../../services/statistics-service';
import './statistics.scss';
import { router } from '../../router';

export default async function bootstrap(): Promise<void> {
  const statistics = await getStatistics();
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  main.innerHTML = template(StatisticsHTML)({ audiocallAnswers: statistics.optional?.audiocallRightAnswers });
  body?.append(main);
  const footer = new Footer();
  body?.append(footer.render());
  const registration = new Registration();
  main.append(registration.render());
  const login = new Login();
  main.append(login.render());
  router?.updatePageLinks();
}
