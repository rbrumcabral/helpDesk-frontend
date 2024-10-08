import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import { TranslateTools } from '../../../services/translate/translate.service';

@Component({
  selector: 'app-client-delete',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink, MatFormField, ReactiveFormsModule, NgxMaskDirective, MatRadioModule, TranslateModule],
  providers: [provideNgxMask(), ToastrService],
  templateUrl: './client-delete.component.html',
  styleUrl: './client-delete.component.css'
})
export class ClientDeleteComponent implements OnInit {
  form: FormGroup;

  client: Client = {
    'id': '',
    'name': '',
    'cpf': '',
    'email': '',
    'password': '',
    'profile': '',
    'creationDate': ''
  }

  constructor(
    private service: ClientService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateTools
  ) { }

  ngOnInit() {
    this.toastrConfig();
    this.form = this.fb.group({
      profile: [{ value: '', disabled: 'true' }],
      name: ['',],
      cpf: ['',],
      email: ['',],
      password: ['',],
      confirmPassword: ['',]
    });
    this.client.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.client.id).subscribe({
      next: (response) => {
        this.client = response;
        this.fillForm();
      },
      error: (error) => {
        this.toastr.error(this.translate.translate('error.findByIdClient'), this.translate.translate('error.error'));
      }
    })
  }

  delete(): void {
    this.service.delete(this.client.id).subscribe({
      next: (response) => {
        this.toastr.success(this.translate.translate('success.deleteUser'), this.translate.translate('success.success'));
        this.router.navigate(['client']);
      },
      error: (error) => {
        this.toastr.error(this.translate.translate('error.deleteClient'), this.translate.translate('error.error'));
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
    this.form.get('profile').setValue(this.client.profile);
    this.form.get('password').setValue("");
  }

  toastrConfig() {
    this.toastr.toastrConfig.timeOut = 4000;
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

}
