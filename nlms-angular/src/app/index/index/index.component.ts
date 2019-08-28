import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Course } from 'src/app/model/course';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Post } from 'src/app/model/post';
import { Category } from 'src/app/model/category';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private apiService: ApiService,
    private spinner: NgxSpinnerService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.loadData();
    
  }
  course = new Course;
  listCourse: Course[] = [];
  featuredCourse: Course[] = [];
  recentPost: Post[] = [];
  date = new Date();
  featuredCategory: Category[] = [];
  key2 = 'value2';
  value2: any = null;
  isFavourite: boolean = false;

  loadData() {
    var obs = this.apiService.getAllCoursesRequest();
    obs.subscribe((response: HttpResponse<any>) => {
      var r : any = response;
      this.listCourse = r.data;

      //get featured courses
      for(var i = 0; i < 3; i++)
      {
        var value = Math.floor(Math.random()*this.listCourse.length);
        var temp = this.listCourse[value];
        this.featuredCourse.push(temp);
        this.listCourse = this.listCourse.filter((course: Course, index, arr) => {
          return course != temp;
        })
      }
    }, (error: HttpErrorResponse) => {
      alert("An error has occured while loading data, please try again later :(");
    })

    var obs1 = this.apiService.getRecentPostRequest(4);
    obs1.subscribe((response: HttpResponse<any>) => {
      var r : any = response;
      this.recentPost = r.data;
    }, (error: HttpErrorResponse) => {
      alert("An error has occured while loading data, please try again later :(");
    })

    var obs2 = this.apiService.getMainCategories();
    obs2.subscribe((response: HttpResponse<any>) => {
      var r : any = response;
      var listCategory = r.data;
      
      //get featured categories
      for(var i = 0; i < 8; i++)
      {
        var value = Math.floor(Math.random()*listCategory.length);
        var temp = listCategory[value];
        this.featuredCategory.push(temp);
        listCategory = listCategory.filter((category: Category, index, arr) => {
          return category != temp;
        })
      }
      this.spinner.hide();

    }, (error: HttpErrorResponse) => {
      alert("An error has occured while loading data, please try again later :(");
    })
  }

  addToFavourite() {
		//have to check if user is logged in or not before executing
		this.storageService.localStorage.getItem("token").subscribe((token: string) => {
			if (token == null)
				return;
			this.apiService.addFavourite(this.course, token).subscribe(() => {
				//success
				this.isFavourite = true;
			});
		});
		console.log("favourite added");
	}
  // onClick(course:Course)
  // {
  //   console.log(course.id);
  //   localStorage.setItem(this.key2, JSON.stringify(course.id));
  //   this.router.navigate(['/course-detail']);
  // }

}
