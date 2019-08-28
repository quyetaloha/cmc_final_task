import { Permission } from './permission';

export class Role {
	public id: number;
	public name: string;
	public listPermission: Permission[];
	public description: string;
}
