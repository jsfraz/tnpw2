/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ModelsUser } from '../../models/models-user';

export interface GetUsersByRoles$Params {
  roles: Array<string>;
}

export function getUsersByRoles(http: HttpClient, rootUrl: string, params: GetUsersByRoles$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ModelsUser>>> {
  const rb = new RequestBuilder(rootUrl, getUsersByRoles.PATH, 'get');
  if (params) {
    rb.query('roles', params.roles, {"style":"form","explode":true});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ModelsUser>>;
    })
  );
}

getUsersByRoles.PATH = '/api/user/management/byRoles';
