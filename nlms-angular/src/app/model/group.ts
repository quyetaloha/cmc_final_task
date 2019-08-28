import { User } from './user';

export class Group {
	public id: number;
	public name: string;
	public listUser: User[];
	public type: string;

	date = new Date();
}
