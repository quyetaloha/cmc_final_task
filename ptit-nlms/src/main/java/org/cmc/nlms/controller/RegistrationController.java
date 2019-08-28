package org.cmc.nlms.controller;

import java.util.List;

import javax.validation.Valid;

import org.cmc.nlms.dao.RegistrationDao;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.Registration;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.RegistrationService;
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
public class RegistrationController {

	@Autowired
	private RegistrationService registrationService;

	@PostMapping(value = "registration/add")
	public ResponseEntity<ResponseMessage> addRegistration(@Valid @RequestBody Registration registration) {
		ResponseMessage response = new ResponseMessage();
		registrationService.addReg(registration);
		response.setData(registration);
		response.setMessage("Add Registration");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@PutMapping(value = "registrations/{id}")
	public ResponseEntity<ResponseMessage> updateRegistration(@Valid @RequestBody Registration registrationUD,
			@PathVariable(name = "id") Integer id) {
		ResponseMessage response = new ResponseMessage();
		Registration registration = registrationService.getRegistrationById(id);
		if (registration == null) {
			ErrorObject error = new ErrorObject(0, "Registration not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			registration.setSetting(registrationUD.getSetting());
			registration.setStatus(registrationUD.getStatus());
			registration.setCourse(registrationUD.getCourse());
			registration.setDate(registrationUD.getDate());
			registration.setUser(registrationUD.getUser());
			registrationService.editReg(registration);
			response.setData(registration);
			response.setMessage("Update");
		}
		return new ResponseEntity<ResponseMessage>(response,
				registration == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@DeleteMapping(value = "registrations/{id}")
	public ResponseEntity<ResponseMessage> deleteRegistration(@PathVariable(name = "id") Integer id) {
		ResponseMessage response = new ResponseMessage();
		registrationService.delReg(id);
		response.setData("Delete");
		response.setMessage("Delete registration by id");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@GetMapping(value = "user/registration/{idUser}")
	public ResponseEntity<ResponseMessage> getRegistrationByUser(@PathVariable(name = "idUser") Integer id) {
		ResponseMessage response = new ResponseMessage();
		List<Registration> list = registrationService.getRegistrationByUser(id);
		if (list.isEmpty()) {
			ErrorObject error = new ErrorObject(0, "Registration not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			response.setData(list);
			response.setMessage("Get Registration By User");
		}
		return new ResponseEntity<ResponseMessage>(response,
				list.isEmpty() ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@GetMapping(value = "course/registration/{idCourse}")
	public ResponseEntity<ResponseMessage> getRegistrationByCourse(@PathVariable(name = "idCourse") Integer id) {
		ResponseMessage response = new ResponseMessage();
		List<Registration> list = registrationService.getRegistrationByUser(id);
		if (list.isEmpty()) {
			ErrorObject error = new ErrorObject(0, "Registration not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			response.setData(list);
			response.setMessage("Get Registration By User");
		}
		return new ResponseEntity<ResponseMessage>(response,
				list.isEmpty() ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
}
