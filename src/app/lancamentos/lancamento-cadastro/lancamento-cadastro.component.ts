import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  lancamento = new Lancamento();

  categorias = [];
  pessoas = [];

  constructor(
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService
  ) { }
  pt_BR: any;

  ngOnInit() {
    this.pt_BR = {
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    };
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        // Transformar o array de categorias em um objeto com os campos 'label' e 'value'.
        // O 'map' irá percorrer todos elementos do array e chamará um função para cada elemento.
        // A função chamada retornará um novo Array.
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listaTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    console.log(this.lancamento);
  }

}
