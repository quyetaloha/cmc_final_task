package org.cmc.nlms.dao;

import java.util.ArrayList;

import org.cmc.nlms.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDao extends JpaRepository<Category, Integer>{
	@Query("SELECT c FROM Category c WHERE c.parentCategory IS NULL")
	ArrayList<Category> findMainCategory();
}
