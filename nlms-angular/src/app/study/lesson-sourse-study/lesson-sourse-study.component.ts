import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Routes, Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Course } from 'src/app/model/course';
import { Lesson } from 'src/app/model/lesson';
import { StorageService } from 'src/app/services/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval } from 'rxjs';

@Component({
  selector: 'app-lesson-sourse-study',
  templateUrl: './lesson-sourse-study.component.html',
  styleUrls: ['./lesson-sourse-study.component.css']
})
export class LessonSourseStudyComponent implements OnInit {
  dem: number =0;
  course: Course = new Course();
  lessonNext: Lesson = new Lesson();
  lessonBack: Lesson = new Lesson();
  lesson: Lesson = new Lesson();
  listUserLesson: any[];
  listLessonCon: Lesson[];
  listLessonCheck: Lesson[];
  token: string = "" //= JSON.parse(localStorage.getItem("value")).user.data[1];
  urlVideo: string = "";
  urlPDF : string ="";
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private storageService: StorageService) {
  }

  ngOnInit() {
    // this.spinner.show();
    this.storageService.localStorage.getItem("token").subscribe((data: string) => {
      if (data == null)
        return;
      this.token = data;

      this.route.paramMap.subscribe((params) => {
        var courseID = this.route.snapshot.params.idCourse;
        var lessonID = this.route.snapshot.params.idLesson;
        this.apiService.getCourseLesson(courseID, lessonID, this.token)
          .subscribe((response: HttpResponse<any>) => {

            var r: any = response;
            this.course = r.data.course;
            this.lesson = r.data.lesson;
            this.listLessonCon = r.data.listLesson;
            this.dem = r.data.number;
            console.log(this.listLessonCon);

            var listDocm: any[] = this.lesson.listDocument;
            // this.urlVideo = listDocm[0].url;
            listDocm.forEach(element => {
              if(element.type.value==1){
                this.urlPDF=element.url;
              }else if(element.type.value==2){
                this.urlVideo = element.url;
              }
            });
            
            //lessonNext
            for (let index = 0; index < this.listLessonCon.length; index++) {
              const e = this.listLessonCon[index];
              if (e.id == this.lesson.id) {
                if (index + 1 < this.listLessonCon.length) {
                  this.lessonNext = this.listLessonCon[index + 1];
                }
              }
            }
            //lessonBack
            for (let index = 0; index < this.listLessonCon.length; index++) {
              const e = this.listLessonCon[index];
              if (e.id == this.lesson.id) {
                if (index - 1 >= 0) {
                  this.lessonBack = this.listLessonCon[index - 1];
                }
              }
            }
          }, (error: HttpErrorResponse) => {
            //error
          });
          this.dem = this.progressStudy(this.token, courseID, lessonID);
      });
    });
  }
  progressStudy(token: string, courseID: number, lessonID: number): number {
    setTimeout(() => {
      this.apiService.getProgressStudy(this.token, courseID, lessonID)
        .subscribe((response: HttpResponse<any>) => {
          var r: any = response;
          console.log('DEM LA : '+r.data.number);
          return r.data.number;
        }, (error: HttpErrorResponse) => {
          console.log("Error progressStudy");
        })
    }, 1000*60*2);
    return 0;
  }
  getEmbebUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.urlVideo);
  }
  pdfUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlPDF);
  }

}
