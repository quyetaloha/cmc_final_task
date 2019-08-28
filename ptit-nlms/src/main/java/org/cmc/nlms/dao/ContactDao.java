package org.cmc.nlms.dao;

import java.util.List;

import org.cmc.nlms.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface ContactDao extends JpaRepository<Contact, Integer> {
	
	@Query("SELECT c FROM Contact c WHERE c.status = ?1")
	List<Contact> findContactByStatus(String status);
}
