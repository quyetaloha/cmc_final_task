package org.cmc.nlms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.cmc.nlms.dao.FavouriteDao;
import org.cmc.nlms.dao.UserDao;
import org.cmc.nlms.model.Course;
import org.cmc.nlms.model.Favourite;
import org.cmc.nlms.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavouriteService {
	@Autowired
	private FavouriteDao favouriteDao;
	
	@Autowired
	private UserDao userDao;

	public Favourite addToFavourite(int id, Course course) {
		//check if this course has already in the favourite list
		Favourite favourite = this.isCourseInFavouriteList(id, course);
		if(favourite != null)	//exists
		{
			return favourite;
		}
		User user = null;
		try {
			user = userDao.findById(id).get();
			favourite = new Favourite();
			favourite.setUser(user);
			favourite.setCourse(course);
			favourite = favouriteDao.save(favourite);
			return favourite;
		}
		catch(NoSuchElementException e)
		{
			System.out.println("User not found");
			return null;
		}
	}
	
	public Favourite isCourseInFavouriteList(int id, Course course)
	{
		List<Favourite> listFavourite = favouriteDao.findByCourse(course);
		for(Favourite f : listFavourite)
		{
			if(f.getUser().getId() == id)
				return f;
		}
		return null;
	}

	public List<Course> getFavouriteCourses(int id) {
		User user = null;
		try {
			user = userDao.findById(id).get();
			List<Favourite> listFavourite = favouriteDao.findByUser(user);
			List<Course> listCourse = new ArrayList<>();
			for(Favourite f : listFavourite)
				listCourse.add(f.getCourse());
			return listCourse;
		}
		catch(NoSuchElementException e)
		{
			System.out.println("User not found");
			return null;
		}
	}

	public boolean removeFavourite(int id, Course course) {
		User user = null;
		try {
			user = userDao.findById(id).get();
			List<Favourite> listFavourite = favouriteDao.findByUser(user);
			for(Favourite f : listFavourite)
				if(f.getCourse().getId() == course.getId())
					favouriteDao.delete(f);
			return true;
		}
		catch(NoSuchElementException e)
		{
			System.out.println("User not found");
			return false;
		}
	}
}
