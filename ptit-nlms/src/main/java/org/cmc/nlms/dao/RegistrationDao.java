package org.cmc.nlms.dao;

import java.util.List;

import org.cmc.nlms.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationDao extends JpaRepository<Registration, Integer> {

	@Query("SELECT c FROM Registration c WHERE c.user.id = ?1")
	List<Registration> getRegistrationByUser( int userId);

	@Query("SELECT c FROM Registration c WHERE c.status = ?1")
	List<Registration> getRegistrationByStatus( String status);

	@Query("SELECT c FROM Registration c WHERE c.course.id = ?1")
	List<Registration> getRegistrationByCourse(int courseId);
}
