/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ModelsTrueFalse } from '../../models/models-true-false';

export interface IsBookInCart$Params {
  id: number;
}

export function isBookInCart(http: HttpClient, rootUrl: string, params: IsBookInCart$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsTrueFalse>> {
  const rb = new RequestBuilder(rootUrl, isBookInCart.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ModelsTrueFalse>;
    })
  );
}

isBookInCart.PATH = '/api/cart/exists';
