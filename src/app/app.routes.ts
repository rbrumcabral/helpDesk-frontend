import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { TechnicianCreateComponent } from './components/technician/technician-create/technician-create.component';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { TechnicianUpdateComponent } from './components/technician/technician-update/technician-update.component';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: '', component: NavComponent, canActivate: [authGuard], children: [
            { path: 'home', component: HomeComponent },
            { path: 'technician', component: TechnicianListComponent },
            { path: 'technician/create', component: TechnicianCreateComponent },
            { path: 'technician/update/:id', component: TechnicianUpdateComponent }
        ]
    }
];
