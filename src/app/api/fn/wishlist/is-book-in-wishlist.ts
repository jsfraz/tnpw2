/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ModelsTrueFalse } from '../../models/models-true-false';

export interface IsBookInWishlist$Params {
  id: number;
}

export function isBookInWishlist(http: HttpClient, rootUrl: string, params: IsBookInWishlist$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsTrueFalse>> {
  const rb = new RequestBuilder(rootUrl, isBookInWishlist.PATH, 'get');
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

isBookInWishlist.PATH = '/api/wishlist/exists';
