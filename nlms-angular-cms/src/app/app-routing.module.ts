import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AdminComponent } from './admin/admin.component';
import { PermissionComponent } from './permission/permission.component';
import { RolesComponent } from './roles/roles.component';
import { GroupComponent } from './group/group.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import {  PostComponent } from './posts/posts.component';
import { SlidersComponent } from './sliders/sliders.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
  ]
})
export class AppRoutingModule { }
