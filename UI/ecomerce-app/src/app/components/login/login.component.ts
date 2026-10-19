import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 1. Importa FormsModule
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {

loginData = { email: '', password: '' };
  errorMessage: string = '';


  // Lista de usuarios simulados permitidos
  usuariosPermitidos = [
    { email: 'admin@correo.com', password: '12345', rol: 'Administrador' },
    { email: 'cajero@correo.com', password: 'abcde', rol: 'Cajero' }
  ];

  constructor(private router: Router) {}

  iniciarSesion() {
    debugger
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Completa todos los campos.';
      return;
    }

    // Buscamos si el correo y la contraseña coinciden con alguno de la lista
    const usuarioEncontrado = this.usuariosPermitidos.find(
      u => u.email === this.loginData.email && u.password === this.loginData.password
    );

    if (usuarioEncontrado) {
      this.errorMessage = '';
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('usuarioNombre', usuarioEncontrado.rol);
      //alert(`¡Bienvenido, ${usuarioEncontrado.rol}!`);

      // Redirigir
      this.router.navigate(['/facturas']);
    } else {
      this.errorMessage = 'Credenciales inválidas. Inténtalo de nuevo.';
    }
  }
}
