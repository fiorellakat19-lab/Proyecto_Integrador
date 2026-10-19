// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoce';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';
import { ClientViewComponent } from '../client-view/client-view.component';
import { CompanyViewComponent } from '../company-view/company-view.component';
import { ListItemsComponent } from '../list-items/list-items.component';

import { TotalComponent } from '../total/total.component';
import { FormItemComponent } from '../form-item/form-item.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  imports: [InvoiceViewComponent,
    CommonModule, FormsModule,
    ClientViewComponent,
    CompanyViewComponent,
    ListItemsComponent, TotalComponent],
  templateUrl: './invoice.component.html'
})
export class InvoiceComponent implements OnInit {

   // Variables para los filtros
  filtroCliente: string = '';
  filtroEmpresa: string = '';
  filtroFecha: string = '';


// 2. La lista que se muestra en pantalla (resultado de los filtros)
  facturasFiltradas: any[] = [];

   invoice !: Invoice;

   constructor(
    private service:InvoiceService,
    private router: Router,
    private facturaService: InvoiceService,
    private cdr: ChangeDetectorRef){}

  ngOnInit(): void {

   this.cargarFacturas();

  }

   // 3. Lógica para filtrar el listado en tiempo real
  aplicarFiltros() {

   this.cargarFacturas();

  }



  cargarFacturas() {
    this.facturaService.buscarFacturas(
      this.filtroFecha || undefined,
      this.filtroCliente || undefined,
      this.filtroEmpresa || undefined
    ).subscribe({
      next: (data) => {
        this.facturasFiltradas = data;
        this.cdr.detectChanges();
        console.log(this.facturasFiltradas);
      },
      error: (err) => {
        console.error('Error al buscar facturas en la BD:', err);
      }
    });
  }

}


