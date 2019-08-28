import { Course } from './course';
import { User } from './user';

export class Post {
	public id: number;
	public title: string;
	public briefInfo: string;
	public content: string;
	public imgUrl: string;
	public course: Course;
	public createdBy: User;
	public createdDate: Date;
	public status: string;
	public createdByUser: string;
	public clickCount: number;

	constructor(){
		this.id = 0;
		this.title = "";
		this.briefInfo = "";
		this.content = "";
		this.imgUrl = "";
		this.course = new Course();
		this.createdBy = new User(0, "", "", "", "", "", "");
		this.createdDate = new Date();
		this.status = "";
		this.clickCount = 0;
	}
}
