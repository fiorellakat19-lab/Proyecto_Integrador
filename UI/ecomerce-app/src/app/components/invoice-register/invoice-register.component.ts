import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';


// 1. Declara la interfaz aquí arriba
interface ItemFactura {
  id: number;
  producto: string;
  precio: number;
  cantidad: number;
}


@Component({
  selector: 'app-invoice-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-register.html',
})
export class InvoiceRegisterComponent implements OnInit {

  // Objeto principal que almacena los datos de la cabecera y el cliente
  factura = {
    numero: '',
    fecha: '', // Fecha actual por defecto
    cliente: {
      nombre: '',
      ubicacion: '',
      direccion: ''
    },
    empresa: {
      nombre: '',
      ruc: ''
    }
  };

  // Lista dinámica de productos (inicia con al menos 1 ítem)
  items: ItemFactura[] = [
    { id: 1, producto: '', precio: 0, cantidad: 1 }
  ];

  constructor(private router: Router,
    private facturaService: InvoiceService

  ) {}
  ngOnInit(): void {

    this.factura.fecha = new Date().toISOString().split('T')[0];
    this.facturaService.obtenerSiguienteNumero().subscribe({
      next: (res) => {
        debugger
        this.factura.numero = res.numero; // Ej: "F001-00015"
      },
      error: (err) => console.error('Error al obtener número de factura', err)
    });
  }

  // Método para agregar una nueva fila vacía a la tabla de productos
  agregarItem() {
    debugger
    const nuevoId = this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1;
    this.items.push({
      id: nuevoId,
      producto: '',
      precio: 0,
      cantidad: 1
    });
  }

  // Método para eliminar un ítem de la tabla según su índice
  eliminarItem(index: number) {
    if (this.items.length > 1) {
      this.items.splice(index, 1);
    } else {
      alert('La factura debe tener al menos un ítem.');
    }
  }

  // Método para calcular el importe total de la factura en tiempo real
  calcularTotal(): number {
    return this.items.reduce((acc, item) => acc + (Number(item.precio) * Number(item.cantidad)), 0);
  }

  // Método que se ejecuta al enviar el formulario
  guardarFactura() {
    debugger
    // Validaciones básicas
    if (!this.factura.numero || !this.factura.cliente.nombre) {
      alert('Por favor, completa los campos obligatorios de la factura y del cliente.');
      return;
    }

    // Objeto final listo para enviar a una API o guardar en LocalStorage
    const facturaCompleta = {
      ...this.factura,
      items: this.items,
      montoTotal: this.calcularTotal()
    };

    console.log('Factura registrada con éxito:', facturaCompleta);
    alert('¡Factura guardada correctamente!');

    // Redirigir de vuelta a la lista de facturas
   // this.router.navigate(['/facturas']);


    // 3. Enviar al servicio HTTP
    this.facturaService.registrarFactura(facturaCompleta).subscribe({
      next: (response) => {
        console.log('Factura registrada con éxito en el backend:', response);
        alert('¡Factura guardada correctamente!');

        // 4. Redirigir de vuelta a la lista SOLO DESPUÉS de que el servidor responda OK
        this.router.navigate(['/facturas']);
      },
      error: (err) => {
        console.error('Error al registrar la factura:', err);
        alert('Hubo un error al guardar la factura en la base de datos.');
      }
    });
  }






}
