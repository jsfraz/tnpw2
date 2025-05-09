/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createBook } from '../fn/book-management/create-book';
import { CreateBook$Params } from '../fn/book-management/create-book';
import { deleteBook } from '../fn/book-management/delete-book';
import { DeleteBook$Params } from '../fn/book-management/delete-book';
import { deleteBookImage } from '../fn/book-management/delete-book-image';
import { DeleteBookImage$Params } from '../fn/book-management/delete-book-image';
import { ModelsBook } from '../models/models-book';
import { updateBook } from '../fn/book-management/update-book';
import { UpdateBook$Params } from '../fn/book-management/update-book';


/**
 * Management knih - operace pro admina a database managera.
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

  /** Path part for operation `deleteBook()` */
  static readonly DeleteBookPath = '/api/book/management/book';

  /**
   * Mazání knihy.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBook$Response(params: DeleteBook$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteBook(this.http, this.rootUrl, params, context);
  }

  /**
   * Mazání knihy.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBook(params: DeleteBook$Params, context?: HttpContext): Observable<void> {
    return this.deleteBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `updateBook()` */
  static readonly UpdateBookPath = '/api/book/management/book';

  /**
   * Aktualizace knihy.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateBook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBook$Response(params?: UpdateBook$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return updateBook(this.http, this.rootUrl, params, context);
  }

  /**
   * Aktualizace knihy.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateBook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateBook(params?: UpdateBook$Params, context?: HttpContext): Observable<void> {
    return this.updateBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteBookImage()` */
  static readonly DeleteBookImagePath = '/api/book/management/bookImage';

  /**
   * Odstranění obrázku knihy.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBookImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBookImage$Response(params: DeleteBookImage$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteBookImage(this.http, this.rootUrl, params, context);
  }

  /**
   * Odstranění obrázku knihy.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteBookImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBookImage(params: DeleteBookImage$Params, context?: HttpContext): Observable<void> {
    return this.deleteBookImage$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
