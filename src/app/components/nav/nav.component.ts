import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-tecnico-list',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatCardModule, MatButtonModule, HeaderComponent, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [ToastrService]
})
export class NavComponent {

  showFiller = false;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
    this.toastr.info("Logout realizado com sucesso!", "Logout", { timeOut: 4000 });
  }

}
