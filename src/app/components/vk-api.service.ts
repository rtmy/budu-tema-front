import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VkApiService {

  protected api = environment.vkapi.endpoint;
  protected token = environment.vkapi.token;
  protected version = environment.vkapi.version;
  protected redirect_uri = environment.vkapi.redirect_uri;
  protected country_id = environment.vkapi.country_id;

  private params = {
    redirect_uri: this.redirect_uri,
    access_token: this.token,
    v: this.version,
    country_id: this.country_id,
  }

  constructor(@Inject(HttpClient) private http: HttpClient) { }

  /**
   * Query universities by name
   * @param versity_name string
   */
  queryUniversitiesByName(versity_name: string, city_id: number): Observable<any> {
    return this.http.get(`${this.api}/database.getUniversities`, {params: {...this.params, q: versity_name, city_id: city_id.toString()}})
    .pipe(catchError(this.handleError));
  }

   /**
   * Query cities by name
   * @param city_name string
   */
  queryCitiesByName(city_name: string): Observable<any> {
    return this.http.get(`${this.api}/database.getCities`, {params: {...this.params, q: city_name}})
    .pipe(catchError(this.handleError));
  }

  /**
   * Query faculties by name
   * @param data any
   */
  queryFacultiesByName(versity_id: number): Observable<any> {
    return this.http.get(`${this.api}/database.getFaculties`, {params: {
        ...this.params, university_id: versity_id.toString()}})
    .pipe(catchError(this.handleError));
  }

  /**
   * Error Handler
   */
  protected handleError(error: HttpErrorResponse) {
    return throwError({ message: error.error.message });
  }

}
