import { User } from './user';
import { Lessons } from './lessons';
export class Course {
	constructor(public id: number,
		public name: string,
		public briefInfo: string,
		public originPrice: number,
		public salePrice: number,
		public requirement: string,
		public description: string,
		public courselength: number,
		public numberOfLecture: number,
		public createdBy: User,
		public trainer: User,
		public imgUrl: string,
		public listLesson: Lessons[],
	)
	{};
	}    

