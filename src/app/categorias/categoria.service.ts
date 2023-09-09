import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }


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
