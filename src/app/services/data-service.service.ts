import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public url = '/api/traval/';
  public httpOptions = {
    headers: new HttpHeaders(
      { "content-type": "application/json" }
    )
  };
  constructor(private http: HttpClient) { }

  getDataKaryawan() {
    return this.http.get('http://localhost:3000/data_karyawan')
  }

  addDataKaryawan(data) {
    return this.http.post(this.url, data, this.httpOptions).pipe(
      tap(res => {
        console.log("Post Data Karyawan success")
      }),
      catchError(this.handleError))
  }

  editDataKaryawan(id, data): Observable<any> {
    return this.http.patch(this.url + id, data, this.httpOptions).pipe(
      tap(res => {
        console.log("Put Data Karyawan success")
      }),
      catchError(this.handleError))
  }

  deleteDataKaryawan(id) {
    return this.http.delete(this.url + id).pipe
      (tap(res => {
        console.log("Delete Data Karyawan success")
      }),
        catchError(this.handleError))
  }

  handleError(error) {
    let errorMessage
    // if (error.error instanceof ErrorEvent) {
    //   // client-side error
    //   errorMessage = { Error: `${error.error.message}` };
    // } else {
    //   // server-side error
    //   errorMessage = {
    //     'Error Code': `${error.error.status}`,
    //     message: `${error.error.message}`
    //   };
    // }
    // console.log(errorMessage)
    return throwError(errorMessage);
  }


}


