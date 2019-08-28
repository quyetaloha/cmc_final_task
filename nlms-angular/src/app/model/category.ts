export class Category {
	public id: number;
	public name: string;
	public subCategories: Category[];
	public parentCategory: Category;
	public icon: string;
}
