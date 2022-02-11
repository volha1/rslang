import Header from '../../components/header/header';
import getWords from '../../services/word-list-service';
import WordCard from '../../components/word/word';
import Registration from '../../components/registration/registration';
import Login from '../../components/login/login';

export default async function bootstrap(chapter: number, page: number): Promise<void> {
  const body = document.querySelector<HTMLElement>('body');
  if (body) {
    body.innerHTML = '';
  }
  const header = new Header();
  body?.append(header.render());
  const main = document.createElement('main');
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
  main.append(`Раздел${chapter}, страница ${page}`);
  body?.append(main);
  const registration = new Registration();
  main.append(registration.render());
  const login = new Login();
  main.append(login.render());
}
