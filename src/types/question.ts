export interface IQuestion {
  id: string;
  question_content: string;
  answers: IAnswer[];
}

export interface IAnswer {
  answer_content: string;
  correct: boolean;
}
