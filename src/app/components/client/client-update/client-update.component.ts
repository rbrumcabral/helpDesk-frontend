import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'app-client-update',
  standalone: true,
  templateUrl: './client-update.component.html',
  styleUrl: './client-update.component.css',
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink, MatFormField, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask(), ToastrService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientUpdateComponent {

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
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.toastrConfig();
    this.form = this.fb.group({
      adminType: ['',],
      name: ['', [Validators.minLength(6), Validators.required]],
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8)]],
      confirmPassword: ['', [Validators.minLength(8)]]
    });
  }

  validaCampos(): boolean {
    return this.form.get('name').valid && this.form.get('cpf').valid && this.form.get('email').valid && this.form.get('password').valid
      && this.form.get('password').value === this.form.get('confirmPassword').value;
  }

  ngOnInit() {
    this.client.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.client.id).subscribe({
      next: (response) => {
        console.log(response);
        this.client = response;
        this.fillForm();
      },
      error: (error) => {
        this.toastr.error("Falha ao recuperar técnico", "Erro");
      }
    })
  }

  update(): void {
    this.fillClient();
    this.service.update(this.client).subscribe({
      next: (response) => {
        this.toastr.success("Usuário atualizado com sucesso!", "Sucesso");
        this.router.navigate(['client']);
      },
      error: (error) => {
        this.toastr.error("Falha ao atualizar o usuário", "Erro");
        if (error.error.errors) {
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
    this.client.id = this.activeRoute.snapshot.paramMap.get('id');
    this.client.name = this.form.get('name').value;
    this.client.cpf = this.form.get('cpf').value;
    this.client.email = this.form.get('email').value;
    this.client.password = this.form.get('password').value;

    if (this.form.get('adminType').value) {
      this.client.profiles.push('0');
    }

  }

  fillForm() {
    this.form.get('name').setValue(this.client.name);
    this.form.get('cpf').setValue(this.client.cpf);
    this.form.get('email').setValue(this.client.email);
    this.form.get('password').setValue("");

    this.form.get('adminType').setValue(false);

    if (this.client.profiles.includes('ADMIN')) {
      this.form.get('adminType').setValue(true);
    }
  }

  toastrConfig() {
    this.toastr.toastrConfig.timeOut = 4000;
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

}
