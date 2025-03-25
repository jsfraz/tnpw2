/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ModelsBook } from '../../models/models-book';

export interface SearchBooks$Params {
  authorIds?: Array<number>;
  genreIds?: Array<number>;
  maxPrice: number;
  minPrice: number;
  name?: string | null;
}

export function searchBooks(http: HttpClient, rootUrl: string, params: SearchBooks$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ModelsBook>>> {
  const rb = new RequestBuilder(rootUrl, searchBooks.PATH, 'get');
  if (params) {
    rb.query('authorIds', params.authorIds, {});
    rb.query('genreIds', params.genreIds, {});
    rb.query('maxPrice', params.maxPrice, {});
    rb.query('minPrice', params.minPrice, {});
    rb.query('name', params.name, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ModelsBook>>;
    })
  );
}

searchBooks.PATH = '/api/book/search';
