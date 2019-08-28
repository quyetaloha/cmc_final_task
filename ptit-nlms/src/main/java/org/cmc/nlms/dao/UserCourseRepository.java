/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.cmc.nlms.dao;

import java.util.List;
import org.cmc.nlms.model.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author MyPC
 */
@Repository
public interface UserCourseRepository extends JpaRepository<UserCourse,Integer> {
     @Query("SELECT p FROM UserCourse p INNER JOIN p.course pc WHERE pc.id =:id ")
     List<UserCourse> findUserCourseByCourse_IdQuery(@Param("id") Integer id);
     @Query("SELECT p FROM UserCourse p INNER JOIN p.user pu WHERE pu.id=:id")
     List<UserCourse> findUserCourseByUser_IdQuery(@Param("id") Integer id);
}
