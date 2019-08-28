import { Lesson } from './lesson';
import { Category } from './category';
import { User } from './user';

export class Course {
	public id: number;
	public name: string;
	public briefInfo: string;
	public originPrice: number;
	public salePrice: number;
	public requirement: string;
	public description: string;
	public courselength: number;
	public numberOfLecture: number;
	public listLesson: Lesson[];
	public listCategory: Category[];
	public createdBy: User;
	public trainer: User;
	public imgUrl: string;

	constructor() {
		this.listLesson = [
			new Lesson()
		]
	}
}
