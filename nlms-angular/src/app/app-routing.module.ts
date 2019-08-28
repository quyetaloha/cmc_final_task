import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { IndexComponent } from './index/index/index.component';
import { SliderComponent } from './common/slider/slider.component';
import { HeaderComponent } from './common/header/header.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { MycourseComponent } from './mycourse/mycourse/mycourse.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ContactComponent } from './contact/contact.component';
import { ListCourseComponent } from './list-course/list-course.component';
import { ListpostComponent } from './list-post/listpost/listpost.component';
import { CartComponent } from './cart/cart/cart.component';
import { OrderHistoryComponent } from './orderHistory/order-history/order-history.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FavoriteCourseComponent } from './favorite-course/favorite-course.component';
import { SourseStudyComponent } from './study/sourse-study/sourse-study.component';
import { LessonSourseStudyComponent } from './study/lesson-sourse-study/lesson-sourse-study.component';
import { SearchResultComponent } from './searchresult/search-result/search-result.component';
import { TestComponent } from './test/test.component';
import { OrderDetailComponent } from './orderDetail/order-detail/order-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'change', component: ChangePasswordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm', component: ConfirmEmailComponent },
  { path: "index", component: IndexComponent },
  { path: "", component: IndexComponent },
  { path: "course-detail", component: CourseDetailComponent },
  { path: "mycourse", component: MycourseComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "contact", component: ContactComponent },
  { path: "course-detail/:id", component: CourseDetailComponent },
  { path: "mycourse", component: MycourseComponent },
  { path: "list-course", component: ListCourseComponent },
  { path: "list-post", component: ListpostComponent },
  { path: "cart", component: CartComponent },
  { path: "orderHistory", component: OrderHistoryComponent },
  { path: "blog-detail/:id", component: BlogDetailComponent },
  { path: "favourite", component: FavoriteCourseComponent },
  // { path: "header", component: HeaderComponent}
  { path: "course-study/:idCourse", component: SourseStudyComponent },
  { path: "course-study/:idCourse/:idLesson", component: LessonSourseStudyComponent },
  { path: "searchresult/:query", component: SearchResultComponent},
  {path:"test", component: TestComponent},
  { path: "orderDetail/:id", component: OrderDetailComponent },
  // { path: "header", component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
