package org.cmc.nlms.service.impl;

import java.util.ArrayList;

import org.cmc.nlms.dao.CategoryDao;
import org.cmc.nlms.model.Category;
import org.cmc.nlms.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	private CategoryDao categoryDao;
	
	@Override
	public ArrayList<Category> getAllCategory() {
		// TODO Auto-generated method stub
		return (ArrayList<Category>) categoryDao.findMainCategory();
	}

	@Override
	public Category getCategoryById(int id) {
		// TODO Auto-generated method stub
		return categoryDao.findById(id).get();
	}

	@Override
	public void updateOrInsertCategory(Category category) {
		categoryDao.save(category);
		
	}

	@Override
	public void deleteById(int id) {
		categoryDao.deleteById(id);
		
	}

}
