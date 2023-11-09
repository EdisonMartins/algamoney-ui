import { MessageService } from 'primeng/components/common/messageservice';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { LancamentoService } from '../lancamento.service';
import { BaseComponent } from '../../shared/BaseComponent';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro-reativo',
  templateUrl: './lancamento-cadastro-reativo.component.html',
  styleUrls: ['./lancamento-cadastro-reativo.component.css']
})
export class LancamentoCadastroReativoComponent extends BaseComponent implements OnInit {


  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  //lancamento = new Lancamento();
  formulario: FormGroup;

  categorias = [];
  pessoas = [];

  constructor(
    messageService: MessageService,
    private pessoaService: PessoaService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) {
    super(messageService);

  }
  pt_BR: any;

  ngOnInit() {
    console.log(this.route.snapshot.params['codigo']);
    this.configurarFormulario();
    const codigoLancamento = this.route.snapshot.params['codigo'];
    this.title.setTitle('Novo lançamento');

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

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

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA', Validators.required],
      dataVencimento: [null, Validators.required],
      dataPagamento: [],
      descricao: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      observacao: []
    });
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

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamentoAdicionado => {
       //this.lancamento = lancamento;
        this.addMsgSuccess(this.formulario.get('descricao').value, "Lançamento adicionado com sucesso!");
        //form.reset();
        //this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.setValue(lancamento);
        this.addMsgSuccess(this.formulario.get('descricao').value, 'Lançamento alterado com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.setValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.formulario.get('codigo').value)
  }

  novo(form: FormControl) {
    this.formulario.reset();
    this.formulario.patchValue(new Lancamento())
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }
}
