package org.cmc.nlms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.cmc.nlms.dao.ProgressDao;
import org.cmc.nlms.dao.UserDao;
import org.cmc.nlms.model.Course;
import org.cmc.nlms.model.Progress;
import org.cmc.nlms.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {
	@Autowired
	private ProgressDao progressDao;
	
	@Autowired
	private UserDao userDao;

	public Progress createProgress(int id, Course course) {
		//check if there are existing progress of this user in this course
		Progress progress = this.getProgress(id, course);
		if(progress != null)	//exist
		{
			return progress;
		}
		User user = null;
		try
		{
			user = userDao.findById(id).get();
		}
		catch(NoSuchElementException e)
		{
			System.out.println("Cannot find user with id " + id + " for progress");
			return null;
		}
		
		progress = new Progress();
		progress.setUser(user);
		progress.setCourse(course);
		progress.setFinishedLecture(0);
		progress = progressDao.save(progress);
		return progress;
	}

	public Progress getProgress(int id, Course course) {
		List<Progress> listProgress = progressDao.findByCourse(course);
		for(Progress progress : listProgress)
		{
			if(progress.getUser().getId() == id)
				return progress;
		}
		return null;
	}

	public Progress updateProgress(int id, Progress progress) {
		List<Progress> listProgress = progressDao.findByCourse(progress.getCourse());
		for(Progress p : listProgress)
		{
			if(p.getUser().getId() == id)
			{
				p.setFinishedLecture(progress.getFinishedLecture());
				progress = progressDao.save(p);
				return progress;
			}
		}
		return null;
	}

	public List<Progress> getAllProgress(int id) {
		List<Progress> listProgress = progressDao.findAll();
		List<Progress> result = new ArrayList<>();
		for(Progress progress : listProgress)
		{
			if(progress.getUser().getId() == id)
				result.add(progress);
		}
		return result;
	}
	
	
}
