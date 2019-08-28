import { User } from './user';
import { Course } from './course';
import { Lesson } from './lesson';

export class Progress {
	public id: number;
	public user: User;
	public course: Course;
	public finishedLecture: number;

	public lessonCount: number = 100;

	constructor(progress?: Progress){
		this.id = progress.id;
		this.user = progress.user;
		this.course = progress.course;
		this.finishedLecture = progress.finishedLecture;
		this.lessonCount = progress.lessonCount;
	}

	public getLessonCount = function() {
		this.lessonCount = this.getTotalLecture(this.course);
	}

	getTotalLecture(lesson: any): number {
		var result = 0;
		lesson.listLesson.forEach((item) => {
			result += this.getTotalLecture(item);
		})
		return result;
	}
}
