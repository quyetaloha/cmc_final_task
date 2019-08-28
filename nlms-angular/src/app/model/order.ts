import { User } from './user';
import { Course } from './course';

export class Order {
	public id: number;
	public user: User;
	public listCourse: Course[];
	public date: Date;
	public status: string;
}
