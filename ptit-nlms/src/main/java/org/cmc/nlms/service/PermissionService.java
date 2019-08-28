package org.cmc.nlms.service;

import java.util.ArrayList;

import org.cmc.nlms.model.Permission;
import org.springframework.stereotype.Service;

@Service
public interface PermissionService {
	public ArrayList<Permission> getAllPermission();
	public Permission getPermissionById(int id);
	public void updateOrInsertPermission(Permission permission);
	public void deleteById(int id);
}
