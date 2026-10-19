import { Injectable } from '@angular/core';
import { Product } from '../models/product';

import { Observable, of } from 'rxjs';
import { clientes } from '../data/clientes.data';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {

  constructor(){

  }

  findAllCliente(): Observable<Client[]>{
    return of(clientes);;
  }
//  getProducts(): Observable<any[]> {

//       return { ...this.products };
//   //   return this.http.get<any[]>('https://api.tu-dominio.com/v1/products');
//    }

}
