import { CommonModule,isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';
import {  InvoiceComponent } from './components/invoice/invoice.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [
    InvoiceComponent,
    CommonModule,
    RouterOutlet,
    Counter,
    LoginComponent,
    NavbarComponent
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {

  constructor(private router: Router) {}


  //  private platformId = inject(PLATFORM_ID);
   title: string = "ecomerce-app";
  //  subtitle: string = "Contador con estados de sesion";

  //   users?:string[] = ["user1", "user2", "user3"];
  //   visible: boolean=false;
  //   counter:number =0;

    // ngOnInit(): void {

    //   if (isPlatformBrowser(this.platformId)) {
    //   this.counter = parseInt(sessionStorage.getItem('counter') || '0', 10);
    // }
    // }


    // setVisible(){
    //   this.visible = this.visible? false:true;
    //   console.log(this.visible);
    // }

    // setCounter(event:number): void{
    //    this.counter = event;
    // }

   // Propiedad que verifica si hay sesión activa
    get isLoggedIn(): boolean {
      debugger
    return localStorage.getItem('isLoggedIn') === 'true';
   }

   // Método para cerrar sesión
  cerrarSesion() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('usuarioNombre');
    this.router.navigate(['/login']);
  }

  }
