export class Role {
    constructor(
		public id: number,
		public created_by: string,
		public created_date: string,
		public last_modified_by :string,
		public last_modified_date : string,
		public name :string,
		public description:string
		)
	{};
}
