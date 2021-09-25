import {Routes} from '@angular/router';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const Full_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('src/app/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        loadChildren: () => import('src/app/employee/employee.module').then(m => m.EmployeeModule)
    }
];
