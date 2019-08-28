package org.cmc.nlms.controller;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.model.Group;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GroupController {
	
	@Autowired
	private GroupService groupService;
	
	@GetMapping(value = "/group")
	public ResponseEntity<ResponseMessage> getgroupById(@RequestParam int id)
	{
		ResponseMessage response = new ResponseMessage();
		Group group = groupService.getGroupById(id);
		response.setData(group);
		if(group == null)
		{
			ErrorObject error = new ErrorObject(0, "Group not found");
			response.setError(error);
			response.setMessage("error");
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, group == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	@RequestMapping(value = "/group", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> InsertUser(@RequestBody Group group, HttpServletRequest request)
	{
		
		ResponseMessage response = new ResponseMessage();
		groupService.updateOrInsertGroup(group);;
		response.setMessage("saved");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
		
		
	}
	
	@RequestMapping(value = "/groups", method = RequestMethod.PUT)
	public ResponseEntity<ResponseMessage> updateUser(@RequestBody Group group, HttpServletRequest request)
	{
		
		ResponseMessage response = new ResponseMessage();
		groupService.updateOrInsertGroup(group);;
		response.setMessage("saved");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
		
		
	}
	
	@RequestMapping(value = "/groups", method = RequestMethod.DELETE)
	public ResponseEntity<ResponseMessage> deleteUser(@RequestParam int id)
	{
		groupService.deleteById(id);
		ResponseMessage response = new ResponseMessage();
		response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "/groups", method = RequestMethod.GET)
	public ResponseEntity<ResponseMessage> getAll()
	{
		ResponseMessage response = new ResponseMessage();
		response.setData(groupService.getAllGroup());
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
}
