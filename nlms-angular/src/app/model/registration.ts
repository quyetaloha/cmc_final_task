import { User } from './user';
import { Course } from './course';
import { Setting } from './setting';

export class Registration {
	public id: number;
	public user: User;
	public course: Course;
	public setting: Setting;
	public status: string;
	public date: Date;
}
