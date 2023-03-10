import Isotope from '@/libs/isotope-layout';

export type Category = 'total' | 'mixed-group' | 'girl-group' | 'boy-group' | 'girl-solo' | 'boy-solo';

export const CATEGORIES: Category[] = ['total', 'mixed-group', 'girl-group', 'boy-group', 'girl-solo', 'boy-solo'];

export type Year = number | '활동중' | '도주';

export interface YoutubeType {
  startsAt: number;
  url: string;
}

export interface DescType {
  melon?: string;
  namu?: string;
  naver?: string;
  title?: string;
}

export interface IdolType {
  category: Category;
  debutYear: Year;
  desc?: DescType;
  endYear?: Year;
  major?: boolean;
  name: string;
  searchIndex?: number;
  searchName?: string;
  youtube?: YoutubeType;
}

export interface YearDescType {
  year: number;
  desc: string;
}

export interface IsotopesType {
  [key: number]: Isotope;
}
