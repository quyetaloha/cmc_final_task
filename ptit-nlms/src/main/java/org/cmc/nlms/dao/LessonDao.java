package org.cmc.nlms.dao;

import java.util.List;

import org.cmc.nlms.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface LessonDao extends JpaRepository<Lesson, Integer>{
	
	@Query("SELECT c FROM Lesson c WHERE c.name = ?1")
	List<Lesson> getLessonByName(String name);
}
