package org.cmc.nlms.service.impl;

import java.util.ArrayList;

import org.cmc.nlms.dao.CategoryDao;
import org.cmc.nlms.dao.PermissionDao;
import org.cmc.nlms.model.Category;
import org.cmc.nlms.model.Permission;
import org.cmc.nlms.service.CategoryService;
import org.cmc.nlms.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PermissionServiceImpl implements PermissionService{

	@Autowired
	private PermissionDao permissionDao;

	@Override
	public ArrayList<Permission> getAllPermission() {
		// TODO Auto-generated method stub
		return (ArrayList<Permission>) permissionDao.findAll();
	}

	@Override
	public Permission getPermissionById(int id) {
		// TODO Auto-generated method stub
		return permissionDao.findById(id).get();
	}

	@Override
	public void updateOrInsertPermission(Permission permission) {
		permissionDao.save(permission);
		
	}
	@Override
	public void deleteById(int id) {
		permissionDao.deleteById(id);
		
	}
	
	
}
