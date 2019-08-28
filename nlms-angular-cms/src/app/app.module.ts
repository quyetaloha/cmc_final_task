import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
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
import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserCourseComponent } from './user-course/user-course.component';
import { ContactComponent } from './contact/contact.component';
import { CourseComponent } from './course/course.component';
import { LessonsComponent } from './lessons/lessons.component';
import { NgbModalConfig, NgbModal, NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterNamePipe } from './pipes/filter-name.pipe';
import { FilterCoursePipe } from './pipes/filter-course.pipe';
import { FilterstatusPipe } from './pipes/filterstatus.pipe';
import { SettingComponent } from './setting/setting.component';
import { TestComponent } from './test/test.component';
import { CKEditorModule } from 'ckeditor4-angular';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path:'admin',component: AdminComponent},
  { path:'test',component:TestComponent},

  ]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AdminComponent,
    PermissionComponent,
    RolesComponent,
    GroupComponent,
    UserListComponent,
    UserDetailsComponent,
    UserRolesComponent,
    PostComponent,
    SlidersComponent,
    LoginComponent,
    UserProfileComponent,
    UserCourseComponent,
    ContactComponent,
    CourseComponent,
    LessonsComponent,
    FilterNamePipe,
    FilterCoursePipe,
    FilterstatusPipe,
    SettingComponent,
    TestComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CKEditorModule,    
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    NgbModalModule
  ],
  entryComponents: [CourseComponent,UserListComponent],
  providers: [{provide: APP_BASE_HREF, useValue: ''}],
  bootstrap: [AppComponent]
})
export class AppModule { }
