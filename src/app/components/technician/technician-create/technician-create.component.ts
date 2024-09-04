import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Technician } from '../../../models/technician';
import { TechnicianService } from '../../../services/technician/technician.service';
import { TranslateTools } from '../../../services/translate/translate.service';

@Component({
  selector: 'app-technician-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink, MatFormField, ReactiveFormsModule, NgxMaskDirective, MatRadioModule, TranslateModule],
  providers: [provideNgxMask(), ToastrService],
  templateUrl: './technician-create.component.html',
  styleUrl: './technician-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicianCreateComponent {

  form: FormGroup;

  technician: Technician = {
    'id': '',
    'name': '',
    'cpf': '',
    'email': '',
    'password': '',
    'profile': '',
    'creationDate': ''
  }

  constructor(
    private service: TechnicianService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateTools
  ) {
    this.toastrConfig();
    this.form = this.fb.group({
      profile: ['DEFAULT',],
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
    this.fillTechnician();
    this.service.create(this.technician).subscribe({
      next: (response) => {
        this.toastr.success(this.translate.translate('success.createUser'), this.translate.translate('success.success'));
        this.router.navigate(['technician']);
      },
      error: (error) => {
        this.toastr.error(this.translate.translate('error.createUser'), this.translate.translate('error.error'));
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

  fillTechnician() {
    this.technician.name = this.form.get('name').value;
    this.technician.cpf = this.form.get('cpf').value;
    this.technician.email = this.form.get('email').value;
    this.technician.password = this.form.get('password').value;
    this.technician.profile = this.form.get('profile').value;
  }

  toastrConfig() {
    this.toastr.toastrConfig.timeOut = 4000;
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

}
