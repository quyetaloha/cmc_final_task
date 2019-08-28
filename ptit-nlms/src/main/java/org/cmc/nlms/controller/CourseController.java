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
import org.cmc.nlms.service.CourseService;
import org.cmc.nlms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseController {
    @Autowired
        private CourseService course;
    @Autowired
	private JwtTokenUtil tokenUtil;
	
	@Autowired
	private UserService userService;
     @RequestMapping(value="/courses" , method =RequestMethod.GET)
        public ResponseEntity<ResponseMessage> getAll()
	{
		ResponseMessage response = new ResponseMessage();
		List<Course> list = course.getAll();
		response.setData(list);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	} 
   @RequestMapping(value = "/course")
    	public ResponseEntity<ResponseMessage> getCourseById(@RequestParam int id)
	{
		ResponseMessage response = new ResponseMessage();
		Course u = course.getSliderById(id);
		response.setData(u);
		if(u == null)
		{
			ErrorObject error = new ErrorObject(0, "Course not found");
			response.setError(error);
			response.setMessage("error");
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, u == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
    @RequestMapping(value="/course/trainer" , method=RequestMethod.POST)
        public ResponseEntity<ResponseMessage> addCourse(@RequestBody Course cr,@RequestParam int id,HttpServletRequest request)
        {
            ResponseMessage response = new ResponseMessage();
            cr.setTrainer(userService.getUserById(id));
            final String requestTokenHeader = request.getHeader("Authorization");
            String jwtToken = null;
            // JWT Token is in the form "Bearer token". Remove Bearer word and get
            // only the Token
            if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
                    jwtToken = requestTokenHeader.substring(6);
            int id_crt = tokenUtil.getIdFromToken(jwtToken);
            cr.setCreatedBy(userService.getUserById(id_crt));
            System.out.println(cr.getBriefInfo());
            cr = course.addCourse(cr);
            response.setData(cr);
            response.setMessage("success");
            response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
        }
    @RequestMapping(value="/course/trainer", method=RequestMethod.PUT)
         public ResponseEntity<ResponseMessage> EditCourse(@RequestBody Course cr,@RequestParam int id,HttpServletRequest request)
        {
            ResponseMessage response = new ResponseMessage();
            final String requestTokenHeader = request.getHeader("Authorization");
            String jwtToken = null;
            // JWT Token is in the form "Bearer token". Remove Bearer word and get
            // only the Token
            if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
                    jwtToken = requestTokenHeader.substring(6);
            int id_crt = tokenUtil.getIdFromToken(jwtToken);
            cr.setCreatedBy(userService.getUserById(id_crt));
            System.out.println(cr.getBriefInfo());
            cr = course.addCourse(cr);
          
            cr=	course.updateCourse(cr.getId(),cr,id_crt,id);
		response.setData(cr);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
        }
    @RequestMapping(value="/course", method = RequestMethod.DELETE)
        public ResponseEntity<ResponseMessage> deleteCourse (@RequestParam int id)
        {
            ResponseMessage response = new ResponseMessage();
                course.deleteCourse(id);
                response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
        }     
}
