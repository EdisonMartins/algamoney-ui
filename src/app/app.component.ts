import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from './shared/BaseComponent';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {
  constructor(private router: Router,
     messageService: MessageService) {
    super(messageService);
  }

  exibindoNavbar() {
    return this.router.url !== '/login';
  }

}
