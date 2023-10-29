import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { environment } from './../../environments/environment';



@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
  }


  listarTodas(): Promise<any> {
    let headers = new HttpHeaders();
    // Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==
    // admin@algamoney.com:admin
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get(`${this.categoriasUrl}`,
      { headers })
      .toPromise()
      .then(response => response);
  }
}
