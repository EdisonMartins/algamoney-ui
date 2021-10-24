// Importações do Angular
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importações de terceiros
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';

// Importações do projeto
import { ErrorHandlerService } from './error-handler.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  imports: [
    CommonModule,

    ToastyModule.forRoot(),
    ConfirmDialogModule,
  ],
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],

  providers: [
    LancamentoService,
    PessoaService,
    ErrorHandlerService,

    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]

})
export class CoreModule { }
