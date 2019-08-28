import { User } from './user';
import { Course } from './course';

export class UserCourse {
	constructor(
		public id: number,
	public user: User,
	public course: Course,
	public startDate: Date,
	public endDate: Date,
	)
	{
    
	};
}
