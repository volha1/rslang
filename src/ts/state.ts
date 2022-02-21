import { JSONWord } from './types/word';

const gameWordsForGuessing: Array<JSONWord> = [];
const gameRightAnswers: Array<JSONWord> = [];
const gameWrongAnswers: Array<JSONWord> = [];
const wordsCounter = 0;
const repeatGameBtnLink = '';
const preventAudioPlay = false;
const currentGame = '';
let sprintGameProposedAnswer: JSONWord | undefined;
const isCorrestAnswer = '';

export default {
  gameWordsForGuessing,
  wordsCounter,
  gameRightAnswers,
  gameWrongAnswers,
  repeatGameBtnLink,
  preventAudioPlay,
  currentGame,
  sprintGameProposedAnswer,
  isCorrestAnswer,
};
