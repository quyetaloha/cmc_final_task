package org.cmc.nlms.dao;

import java.util.List;

import org.cmc.nlms.model.AuthUser;
import org.cmc.nlms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Integer>{
	
	List<User> findByUsername(String username);
	
	User findByEmail(String email);
}
