/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getAllAuthors } from '../fn/author/get-all-authors';
import { GetAllAuthors$Params } from '../fn/author/get-all-authors';
import { ModelsAuthor } from '../models/models-author';


/**
 * Autoři
 */
@Injectable({ providedIn: 'root' })
export class AuthorService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllAuthors()` */
  static readonly GetAllAuthorsPath = '/api/author/all';

  /**
   * Všichni autoři.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAuthors()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAuthors$Response(params?: GetAllAuthors$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ModelsAuthor>>> {
    return getAllAuthors(this.http, this.rootUrl, params, context);
  }

  /**
   * Všichni autoři.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAuthors$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAuthors(params?: GetAllAuthors$Params, context?: HttpContext): Observable<Array<ModelsAuthor>> {
    return this.getAllAuthors$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ModelsAuthor>>): Array<ModelsAuthor> => r.body)
    );
  }

}
