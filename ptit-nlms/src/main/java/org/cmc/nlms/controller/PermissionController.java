package org.cmc.nlms.controller;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.model.Permission;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.PermissionService;
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
public class PermissionController {
	
	@Autowired
	private PermissionService permissionService;
	
	@GetMapping(value = "/permission")
	public ResponseEntity<ResponseMessage> getPermissionById(@RequestParam int id)
	{
		ResponseMessage response = new ResponseMessage();
		Permission Permission = permissionService.getPermissionById(id);
		response.setData(Permission);
		if(Permission == null)
		{
			ErrorObject error = new ErrorObject(0, "Permission not found");
			response.setError(error);
			response.setMessage("error");
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, Permission == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	@RequestMapping(value = "/permission", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> InsertPermission(@RequestBody Permission permission, HttpServletRequest request)
	{
		
		ResponseMessage response = new ResponseMessage();
		permissionService.updateOrInsertPermission(permission);
		response.setMessage("saved");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/permissions", method = RequestMethod.PUT)
	public ResponseEntity<ResponseMessage> updatePermission(@RequestBody Permission permission, HttpServletRequest request)
	{
		
		ResponseMessage response = new ResponseMessage();
		permissionService.updateOrInsertPermission(permission);
		response.setMessage("saved");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/permissions", method = RequestMethod.DELETE)
	public ResponseEntity<ResponseMessage> deletePermission(@RequestParam int id)
	{
		permissionService.deleteById(id);
		ResponseMessage response = new ResponseMessage();
		response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/permissions", method = RequestMethod.GET)
	public ResponseEntity<ResponseMessage> getAll()
	{
		ResponseMessage response = new ResponseMessage();
		response.setData(permissionService.getAllPermission());
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

}
