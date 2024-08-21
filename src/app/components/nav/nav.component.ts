import { Component } from '@angular/core';
import { MatSidenavModule} from '@angular/material/sidenav'
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { timeout } from 'rxjs';
import { Toast, ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService){}

  ngOnInit(): void{
    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
    this.toastr.info("Logout realizado com sucesso!", "Logout", {timeOut: 4000});
  }

}
