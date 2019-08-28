export class Lesson {
	public id: number;
	public name: string;
	public parentLesson: Lesson;
	public listLesson: Lesson[];
	public listDocument: Document[];
	public duration;

	// constructor(){
	// 	this.listLesson = [];
	// }
}
