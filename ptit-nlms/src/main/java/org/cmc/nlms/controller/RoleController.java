package org.cmc.nlms.controller;

import java.util.List;

import javax.validation.Valid;

import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.model.Role;
import org.cmc.nlms.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {

	@Autowired
	private RoleService roleService;

	@PostMapping(value = "add-role")
	public ResponseEntity<ResponseMessage> createRole(@Valid @RequestBody Role role) {
		roleService.addRole(role);
		ResponseMessage response = new ResponseMessage();
		response.setData(role);
		response.setMessage("Create Role");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@GetMapping(value = "roles")
	public ResponseEntity<ResponseMessage> showListRole() {
		ResponseMessage response = new ResponseMessage();
		List<Role> list = roleService.getAll();
		if (list.isEmpty()) {
			ErrorObject error = new ErrorObject(0, "List role not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			response.setData(list);
			response.setMessage("Create Role");
		}

		return new ResponseEntity<ResponseMessage>(response,
				list.isEmpty() ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@PutMapping(value = "roles/{id}")
	public ResponseEntity<ResponseMessage> updateRole(@Valid @RequestBody Role roleUD,
			@PathVariable(name = "id") Integer roleID) {
		ResponseMessage response = new ResponseMessage();
		Role role = roleService.getRoleById(roleID);
		if (role == null) {
			ErrorObject error = new ErrorObject(0, "Role not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			role.setName(roleUD.getName());
			role.setListPermission(roleUD.getListPermission());
			roleService.editRole(role);
			response.setData(role);
			response.setMessage("Update role");
		}

		return new ResponseEntity<ResponseMessage>(response,
				role == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@DeleteMapping(value = "roles/{id}")
	public ResponseEntity<ResponseMessage> deleteRole(@PathVariable(name = "id") Integer roleID) {

		ResponseMessage response = new ResponseMessage();
		roleService.delRole(roleID);
		response.setData("Delete");
		response.setMessage("Delete role");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@GetMapping(value = "roles/{name}")
	public ResponseEntity<ResponseMessage> getRoleByName(@PathVariable(name = "name") String name) {
		ResponseMessage response = new ResponseMessage();
		List<Role> list = roleService.getByName(name);
		if (list.isEmpty()) {
			ErrorObject error = new ErrorObject(0, "Role list by name not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			response.setData(list);
			response.setMessage("Get Role By Name");
		}
		return new ResponseEntity<ResponseMessage>(response,
				list.isEmpty() ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
}
