import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  pessoas = [
    {nome: 'Fábio da Silva', cidade: 'Brasília', estado: 'DF', ativo: true},
    {nome: 'Kelly Key', cidade: 'Brasília', estado: 'DF', ativo: true},
    {nome: 'Marcos Marcondi', cidade: 'São Luís', estado: 'MA', ativo: false},
    {nome: 'Dayane Freira', cidade: 'Belo Horizonte', estado: 'DF', ativo: true},
    {nome: 'Edison com i', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: true},
    {nome: 'Jody Vader', cidade: 'Brasília', estado: 'DF', ativo: true},
    {nome: 'Thaís Tayane', cidade: 'Brasília', estado: 'DF', ativo: false},
    {nome: 'Júlio Fonseca', cidade: 'Brasília', estado: 'DF', ativo: true}
  ];

}
