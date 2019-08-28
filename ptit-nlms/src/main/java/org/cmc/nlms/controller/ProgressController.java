package org.cmc.nlms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.config.JwtTokenUtil;
import org.cmc.nlms.model.Course;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.Progress;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.ProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProgressController {
	
	@Autowired
	private JwtTokenUtil tokenUtil;
	
	@Autowired
	private ProgressService progressService;
	
	@RequestMapping(value = "/progress", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> createProgress(@RequestBody Course course, HttpServletRequest request)
	{
		final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
		Progress progress = progressService.createProgress(id, course);
		ResponseMessage response = new ResponseMessage();
		response.setData(progress);
		if(progress == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "User not found"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, progress == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value = "/progress")
	public ResponseEntity<ResponseMessage> getProgress(@RequestBody Course course, HttpServletRequest request)
	{
		final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
		Progress progress = progressService.getProgress(id, course);
		ResponseMessage response = new ResponseMessage();
		response.setData(progress);
		if(progress == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "User not found"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, progress == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value = "/progresses")
	public ResponseEntity<ResponseMessage> getAllProgress(HttpServletRequest request)
	{
		final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
		List<Progress> progress = progressService.getAllProgress(id);
		ResponseMessage response = new ResponseMessage();
		response.setData(progress);
		if(progress == null || progress.size() == 0)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "User not found"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, progress == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value = "/progress", method = RequestMethod.PUT)
	public ResponseEntity<ResponseMessage> updateProgress(@RequestBody Progress progress, HttpServletRequest request)
	{
		final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
		progress = progressService.updateProgress(id, progress);
		ResponseMessage response = new ResponseMessage();
		response.setData(progress);
		if(progress == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "User not found"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, progress == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
}
