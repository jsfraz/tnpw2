/* tslint:disable */
/* eslint-disable */
import { ModelsAuthor } from '../models/models-author';
import { ModelsGenre } from '../models/models-genre';
export interface ModelsBook {
  author: ModelsAuthor;
  genres: Array<ModelsGenre>;
  hasImage: boolean;
  id: number;
  isbn: string;
  name: string;
  price: number;
  published: string;
  summary: string;
}
