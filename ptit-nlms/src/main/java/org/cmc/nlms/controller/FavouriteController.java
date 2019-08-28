package org.cmc.nlms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.config.JwtTokenUtil;
import org.cmc.nlms.model.Course;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.Favourite;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.FavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FavouriteController {
	@Autowired
	private FavouriteService favouriteService;
	
	@Autowired
	private JwtTokenUtil tokenUtil;
	
	@RequestMapping(value = "/favourite", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> addToFavourite(@RequestBody Course course, HttpServletRequest request)
	{
		final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
		Favourite favourite = favouriteService.addToFavourite(id, course);
		ResponseMessage response = new ResponseMessage();
		response.setData(favourite);
		if(favourite == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "User not found"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, favourite == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value = "/favourites", method = RequestMethod.GET)
	public ResponseEntity<ResponseMessage> getFavouriteCourses(HttpServletRequest request)
	{
		final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
		List<Course> listCourses = favouriteService.getFavouriteCourses(id);
		ResponseMessage response = new ResponseMessage();
		response.setData(listCourses);
		if(listCourses == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "User not found"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, listCourses == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value = "/favourite", method = RequestMethod.DELETE)
	public ResponseEntity<ResponseMessage> removeFavourite(@RequestBody Course course, HttpServletRequest request)
	{
		final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
		boolean result = favouriteService.removeFavourite(id, course);
		ResponseMessage response = new ResponseMessage();
		response.setData(result);
		if(result == false)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "User not found"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, result == false ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
}
