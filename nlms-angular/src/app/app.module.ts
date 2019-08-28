import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { StorageModule } from '@ngx-pwa/local-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DemoMaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { LoginComponent, LoginFailedDialog, EmailFailedDialog, EmailSucssessDialog } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent, RegisterFailedDialog, RegisterSucsessDialog } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { IndexComponent } from './index/index/index.component';
import { CourseDetailComponent, AddedToCartDialog, FavSuccessDialog } from './course-detail/course-detail.component';
//import { HeaderComponent } from './common/header/header.component';
import { SliderComponent } from './common/slider/slider.component';
import { StringshorteningPipe } from './pipes/stringshortening.pipe';
import { MycourseComponent } from './mycourse/mycourse/mycourse.component';
import { FooterComponent } from './common/footer/footer.component';
import { ListCourseComponent } from './list-course/list-course.component';
import { ListCourseFilterPipe } from './pipes/list-course-pipes/list-course-filter.pipe';
import { LengthMinuteToTimeFormatPipe } from './pipes/list-course-pipes/length-minute-to-time-format.pipe';
import { StringShortPipe } from './pipes/list-course-pipes/stringshort.pipe';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactComponent, ContactSuccessDialog } from './contact/contact.component';
import { ListpostComponent } from './list-post/listpost/listpost.component';
import { CartComponent, ConfirmDeleteDialog, OrderSuccessDialog, ErrorMessageDialog } from './cart/cart/cart.component';
import { OrderHistoryComponent } from './orderHistory/order-history/order-history.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FavoriteCourseComponent, ConfirmFavDeleteDialog } from './favorite-course/favorite-course.component';
import { HeaderComponent } from './common/header/header.component';
import { LessonSourseStudyComponent } from './study/lesson-sourse-study/lesson-sourse-study.component';
import { SourseStudyComponent } from './study/sourse-study/sourse-study.component';
import { SearchResultComponent } from './searchresult/search-result/search-result.component';
import { CourseNameFilterPipe } from './pipes/course-name-filter.pipe';
import { TestComponent } from './test/test.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrderDetailComponent } from './orderDetail/order-detail/order-detail.component';

// import {BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    RegisterComponent,
    ConfirmEmailComponent,
    IndexComponent,
    CourseDetailComponent,
    IndexComponent,
    StringshorteningPipe,
    MycourseComponent,
    HeaderComponent,
    SliderComponent,
    IndexComponent,
    FooterComponent,
    ListCourseComponent,
    ListCourseFilterPipe,
    LengthMinuteToTimeFormatPipe,
    StringShortPipe,
    UserProfileComponent,
    ContactComponent,
    ListpostComponent,
    CartComponent,
    ConfirmDeleteDialog,
    OrderSuccessDialog,
    OrderHistoryComponent,
    BlogDetailComponent,
    HeaderComponent,
    AddedToCartDialog,
     SourseStudyComponent,
    LessonSourseStudyComponent,
    LoginFailedDialog,
    RegisterFailedDialog,
    RegisterSucsessDialog,
    EmailFailedDialog,
    EmailSucssessDialog,
    AddedToCartDialog,
    FavoriteCourseComponent,
    ConfirmFavDeleteDialog,
    ContactSuccessDialog,
    ErrorMessageDialog,
    SearchResultComponent,
    CourseNameFilterPipe,
    TestComponent,
    FavSuccessDialog,
    OrderDetailComponent,
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    StorageModule.forRoot({
      IDBNoWrap: true,
    }),
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDeleteDialog,
    OrderSuccessDialog,
    LoginFailedDialog,
    RegisterFailedDialog,
    RegisterSucsessDialog,
    EmailFailedDialog,
    EmailSucssessDialog,
    AddedToCartDialog,
    ConfirmFavDeleteDialog,
    ContactSuccessDialog,
    ErrorMessageDialog,
    FavSuccessDialog
  ]
})
export class AppModule { }
