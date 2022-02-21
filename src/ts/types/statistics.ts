export type Statistics = {
  id?: string;
  learnedWords: number;
  optional?: {
      date: Date,
      sprintNewWords: Set<String>,
      audiocallNewWords: Set<String>,
      sprintRightAnswers: number,
      audiocallRightAnswers: number
  };
};
