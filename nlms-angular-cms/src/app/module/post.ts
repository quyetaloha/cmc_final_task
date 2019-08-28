export class Post {
	constructor(
		public id: number,
		public created_by: string,
		public created_date: string,
		public last_modified_by :string,
		public last_modified_date : string,
		public title :string,
		public briefInfo:string,
		public content:string,
		public imgUrl:string,
		public status:string
		)
	{};
}
