package org.cmc.nlms.dao;

import java.util.List;

import org.cmc.nlms.model.Course;
import org.cmc.nlms.model.Favourite;
import org.cmc.nlms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavouriteDao extends JpaRepository<Favourite, Integer>{
	List<Favourite> findByUser(User user);
	List<Favourite> findByCourse(Course course);
}
