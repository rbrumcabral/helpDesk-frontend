import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-technician-create',
  standalone: true,
  imports: [MatCheckboxModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink, MatFormField, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './technician-create.component.html',
  styleUrl: './technician-create.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicianCreateComponent {

  adminType: FormControl = new FormControl(null, []);
  clientType: FormControl = new FormControl(null, []);
  technicianType: FormControl = new FormControl(null, []);
  name: FormControl = new FormControl(null, [Validators.minLength(6), Validators.required]);
  cpf: FormControl = new FormControl(null, [Validators.minLength(11), Validators.maxLength(11), Validators.required]);
  email: FormControl = new FormControl(null, [Validators.email, Validators.required]);
  password: FormControl = new FormControl(null, [Validators.minLength(8), Validators.required]);
  confirmPassword: FormControl = new FormControl(null, [Validators.minLength(8), Validators.required]);

  validaCampos(): boolean {
    return this.name.valid && this.cpf.valid && this.email.valid && this.password.valid 
    && this.password.value === this.confirmPassword.value && this.atLeastOneTypeChecked();
  }

  atLeastOneTypeChecked(): boolean{
    return this.adminType.value || this.clientType.value || this.technicianType.value;
  }

}
