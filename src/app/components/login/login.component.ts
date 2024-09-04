import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateTools } from '../../services/translate/translate.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatIcon, MatButton, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ToastrService]
})

export class LoginComponent {

  constructor(
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router,
    private translate: TranslateTools) {
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

  toastrConfig() {
    this.toastr.toastrConfig.timeOut = 4000;
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

  logar() {
    this.service.authenticate(this.credenciais).subscribe(response => {
      this.service.successfulLogin(JSON.parse(response.body).accessToken);
      this.router.navigate(['home']);
    },
      () => {
        this.toastr.error(this.translate.translate("login.error"));
      });
  }
}
