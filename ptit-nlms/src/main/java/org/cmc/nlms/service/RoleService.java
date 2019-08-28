package org.cmc.nlms.service;

import java.util.List;

import org.cmc.nlms.dao.RoleDao;
import org.cmc.nlms.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
	@Autowired
	private RoleDao roleDao;

	public void addRole(Role role) {
		roleDao.save(role);
	}

	public void editRole(Role role) {
		roleDao.saveAndFlush(role);
	}

	public void delRole(int roleID) {
		roleDao.deleteById(roleID);
	}

	public Role getRoleById(int roleID) {
		return roleDao.getOne(roleID);
	}

	public List<Role> getAll() {
		return roleDao.findAll();
	}

	public List<Role> getByName(String name) {
		return roleDao.findRoleByName(name);
	}
}
