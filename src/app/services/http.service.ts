import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  'token': any = localStorage.getItem('token')

  httpHeaders = new HttpHeaders({
    'token': this.token
  })

  constructor(private http: HttpClient) { }

  postData(url: any, data: any) {
    return this.http.post(url, data)
  }
}
