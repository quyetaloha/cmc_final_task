import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Course } from 'src/app/model/course';
import {HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {  ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Lesson } from 'src/app/model/lesson';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-sourse-study',
  templateUrl: './sourse-study.component.html',
  styleUrls: ['./sourse-study.component.css']
})
export class SourseStudyComponent implements OnInit {
  dem: number;
  lesson: Lesson = new Lesson();
  course: Course = new Course();
  lessonNext: Lesson = new Lesson();
  urlVideo: string;
  urlPDF:string;
  token: string = ""//= JSON.parse(localStorage.getItem("value")).user.data[1];
  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private sanitizer: DomSanitizer,
    private storageService: StorageService) {
  }
  ngOnInit() {
    this.storageService.localStorage.getItem("token").subscribe((data: string) => {
      if(data == null)
        return;
      this.token = data;
      this.route.paramMap.subscribe((params) => {
        var courseId = this.route.snapshot.params.idCourse;
        this.apiService.getCourse(courseId, this.token).subscribe((response: HttpResponse<any>) => {
          
          var r: any = response;
          this.course = r.data.course;
          console.log(this.course);
          this.dem =r.data.number;
          this.lesson = r.data.listLesson[0];
          
          var listLesson: any[] = this.course.listLesson;
          var subListLesson: any[] = listLesson[0].listLesson;
          var listDocum: any[] = subListLesson[0].listDocument;
          // this.urlVideo = listDocum[0].url;
          listDocum.forEach(element => {
            if(element.type.value==2){
              this.urlPDF=element.url;
            }else if(element.type.value==1){
              this.urlVideo = element.url;
            }
          });
          console.log(this.urlVideo);
          console.log(this.course);
          //lessonNext
          this.lessonNext=r.data.listLesson[1];
        }, (error: HttpErrorResponse) => {
          //error
        })
      });
    });
    
  }
  getEmbebUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.urlVideo);
  }

  pdfUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlPDF);
  }
}
