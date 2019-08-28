package org.cmc.nlms.dao;

import org.cmc.nlms.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentDao extends JpaRepository<Document, Integer>{

}
