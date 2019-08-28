package org.cmc.nlms.service.impl;

import java.util.ArrayList;

import org.cmc.nlms.dao.GroupDao;
import org.cmc.nlms.model.Group;
import org.cmc.nlms.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class GroupServiceImpl implements GroupService{
	@Autowired
	private GroupDao groupDao;
	@Override
	public ArrayList<Group> getAllGroup() {
		// TODO Auto-generated method stub
		return (ArrayList<Group>) groupDao.findAll();
	}

	@Override
	public Group getGroupById(int id) {
		// TODO Auto-generated method stub
		return groupDao.findById(id).get();
	}

	@Override
	public void updateOrInsertGroup(Group group) {
		groupDao.save(group);
		
	}
	@Override
	public void deleteById(int id) {
		groupDao.deleteById(id);
		
	}

}
