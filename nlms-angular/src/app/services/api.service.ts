import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // domain: string = "http://46e0cdbd.ngrok.io/";
  

  domain: string = "http://localhost:8080/";
  getAllCourseApi: string = "courses";
  getRecentPostApi: string = "recentposts";
  getMainCategoryApi: string = "categorys";
  getSliderApi: string = "sliders";
  //getCourseApi: string="course";
  authenticateApi: string = "authenticate";
  myCourseApi: string = "userCourse";
  getProgressApi: string = "progresses";
  getAllPostApi: string = "posts";
  getUserOrderApi: string = "orderByUser";
  getOrderApi: string = "order";
  addUserOrderApi: string = "order";
  getCourseStudyApi: string = "course-study";
  getCourseLessonStudyApi: string = "course-study-lesson";
  favouriteApi: string = "favourite";
  getProgressStudyApi = "update-lesson-status";
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
    })
  }
  // getCourseRequest(): Observable<HttpResponse<any>>
  // {
  //   var headers =  new HttpHeaders({
  //     'Content-Type': "application/json",
  //   })
  //   var tokenHttpOptions = {
  //     headers: headers
  //   }
  //   return this.http.get<HttpResponse<any>>(this.domain + this.getCourseApi, tokenHttpOptions);
  // }
  // getUserLogin():Observable<HttpResponse<any>>{
  //   console.log("Token: " + token);
  //   var headers =  new HttpHeaders({
  //     'Content-Type': "application/json",
  //     'Authorization': "Token " + token
  //   })
  //   var tokenHttpOptions = {
  //     headers: headers

  //   }
  //   return this.http.get<HttpResponse<any>>(this.domain + this.myCourseApi, tokenHttpOptions);
  // }
  getAllCoursesRequest(): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
    })
    var tokenHttpOptions = {
      headers: headers
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.getAllCourseApi, tokenHttpOptions);
  }
  getRecentPostRequest(quantity: number): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
    })
    var tokenHttpOptions = {
      headers: headers,
      params: new HttpParams().set("number", quantity.toString())
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.getRecentPostApi, tokenHttpOptions);
  }
  getMainCategories(): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
    })
    var tokenHttpOptions = {
      headers: headers
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.getMainCategoryApi, tokenHttpOptions);
  }
  getSliders(): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
    })
    var tokenHttpOptions = {
      headers: headers
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.getSliderApi, tokenHttpOptions);
  }
  getMyCourse(token: string): Observable<HttpResponse<any>> {
    console.log("Token: " + token);
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    })
    var tokenHttpOptions = {
      headers: headers
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.myCourseApi, tokenHttpOptions);
  }
  getProgresses(token: string) {
    console.log("Token: " + token);
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    })
    var tokenHttpOptions = {
      headers: headers
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.getProgressApi, tokenHttpOptions);
  }
  getAllPostRequest(): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
    })
    var tokenHttpOptions = {
      headers: headers
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.getAllPostApi, tokenHttpOptions);
  }
  getUserOrderRequest(token: string): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    })
    var tokenHttpOptions = {
      headers: headers
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.getUserOrderApi, tokenHttpOptions);
  }
  addUserOrderRequest(order: Order, token: string): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    })
    var tokenHttpOptions = {
      headers: headers
    }
    return this.http.post<HttpResponse<any>>(this.domain + this.addUserOrderApi, order, tokenHttpOptions);
  }
  getCourse(idCourse: number, token: string) {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    })
    var tokenHttOptions = {
      headers: headers,
      params: new HttpParams().append("idCourse", idCourse.toString())
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.getCourseStudyApi, tokenHttOptions);
  }
  getCourseLesson(idCourse: number, idLesson: number, token: string) {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    })
    var tokenHttOptions = {
      headers: headers,
      params: new HttpParams().append("idCourse", idCourse.toString())
        .append("idLesson", idLesson.toString())
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.getCourseLessonStudyApi, tokenHttOptions);
  }

  addFavourite(course: Course, token: string): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    })
    var tokenHttpOptions = {
      headers: headers
    }
    return this.http.post<HttpResponse<any>>(this.domain + this.favouriteApi, course, tokenHttpOptions);
  }

  removeFavourite(course: Course, token: string): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    })
    var tokenHttpOptions = {
      headers: headers,
      body: course
    }
    return this.http.delete<HttpResponse<any>>(this.domain + this.favouriteApi, tokenHttpOptions);
  }

  getFavourite(token: string): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    })
    var tokenHttpOptions = {
      headers: headers
    }
    return this.http.get<HttpResponse<any>>(this.domain + "favourites", tokenHttpOptions);
  }
  getProgressStudy(token: string, idCourse: number, idLesson: number): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    });
    var httpOptions = {
      headers: headers,
      params: new HttpParams().append("idCourse", idCourse.toString()).append("idLesson", idLesson.toString())
    }
    return this.http.get<HttpResponse<any>>(this.domain+this.getProgressStudyApi, httpOptions);
  }
  getOrderRequest(id: number, token: string): Observable<HttpResponse<any>> {
    var headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Authorization': "Token " + token
    })
    var tokenHttpOptions = {
      headers: headers,
      params: new HttpParams().append("id", id.toString())
    }
    return this.http.get<HttpResponse<any>>(this.domain + this.getOrderApi, tokenHttpOptions);
  }
}