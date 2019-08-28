package org.cmc.nlms.dao;

import java.util.List;

import org.cmc.nlms.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDao extends JpaRepository<Role, Integer> {
	
	@Query("SELECT c FROM Role c WHERE c.name = ?1")
	List<Role> findRoleByName(String name);
}
