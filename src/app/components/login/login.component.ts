import { Component } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatButton, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ToastrService]
})

export class LoginComponent {

  constructor(
    private toastr: ToastrService,
    private service: AuthService, 
    private router: Router) {
    this.toastrConfig();
  }

  passwordVisible: boolean = false;

  credenciais = {
    username: '',
    password: ''
  }

  username = new FormControl(null, Validators.email);
  password = new FormControl(null,
    [Validators.minLength(3),
    Validators.required
    ]
  );

  validaCampos(): boolean {
    return (this.username.valid && this.password.valid);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toastrConfig(){
    this.toastr.toastrConfig.timeOut = 4000;
    this.toastr.toastrConfig.closeButton = true; 
    this.toastr.toastrConfig.progressBar = true;
  }

  logar(){
    this.service.authenticate(this.credenciais).subscribe( response => {
      this.service.sucessfulLogin(JSON.parse(response.body).accessToken);
      this.router.navigate(['home']);
    }, 
    () => {
      this.toastr.error("Usuário e/ou senha incorretos!");  
    });
  }
}
