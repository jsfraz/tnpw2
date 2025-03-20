/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CreateBookInput } from '../../models/create-book-input';
import { ModelsBook } from '../../models/models-book';

export interface CreateBook$Params {
      body?: CreateBookInput
}

export function createBook(http: HttpClient, rootUrl: string, params?: CreateBook$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsBook>> {
  const rb = new RequestBuilder(rootUrl, createBook.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ModelsBook>;
    })
  );
}

createBook.PATH = '/api/book/management/book';
