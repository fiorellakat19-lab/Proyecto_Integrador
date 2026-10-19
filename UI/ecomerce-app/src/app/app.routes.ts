import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceRegisterComponent } from './components/invoice-register/invoice-register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
{ path: 'login', component: LoginComponent },

  // Rutas protegidas que comparten el Navbar
  {
    path: '',
    component: NavbarComponent, // Este componente contiene el Navbar y un <router-outlet>
    canActivate: [authGuard],
    children: [
      { path: 'facturas', component: InvoiceComponent },
      { path: 'registrar-factura', component: InvoiceRegisterComponent },
      { path: '', redirectTo: 'facturas', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
