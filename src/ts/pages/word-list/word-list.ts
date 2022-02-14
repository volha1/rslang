import Header from '../../components/header/header';
import WordListNav from '../../components/word-list-nav/word-list-nav';
import getWords from '../../services/word-list-service';
import WordCard from '../../components/word/word';
import PrevNextButtons from '../../components/prev-next-buttons/prev-next-buttons';
import Footer from '../../components/footer/footer';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';
import { router } from '../../router';
import store from '../../store';

export default async function bootstrap(): Promise<void> {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
  const wordListNav = new WordListNav();
  main?.append(wordListNav.render());
  const wordsContainer = document.createElement('div');
  const wordsArray = await getWords();
  wordsArray.forEach((item) => {
    const {
      word,
      image,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textExample,
      transcription,
      textExampleTranslate,
      textMeaningTranslate,
      wordTranslate,
    } = item;
    const wordCard = new WordCard(
      word,
      image,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textExample,
      transcription,
      textExampleTranslate,
      textMeaningTranslate,
      wordTranslate
    );
    wordsContainer.append(wordCard.render());
  });

  main.append(wordsContainer);
  if (store.chapter !== 7) {
    const prevNextButtons = new PrevNextButtons();
    main.append(prevNextButtons.render());
  }
  body?.append(main);
  const footer = new Footer();
  body?.append(footer.render());
  const registration = new Registration();
  main.append(registration.render());
  const login = new Login();
  main.append(login.render());
  router?.updatePageLinks();
}
