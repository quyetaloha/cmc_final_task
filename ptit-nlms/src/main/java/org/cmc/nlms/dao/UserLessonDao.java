package org.cmc.nlms.dao;

import java.util.List;

import org.cmc.nlms.model.UserLesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLessonDao extends JpaRepository<UserLesson, Integer> {

	@Query("SELECT c FROM UserLesson c WHERE c.user.id = :userID AND c.lesson.id = :lessonID")
	public UserLesson getUserLessonBy(@Param(value = "userID") int userID, @Param(value = "lessonID") int lessonID);

	@Query("SELECT c FROM UserLesson c WHERE c.status = :status AND c.user.id =:userID")
	public List<UserLesson> getByStatus(@Param(value = "status") boolean status, @Param(value = "userID") int userID);
}
