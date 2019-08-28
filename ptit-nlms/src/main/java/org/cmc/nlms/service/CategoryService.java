package org.cmc.nlms.service;

import java.util.ArrayList;

import org.cmc.nlms.model.Category;
import org.springframework.stereotype.Service;


@Service
public interface CategoryService {
	public ArrayList<Category> getAllCategory();
	public Category getCategoryById(int id);
	public void updateOrInsertCategory(Category category);
	public void deleteById(int id);
}
