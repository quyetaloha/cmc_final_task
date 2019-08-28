package org.cmc.nlms.dao;

import java.util.List;

import org.cmc.nlms.model.Course;
import org.cmc.nlms.model.Progress;
import org.cmc.nlms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgressDao extends JpaRepository<Progress, Integer>{
	List<Progress> findByCourse(Course course);
	List<Progress> findByUser(User user);
}
