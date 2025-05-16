import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

const PrimeNg = [
  ButtonModule,
  ToastModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, PrimeNg],
  exports: [PrimeNg],
})
export class PrimeNgModule {}
