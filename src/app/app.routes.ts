import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DoctorComponent } from './doctor/doctor.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent
    }
    ,
    {
        path: 'doctor',
        component: DoctorComponent
    }
    ,
    {
        path: 'especialidad',
        component: EspecialidadComponent
    
    }
    ,
    {
        path: 'menu',
        component: MenuComponent
    }
    
    ,
    {
        path: '**',
        redirectTo: ''
    }


];
