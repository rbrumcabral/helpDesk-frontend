import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink, MatFormField, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask(), ToastrService],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientCreateComponent {

  form: FormGroup;

  client: Client = {
    'id': '',
    'name': '',
    'cpf': '',
    'email': '',
    'password': '',
    'profiles': [],
    'creationDate': ''
  }

  constructor(
    private service: ClientService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.toastrConfig();
    this.form = this.fb.group({
      adminType: ['',],
      name: ['', [Validators.minLength(6), Validators.required]],
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  validaCampos(): boolean {
    return this.form.get('name').valid && this.form.get('cpf').valid && this.form.get('email').valid && this.form.get('password').valid
      && this.form.get('password').value === this.form.get('confirmPassword').value;
  }

  create(): void {
    this.fillClient();
    this.service.create(this.client).subscribe({
      next: (response) => {
        this.toastr.success("Usuário criado com sucesso!", "Sucesso");
        this.router.navigate(['client']);
      },
      error: (error) => {
        this.toastr.error("Falha ao criar o usuário", "Erro");
        if(error.error.errors){
          error.error.errors.forEach(element => {
            this.toastr.error(element.message);
          });
        } else {
          console.log(error.error);
          this.toastr.error(error.error.message);
        }
      }
    })
  }

  fillClient() {
    this.client.name = this.form.get('name').value;
    this.client.cpf = this.form.get('cpf').value;
    this.client.email = this.form.get('email').value;
    this.client.password = this.form.get('password').value;

    if (this.form.get('adminType').value) {
      this.client.profiles.push('0');
    }

  }

  toastrConfig() {
    this.toastr.toastrConfig.timeOut = 4000;
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

}
