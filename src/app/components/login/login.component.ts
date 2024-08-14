import { Component } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatButton, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ToastrService]
})

export class LoginComponent {

  constructor(private toastr: ToastrService) {
    this.toastrConfig();
  }

  passwordVisible: boolean = false;

  credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null,
    [Validators.minLength(3),
    Validators.required
    ]
  );

  validaCampos(): boolean {
    if (this.email.valid && this.senha.valid) {
      return true;
    }
    return false;
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
    this.toastr.error('Usuário e/ou senha inválidos!', "Login");
    this.credenciais.senha = '';
  }
}
