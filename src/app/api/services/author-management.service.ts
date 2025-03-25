/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createAuthor } from '../fn/author-management/create-author';
import { CreateAuthor$Params } from '../fn/author-management/create-author';


/**
 * Management autorů - operace pro admina.
 */
@Injectable({ providedIn: 'root' })
export class AuthorManagementService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createAuthor()` */
  static readonly CreateAuthorPath = '/api/author/management/author';

  /**
   * Vytvoření autora.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAuthor()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAuthor$Response(params?: CreateAuthor$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return createAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * Vytvoření autora.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createAuthor$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAuthor(params?: CreateAuthor$Params, context?: HttpContext): Observable<void> {
    return this.createAuthor$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
