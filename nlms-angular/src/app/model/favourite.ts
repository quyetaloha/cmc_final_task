import { Course } from './course';
import { User } from './user';

export class Favourite {
	public id: number;
	public user: User;
	public course: Course;
}
