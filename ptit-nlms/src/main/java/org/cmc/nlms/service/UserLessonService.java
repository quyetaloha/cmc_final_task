package org.cmc.nlms.service;

import java.util.List;

import org.cmc.nlms.dao.UserLessonDao;
import org.cmc.nlms.model.UserLesson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserLessonService {
	@Autowired
	private UserLessonDao uld;

	public void addUserLesson(UserLesson ul) {
		uld.save(ul);
	}

	public void editUserLesson(UserLesson ul) {
		uld.save(ul);
	}

	public UserLesson getUserLessonBy(int userID, int lessonID) {
		return uld.getUserLessonBy(userID, lessonID);
	}

	public List<UserLesson> getByStatus(boolean status, int userID) {
		return uld.getByStatus(status, userID);
	}
	
	// Lesson

}
