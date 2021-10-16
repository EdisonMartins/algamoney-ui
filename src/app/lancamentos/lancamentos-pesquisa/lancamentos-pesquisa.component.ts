import { LancamentoFiltro, LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {
  descricao: string
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;;
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("ngOnInit()");
    this.pesquisar();

  }

  pesquisar() {
    console.log("pesquisar()");
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    };
    this.lancamentoService.pesquisar(filtro)
    .then(lancamentos => this.lancamentos = lancamentos);
  }

}
