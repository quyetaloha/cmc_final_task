/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.cmc.nlms.service;

import java.util.List;
import org.cmc.nlms.dao.CourseRepository;
import org.cmc.nlms.model.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author MyPC
 */
@Service
public class CourseService {
    @Autowired
	private CourseRepository course;
    @Autowired
        private UserService userService;
	public List<Course> getAll()
        {
            List<Course> obj = course.findAll();
                return obj;
        }
	public Course getSliderById(int id)
	{
		try
		{
			Course sl = course.findById(id).get();
			return sl;
		}
		catch(java.util.NoSuchElementException e)
		{
			return null;
		}
	}
        public Course addCourse(Course cou)
        {
            return cou = course.save(cou);
        }
        public Course updateCourse(int id, Course sl,int id_crt,int id_trainer) {
                Course c = course.getOne(id);
		//sl.setId(id);
		c.setImgUrl(c.getImgUrl());
                c.setName(c.getName());
                c.setNumberOfLecture(c.getNumberOfLecture());
                c.setBriefInfo(c.getBriefInfo());
                c.setCreatedBy(userService.getUserById(id_crt));
                c.setTrainer(userService.getUserById(id_trainer));
                c.setOriginPrice(c.getOriginPrice());
                c.setSalePrice(c.getSalePrice());
                c.setRequirement(c.getRequirement());
                c.setDescription(c.getDescription());
		sl=course.save(c);
                return sl;
	
	}

	public void deleteCourse(int id) {
		course.deleteById(id);
	}
}
