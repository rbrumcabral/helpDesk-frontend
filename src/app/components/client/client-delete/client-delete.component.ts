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
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-delete',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink, MatFormField, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask(), ToastrService],
  templateUrl: './client-delete.component.html',
  styleUrl: './client-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDeleteComponent {
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
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.toastrConfig();
    this.form = this.fb.group({
      adminType: [{ value: false, disabled: true }],
      name: ['', [Validators.minLength(6), Validators.required]],
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.minLength(8), Validators.required]]
    });
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

  delete(): void {
    this.service.delete(this.client).subscribe({
      next: (response) => {
        this.toastr.success("Usuário deletado com sucesso!", "Sucesso");
        this.router.navigate(['client']);
      },
      error: (error) => {
        this.toastr.error("Falha ao deletar o usuário", "Erro");
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
