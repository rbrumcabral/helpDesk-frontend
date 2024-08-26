import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: '', component: NavComponent, canActivate:[authGuard], children: [
            { path: 'home', component: HomeComponent },
            { path: 'tecnicos', component: TechnicianListComponent }
        ]
    }
];
