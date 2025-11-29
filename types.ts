import { ColorValue, Image } from 'react-native';

export type Question = {
  Q: string;
  A: string;
};
export type ClassObj = {
  id: string;
  subject: string;
  className: string;
  subname: string;
  subjectPrimaryColour: ColorValue;
  subjectSecondaryColour: ColorValue;
  icon: Image;
  questions: Question[];
};
