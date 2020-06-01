import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Disabilitas } from '../model/disabilitas';
import { Disabilitasresponse } from '../model/disabillitas-response';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Add disabilitas
  AddDisabilitas(data: Disabilitas): Observable<any> {
    let API_URL = `${environment.apiUrl}/master/disabilitas`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all disabilitas
  GetAllDisabilitas(): Observable<Disabilitasresponse> {
    return this.http.get<Disabilitasresponse>(`${environment.apiUrl}/master/disabilitas`);
  }

  // Get disabilitas
  GetDisabilitas(id): Observable<any> {
    let API_URL = `${environment.apiUrl}/master/disabilitas/${id}`;
    return this.http.get(API_URL, { headers: this.headers })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
  }

  // Update disabilitas
  UpdateDisabilitas(id, data): Observable<any> {
    let API_URL = `${environment.apiUrl}/master/disabilitas/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Delete disabilitas
  DeleteDisabilitas(id): Observable<any> {
    var API_URL = `${environment.apiUrl}/master/disabilitas/${id}`;
    return this.http.delete(API_URL)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
