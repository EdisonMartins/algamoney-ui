import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Pessoa } from '../core/model';
import { environment } from './../../environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
   }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams();
    let headers = new HttpHeaders();
    // Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==
    // admin@algamoney.com:admin
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      console.log("filtro.nome: " + filtro.nome);
      params = params.set('nome', filtro.nome.trim());
    }

    return this.http.get(`${this.pessoasUrl}`,
      { headers, params })
      .toPromise()
      .then(response => {
        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total: response['totalElements']
        };

        return resultado;
      })
  }

  listaTodas(): Promise<any> {
    let headers = new HttpHeaders();
    // Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==
    // admin@algamoney.com:admin
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    return this.http.get(`${this.pessoasUrl}`,
      { headers })
      .toPromise()
      .then(response => response['content']);
  }

  excluir(codigo: number): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, { headers })
    .toPromise()
    .then(response => {
      const pessoaAdicionada = response as Pessoa;
      return pessoaAdicionada;
    });
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa, { headers })
      .toPromise()
      .then(response => {
        const pessoaAlterada = response as Pessoa;
        return pessoaAlterada;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa>  {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    headers = headers.append('Content-Type', 'application/json');

    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`, { headers })
    .toPromise()
    .then(response => {
      const pessoaRecuperada = response as Pessoa;
      return pessoaRecuperada;
    });
  }

}
