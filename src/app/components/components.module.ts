import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { ClientService } from 'app/core/services/clients.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
  ],
  providers:[ClientService],
  exports: [
    FooterComponent,
  ]
})
export class ComponentsModule { }
