import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Course } from 'src/app/model/course';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Post } from 'src/app/model/post';
import { Category } from 'src/app/model/category';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { User } from '../model/user';
import { UserCourse } from '../model/user-course';
import { NgxSpinnerService } from 'ngx-spinner';
// import { trigger, style, keyframes, transition } from '@angular/animations';

@Component({
	selector: 'app-course-detail',
	templateUrl: './course-detail.component.html',
	styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

	urlGetPostData: string =this.apiService.domain+"posts";
	posts: Post[] = null;
	key2 = 'value2';
	value2: any = null;
	course = new Course();
	course_id = JSON.parse(localStorage.getItem(this.key2));
	url = "";
	action: string = "cart";
	isFavourite: boolean = false;

	constructor(private apiService: ApiService, 
		private router: Router, private http: HttpClient,
		private route: ActivatedRoute,
		private storageService: StorageService,
		private dialog: MatDialog,
		private spinner: NgxSpinnerService) {
		//	console.log(this.value2);

	}

	ngOnInit() {
		this.spinner.show();
		this.route.paramMap.subscribe((params) => {
			this.course.id = this.route.snapshot.params.id;
			this.course_id = this.route.snapshot.params.id;
			console.log("courseId read from params: " + this.course_id);
			this.url = this.apiService.domain+`course?id=` + this.course_id;
			this.http.post(this.url, "").toPromise().then(
				(data: HttpResponse<any>) => {
					//console.log(data);
					var d: any = data;
				
					this.course = d.data;
					console.log("api course id:" + this.course.id);
					this.spinner.hide();
					//console.log(this.user);
					this.actionChooser(this.course_id);

					//check if user logged in
					//have to check if user is logged in or not before executing
					this.storageService.localStorage.getItem("token").subscribe((token: string) => {
						if (token == null)
							return;
						this.apiService.getFavourite(token).subscribe((response: HttpResponse<any>) => {
							
							var r: any = response;
							var listFav: Course[] = r.data;
							listFav = listFav.filter((item: Course) => {
								return this.course_id == item.id;
							});
							if (listFav.length > 0) //favourite
								this.isFavourite = true;
							else
								this.isFavourite = false;
								// spinner
									
						}, (error: HttpErrorResponse) => {
							alert("An error has occured while loading data, please try again later :(");
						});
					});
				});
		})
		this.http.get(this.urlGetPostData).toPromise().then(
			data => {
				let id = this.course_id;
				let tmpPost = [];
				console.log("hihi", data["data"]);
				let posts = data["data"];
				posts.forEach(element => {
					if (element.course && id == element.course.id) {
						tmpPost.push(element);
						console.log("có related post");
					}
				});
				this.posts = tmpPost;
				console.log("posts", this.posts);
			}
		)

	}

	addToCart(course: Course) {
		this.storageService.localStorage.getItem("cart").subscribe((data: Course[]) => {
			var listCourse: Course[];
			if (data != null)
				listCourse = data;
			else
				listCourse = [];
			listCourse.push(course);
			this.storageService.localStorage.setItem("cart", listCourse).subscribe(() => {
				//add to cart success
				const dialogRef = this.dialog.open(AddedToCartDialog, {
					width: '500px',
					data: {
						course: course
					}
				});
				this.actionChooser(this.course_id);
			});
		});
	}

	checkout(course: Course) {
		this.storageService.localStorage.getItem("cart").subscribe((data: Course[]) => {
			var listCourse: Course[];
			if (data != null)
				listCourse = data;
			else
				listCourse = [];
			listCourse.push(course);
			this.storageService.localStorage.setItem("cart", listCourse).subscribe(() => {
				this.router.navigate(["/cart"]);
			});
		});
	}

	study(course: Course) {
		this.router.navigate(["/course-study", this.course_id]);
	}

	addToFavourite() {
		//have to check if user is logged in or not before executing
		this.storageService.localStorage.getItem("token").subscribe((token: string) => {
			if (token == null)
				return;
			this.apiService.addFavourite(this.course, token).subscribe(() => {
				//success
				this.isFavourite = true;
				const dialogRef = this.dialog.open(FavSuccessDialog, {
					width: '500px',
					
				});
			});
		});
		console.log("favourite added");
	}

	removeFromFavourite() {
		//have to check if user is logged in or not before executing
		this.storageService.localStorage.getItem("token").subscribe((token: string) => {
			if (token == null)
				return;
			this.apiService.removeFavourite(this.course, token).subscribe(() => {
				//success
				this.isFavourite = false;
			});
		});
	}


	actionChooser(course_id: number) {
		
		//check if user is logged in
		this.storageService.localStorage.getItem("user").subscribe((user: User) => {
			if (user != null)	//user logged in
			{
				//check if user own this course
				this.storageService.localStorage.getItem("token").subscribe((token: string) => {
					var testtoken = token == null ? "" : token;
					this.apiService.getMyCourse(testtoken).subscribe((response: HttpResponse<any>) => {
						
						console.log("courseid: " + this.course.id);
						console.log("coursename: " + this.course.name);

						var r: any = response;
						var ownedCourses: UserCourse[] = r.data;
						
						//check by id
						console.log("my course length: " + ownedCourses.length);
						ownedCourses = ownedCourses.filter((userCourse: UserCourse) => {
							return userCourse.course.id == course_id;
						});
						console.log("my course after filter length: " + ownedCourses.length);
						
						ownedCourses.forEach((item) => {
							console.log(item.course.id);
						});
						if (ownedCourses.length > 0)	//course owned
						{
							//go to study
							this.action = "study";
							console.log("study login");
						}
						else	//course not owned
						{
							//check if item is in cart already
							this.storageService.localStorage.getItem("cart").subscribe((listCourse: Course[]) => {
								if (listCourse != null)	//cart exist
								{
									var temp = listCourse.filter((item) => {
										return item.id == course_id;
									});
									console.log("temp length: " + temp.length);
									if (temp.length > 0)	//course exist in cart
									{
										this.action = "none";
										console.log("none login");
									}
									else //course doesn't exist in cart
									{
										this.action = "cart";
										console.log("cart exist login");
									}
								}
								else	//cart doesn't exists
								{
									this.action = "cart"
									console.log("cart not exist login");
								}
							});
						}
					}, (error: HttpErrorResponse) => {
						alert("An error has occured while loading data, please try again later :(");
					})
				});

			}
			else	//user is not logged in
			{
				//get user cart
				this.storageService.localStorage.getItem("cart").subscribe((listCourse: Course[]) => {
					if (listCourse != null)	//cart exist
					{
						var temp = listCourse.filter((item) => {
							return item.id == course_id;
						});
						if (temp.length > 0)	//course exist in cart
						{
							this.action = "none";
							console.log("none nologin");
						}
						else //course doesn't exist in cart
						{
							this.action = "cart";
							console.log("cart nologin");
						}
					}
					else	//cart doesn't exist
					{
						this.action = "cart";
						console.log("cart nologin");
					}
				});
			}
		});
	}
}

@Component({
	selector: 'addedtocartdialog',
	styles:[`
	.body{
		background-color: red;
	}
	`],
	templateUrl: 'addedtocartdialog.html'
})
export class AddedToCartDialog {

	constructor(public dialogRef: MatDialogRef<AddedToCartDialog>
		, @Inject(MAT_DIALOG_DATA) public data: any) { }
}


@Component({
	selector: 'contactsuccessdialog',
	templateUrl: 'contactsuccessdialog.html'
  })
  export class FavSuccessDialog {
  
	constructor(public dialogRef: MatDialogRef<FavSuccessDialog>
	  , @Inject(MAT_DIALOG_DATA) public data: any) {}
  }
