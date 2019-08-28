import { User } from './user';

export class Group {
    constructor(
    public id: number,
    public created_by: string,
	public created_date: string,
	public last_modified_by :string,
	public last_modified_date : string,
    public name: string,
    public type:string,
    public listUser: User[],
    ){};
}