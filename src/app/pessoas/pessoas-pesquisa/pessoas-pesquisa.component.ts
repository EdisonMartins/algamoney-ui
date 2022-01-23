import { PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ToastyService } from 'ng2-toasty/src/toasty.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';


@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') tabela;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService
    ) { }

  ngOnInit(): void {
    console.log("ngOnInit()");
    this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      })
      .catch(erro => this.errorHandler.handle(erro));
      ;
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir ${pessoa.nome}?`,
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(lancamento: any) {
    this.pessoaService.excluir(lancamento.codigo)
      .then(() => {
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.first = 0;
        }
        this.toasty.success('Lançamento excluído com sucesso!');
      })
      .catch(erro => this.errorHandler.handle(erro));
      ;
  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
