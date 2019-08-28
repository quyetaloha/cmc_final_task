package org.cmc.nlms.dao;

import org.cmc.nlms.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CourseRepository extends JpaRepository<Course,Integer>{
    
}
