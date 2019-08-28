package org.cmc.nlms.service;

import java.util.ArrayList;

import org.cmc.nlms.model.Group;
import org.springframework.stereotype.Service;

@Service
public interface GroupService {
	public ArrayList<Group> getAllGroup();
	public Group getGroupById(int id);
	public void updateOrInsertGroup(Group group);
	public void deleteById(int id);
}
