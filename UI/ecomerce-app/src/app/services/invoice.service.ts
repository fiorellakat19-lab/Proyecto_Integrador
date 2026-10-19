
import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoce';
import { invoiceData } from '../data/invoce.data';
import { Item } from '../models/item';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';



@Injectable({
  providedIn: 'root',
})
export class InvoiceService {


   private invoice: Invoice = invoiceData;
   private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient){
  }

  getInvoice():Invoice{
    const total=this.calculateTotal();
    return { ...this.invoice, total: total };
  }


  remove(id:number):Invoice {
    this.invoice.items = this.invoice.items.filter(item => item.id !== id);
    const total=this.calculateTotal();
    return { ...this.invoice, total: total };
  }

   save(item:Item):Invoice{

    this.invoice.items=[... this.invoice.items, item];
     const total=this.calculateTotal();
    return { ...this.invoice, total: total };

   }


  calculateTotal(){
    // let total = 0;
    // for (const item of this.invoice.items) {
    //   total += item.total();
    // }
    //return total;
    return this.invoice.items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }


  // Método para registrar/guardar la factura
  registrarFactura(facturaData: any): Observable<any> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/registrar`, facturaData, { headers });


  }



  // Método para obtener el catálogo de productos/servicios (para el autocompletado o selector)
    obtenerSiguienteNumero(): Observable<any> {

    return this.http.get<{ numero: string }>(`${this.apiUrl}/siguiente-numero`)

  }

buscarFacturas(
    fecha?: string | Date,
    cliente?: string,
    empresa?: string
  ): Observable<any[]> { // Reemplaza 'any[]' por tu modelo, ej: Observable<Factura[]>

    let params = new HttpParams();

    // Solo agregamos el parámetro a la URL si tiene un valor definido
    if (fecha) {
      // Si es un objeto Date, puedes formatearlo a string (ej: YYYY-MM-DD) si tu backend lo requiere
      const fechaStr = fecha instanceof Date ? fecha.toISOString().split('T')[0] : fecha;
      params = params.set('fecha', fechaStr);
    }

    if (cliente && cliente.trim() !== '') {
      params = params.set('nombreCliente', cliente.trim());
    }

    if (empresa && empresa.trim() !== '') {
      params = params.set('nombreEmpresa', empresa.trim());
    }

    // Realiza la petición GET enviando los parámetros en la query string
    return this.http.get<any[]>(`${this.apiUrl}/buscar`, { params });
  }




}
