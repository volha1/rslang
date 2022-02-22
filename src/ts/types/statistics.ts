export type Statistics = {
  learnedWords?: number;
  optional?: {
    audiocallRightAnswers?: number;
    sprintRightAnswers?: number;
    newWords?: {
      audiocall: Array<String>,
      sprint: Array<String>
    };
  };
};
