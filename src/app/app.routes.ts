import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: UserFormComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
];
