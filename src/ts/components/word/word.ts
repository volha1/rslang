import template from 'lodash.template';
import {
  createUserWord,
  deleteUserWord,
  getAggregatedUserWord,
  updateUserWord,
} from '../../services/user-words-services';
import store from '../../store';
import Component from '../abstract-component';
import WordHTML from './word.html';
import './word.scss';
import * as constants from '../../constants';
import { UserWordById } from '../../types/user-words';

export default class WordCard extends Component {
  constructor(
    public id: string | undefined,
    public _id: string | undefined,
    public word: string,
    public image: string,
    public audio: string,
    public audioMeaning: string,
    public audioExample: string,
    public textMeaning: string,
    public textExample: string,
    public transcription: string,
    public textExampleTranslate: string,
    public textMeaningTranslate: string,
    public wordTranslate: string,
    public userWord: UserWordById | undefined
  ) {
    super('div', 'word-card container my-2');
  }
  render(): HTMLElement {
    let buttonContent = 'Отметить как сложное';
    function changeButtonMeaning(): void {
      if (store.chapter === 7) {
        buttonContent = 'Удалить из сложных';
      }
    }

    changeButtonMeaning();
    this.container.innerHTML = template(WordHTML)({
      word: this.word,
      image: this.image,
      audio: this.audio,
      audioMeaning: this.audioMeaning,
      audioExample: this.audioExample,
      textMeaning: this.textMeaning,
      textExample: this.textExample,
      transcription: this.transcription,
      textExampleTranslate: this.textExampleTranslate,
      textMeaningTranslate: this.textMeaningTranslate,
      wordTranslate: this.wordTranslate,
      buttonContent,
    });
    const buttonDifficult = this.container.querySelector<HTMLButtonElement>('.button-difficult');
    const buttonLearned = this.container.querySelector<HTMLButtonElement>('.button-learned');
    if (this.userWord?.difficulty && this.userWord.difficulty === 'hard') {
      this.container.classList.add('hard');
      if (buttonDifficult) {
        buttonDifficult.disabled = true;
      }
      store.markedWordsCounter += 1;
    } else if (this.userWord?.difficulty && this.userWord.difficulty === 'easy') {
      this.container.classList.add('easy');
      if (buttonLearned) {
        buttonLearned.disabled = true;
      }
      store.markedWordsCounter += 1;
    }
    this.addListeners();
    return this.container;
  }

  addListeners(): void {
    const wordAudio = new Audio(`https://learnwords-rslang-01.herokuapp.com/${this.audio}`);
    const wordMeaningAudio = new Audio(`https://learnwords-rslang-01.herokuapp.com/${this.audioMeaning}`);
    const wordExampleAudio = new Audio(`https://learnwords-rslang-01.herokuapp.com/${this.audioExample}`);

    async function playAudio(): Promise<void> {
      await wordAudio.play();
    }
    async function playMeaningAudio(): Promise<void> {
      await wordMeaningAudio.play();
    }
    async function playExampleAudio(): Promise<void> {
      await wordExampleAudio.play();
    }
    wordAudio.addEventListener('ended', playMeaningAudio);
    wordMeaningAudio.addEventListener('ended', playExampleAudio);

    this.container.querySelector<HTMLButtonElement>('.button-sound')?.addEventListener('click', playAudio);

    const buttonDifficult = this.container.querySelector<HTMLButtonElement>('.button-difficult');
    const buttonLearned = this.container.querySelector<HTMLButtonElement>('.button-learned');

    buttonDifficult?.addEventListener('click', async () => {
      const userId = localStorage.getItem(constants.userId);
      if (userId && this._id && store.chapter !== 7) {
        const userWord = await getAggregatedUserWord(userId, this._id);
        const word = {
          difficulty: 'hard',
          optional: {},
        };
        if (userWord.userWord?.difficulty) {
          await updateUserWord(userId, this._id, word);
        } else {
          await createUserWord(userId, this._id, word);
          store.markedWordsCounter += 1;
        }
        this.container.classList.remove('easy');
        this.container.classList.add('hard');
        buttonDifficult.disabled = true;
        if (buttonLearned) {
          buttonLearned.disabled = false;
        }
        if (store.markedWordsCounter === 20) {
          window.location.reload();
        }
      } else if (userId && this._id && store.chapter === 7) {
        await deleteUserWord(userId, this._id);
        window.location.reload();
      }
    });

    buttonLearned?.addEventListener('click', async () => {
      const userId = localStorage.getItem(constants.userId);
      if (userId && this._id) {
        const userWord = await getAggregatedUserWord(userId, this._id);
        const word = {
          difficulty: 'easy',
          optional: {},
        };
        if (userWord.userWord?.difficulty) {
          await updateUserWord(userId, this._id, word);
        } else {
          await createUserWord(userId, this._id, word);
          store.markedWordsCounter += 1;
        }
        this.container.classList.remove('hard');
        this.container.classList.add('easy');
        buttonLearned.disabled = true;
        if (buttonDifficult) {
          buttonDifficult.disabled = false;
        }
        if (store.markedWordsCounter === 20) {
          window.location.reload();
        }
      }
    });
  }
}
