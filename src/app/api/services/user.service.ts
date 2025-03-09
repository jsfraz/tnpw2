/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { ModelsUser } from '../models/models-user';
import { whoAmI } from '../fn/user/who-am-i';
import { WhoAmI$Params } from '../fn/user/who-am-i';


/**
 * Uživatelé
 */
@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `whoAmI()` */
  static readonly WhoAmIPath = '/api/user/whoami';

  /**
   * Kdo jsem?.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `whoAmI()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI$Response(params?: WhoAmI$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsUser>> {
    return whoAmI(this.http, this.rootUrl, params, context);
  }

  /**
   * Kdo jsem?.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `whoAmI$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  whoAmI(params?: WhoAmI$Params, context?: HttpContext): Observable<ModelsUser> {
    return this.whoAmI$Response(params, context).pipe(
      map((r: StrictHttpResponse<ModelsUser>): ModelsUser => r.body)
    );
  }

}
