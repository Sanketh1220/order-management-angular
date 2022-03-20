import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpService: HttpService) { }

  login(data: any) {
    return this.httpService.postData(environment.URL + 'login', data);
  }
}
