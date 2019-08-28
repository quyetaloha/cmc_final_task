/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.cmc.nlms.service;


import java.util.List;
import java.util.NoSuchElementException;
import org.cmc.nlms.dao.UserCourseRepository;
import org.cmc.nlms.dao.UserDao;
import org.cmc.nlms.model.Course;
import org.cmc.nlms.model.User;
import org.cmc.nlms.model.UserCourse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author MyPC
 */
@Service
public class UserCourseService {
    @Autowired
	private UserCourseRepository userCourse;
	
	@Autowired
	private UserDao userDao;
        public UserCourse addUserCourse(int id, Course course,UserCourse ut)
        {
            User user = null;
		try {
			user = userDao.findById(id).get();
			UserCourse uc = new UserCourse();
			uc.setUser(user);
                        uc.setCourse(course);
                        uc.setStartDate(ut.getStartDate());
                        uc.setEndDate(ut.getEndDate());
			uc = userCourse.save(uc);
			return uc;
		}
		catch(NoSuchElementException e)
		{
			System.out.println("User not found");
			return null;
		}
        }
        public boolean CourseExists(int id_course) {
		//String hql = "SELECT FROM User WHERE users_name = ? and users_lop = ?";
		int count = userCourse.findUserCourseByCourse_IdQuery(id_course).size();
                System.out.println(count);
		if (count >0)
                {
                    return false;
                }
                else
                    return true;
	}
        public List<UserCourse> getUserCourseById(int id)
	{
		try
		{
			List<UserCourse> obj  = userCourse.findUserCourseByUser_IdQuery(id);
			return obj;
		}
		catch(java.util.NoSuchElementException e)
		{
			return null;
		}
	}
        public List<UserCourse> getUserCourse ()
        {
            List<UserCourse> obj = userCourse.findAll();
            return obj;
        }
        
	public void deleteUserCourse(int id) {
		userCourse.deleteById(id);
	} 
}
