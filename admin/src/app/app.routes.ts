import { Routes } from '@angular/router';
import { Auth } from './core/app.auth';
export const appRoutes: Routes = [
    { path: '', redirectTo: 'main/index', pathMatch: 'full' },
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'main', loadChildren: './main/main.module#MainModule', canActivate: [Auth] }
// tslint:disable-next-line:eofline
];