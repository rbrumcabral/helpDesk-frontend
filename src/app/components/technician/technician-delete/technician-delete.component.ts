import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ToastrService } from 'ngx-toastr';
import { Technician } from '../../../models/technician';
import { TechnicianService } from '../../../services/technician/technician.service';
import { TranslateTools } from '../../../services/translate/translate.service';

@Component({
  selector: 'app-technician-delete',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink, MatFormField, ReactiveFormsModule, NgxMaskDirective, MatRadioModule, TranslateModule],
  providers: [provideNgxMask(), ToastrService],
  templateUrl: './technician-delete.component.html',
  styleUrl: './technician-delete.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicianDeleteComponent {
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
    private activeRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateTools
  ) {
    this.toastrConfig();
    this.form = this.fb.group({
      profile: [{ value: '', disabled: 'true' }],
      name: ['', [Validators.minLength(6), Validators.required]],
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11), Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  ngOnInit() {
    this.technician.id = this.activeRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.technician.id).subscribe({
      next: (response) => {
        console.log(response);
        this.technician = response;
        this.fillForm();
      },
      error: (error) => {
        this.toastr.error(this.translate.translate('error.findByIdTechnician'), this.translate.translate('error.error'));
      }
    })
  }

  delete(): void {
    this.service.delete(this.technician.id).subscribe({
      next: (response) => {
        this.toastr.success(this.translate.translate('success.deleteTechnician'), this.translate.translate('success.success'));
        this.router.navigate(['technician']);
      },
      error: (error) => {
        this.toastr.error(this.translate.translate('error.deleteTechnician'), this.translate.translate('error.error'));
        if (error.error.errors) {
          error.error.errors.forEach(element => {
            this.toastr.error(element.message);
            console.log(error.error);
          });
        } else {
          console.log(error.error);
          this.toastr.error(error.error.message);
        }
      }
    })

  }

  fillForm() {
    this.form.get('name').setValue(this.technician.name);
    this.form.get('cpf').setValue(this.technician.cpf);
    this.form.get('email').setValue(this.technician.email);
    this.form.get('profile').setValue(this.technician.profile);
    this.form.get('password').setValue("");
  }

  toastrConfig() {
    this.toastr.toastrConfig.timeOut = 4000;
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

}
