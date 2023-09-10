// Importações do Angular
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importações de terceiros
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { MessageService } from 'primeng/components/common/messageservice';

// Importações do projeto
import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { CategoriaService } from '../categorias/categoria.service';
import { NavbarComponent } from './navbar/navbar.component';




@NgModule({
  imports: [
    CommonModule,
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    ConfirmDialogModule
  ],

  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    ErrorHandlerService,

    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]

})
export class CoreModule { }
