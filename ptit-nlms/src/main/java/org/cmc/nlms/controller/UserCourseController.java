/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.cmc.nlms.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.cmc.nlms.config.JwtTokenUtil;
import org.cmc.nlms.model.Course;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.model.UserCourse;
import org.cmc.nlms.service.CourseService;
import org.cmc.nlms.service.UserCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author MyPC
 */
@RestController
public class UserCourseController {
    
	@Autowired
            private JwtTokenUtil tokenUtil;
        @Autowired
            private UserCourseService userCourse;
        @Autowired
            private CourseService courseS;
    @RequestMapping(value = "/userCourse/course", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> addToUserCourse(@RequestParam int id_course,@RequestBody UserCourse userC, HttpServletRequest request)
	{     
              ResponseMessage response = new ResponseMessage();
              response.setData(true);
              response.setMessage("Bạn đã thêm khóa học này r");
              response.setError(null);
              boolean flag = userCourse.CourseExists(id_course);
                if (flag == false) {
        	    return new ResponseEntity<ResponseMessage>(response,HttpStatus.CONFLICT);
                }
                else
                    {
		final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
                Course course =courseS.getSliderById(id_course);
                System.out.println(course.getName());
		UserCourse uc = userCourse.addUserCourse(id, course,userC);
		
		response.setData(uc);
		if(uc == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "User not found"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, uc == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
                    }
                }
    @RequestMapping(value ="/userCourses",method= RequestMethod.GET)
    public ResponseEntity<ResponseMessage> findAll(HttpServletRequest request)
    {
        ResponseMessage response = new ResponseMessage();
         List<UserCourse> list = userCourse.getUserCourse();
                response.setData(list);
                response.setMessage("success");
                response.setError(null);
                return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
    }
    @RequestMapping(value = "/userCourse", method = RequestMethod.GET)
        public ResponseEntity<ResponseMessage> find(HttpServletRequest request)
        {   
            ResponseMessage response = new ResponseMessage();
            final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
                List<UserCourse> list = userCourse.getUserCourseById(id);
                response.setData(list);
                response.setMessage("success");
                response.setError(null);
                return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
        }
     @RequestMapping(value="/userCourse", method = RequestMethod.DELETE)
        public ResponseEntity<ResponseMessage> deleteUserCourse (@RequestParam int id)
        {
            ResponseMessage response = new ResponseMessage();
                userCourse.deleteUserCourse(id);
                response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
        }       
                
	
}
