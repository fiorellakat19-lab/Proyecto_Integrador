import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './navbar.html',

})
export class NavbarComponent {

 constructor(private router: Router) {}
cerrarSesion() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('usuarioNombre');
    this.router.navigate(['/login']);
  }
}
