import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { SegurancaRoutingModule } from './seguranca-rounting.module';


import { LoginFormComponent } from './login-form/login-form.component';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),

    SegurancaRoutingModule

  ],
  declarations: [LoginFormComponent],
  providers: [JwtHelperService]
})
export class SegurancaModule { }
