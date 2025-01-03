export type Package = {
  id: number;
  name: string;
  slug: string;
  description: string;
  questions: Question[];
};

export type Question = {
  id: number;
  packageId: number;
  question: string;
};
