/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createBook } from '../fn/book-management/create-book';
import { CreateBook$Params } from '../fn/book-management/create-book';
import { ModelsBook } from '../models/models-book';


/**
 * Management knih - operace pro admina.
 */
@Injectable({ providedIn: 'root' })
export class BookManagementService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `createBook()` */
  static readonly CreateBookPath = '/api/book/management/book';

  /**
   * Vytvoření knihy.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBook$Response(params?: CreateBook$Params, context?: HttpContext): Observable<StrictHttpResponse<ModelsBook>> {
    return createBook(this.http, this.rootUrl, params, context);
  }

  /**
   * Vytvoření knihy.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createBook(params?: CreateBook$Params, context?: HttpContext): Observable<ModelsBook> {
    return this.createBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<ModelsBook>): ModelsBook => r.body)
    );
  }

}
