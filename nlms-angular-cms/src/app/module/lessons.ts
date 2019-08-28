export class Lessons {
    public id: number;
	public name: string;
	public parentLesson: Lessons;
	public listLesson: Lessons[];
	public listDocument: Document[];
	public duration;

}
