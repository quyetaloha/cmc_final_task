package org.cmc.nlms.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

import javax.validation.Valid;
import org.cmc.nlms.config.JwtTokenUtil;

import org.cmc.nlms.model.Contact;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.ContactService;
import org.cmc.nlms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactController {
	@Autowired
	private ContactService contactService;
        @Autowired
	private JwtTokenUtil tokenUtil;
        @Autowired
	private UserService userService;
	

	@PostMapping(value = "add-contact")
	public ResponseEntity<ResponseMessage> addContact(@Valid @RequestBody Contact contact) {
		ResponseMessage responseMessage = new ResponseMessage();
		responseMessage.setData(contact);
		responseMessage.setMessage("Add Contact");
		contactService.addContact(contact);
		return new ResponseEntity<ResponseMessage>(responseMessage, HttpStatus.OK);
	}
	
	@PutMapping(value = "contacts/{id}")
	public ResponseEntity<ResponseMessage> updateContact(@PathVariable(name = "id") Integer contactId,
			@Valid @RequestBody Contact contactUD, HttpServletRequest request) {
		Contact contact = contactService.getContactById(contactId);
		ResponseMessage response = new ResponseMessage();
                final String requestTokenHeader = request.getHeader("Authorization");
            String jwtToken = null;
            if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
                    jwtToken = requestTokenHeader.substring(6);
            int id_crt = tokenUtil.getIdFromToken(jwtToken);
            contactUD.setUser(userService.getUserById(id_crt));

		if (contact == null) {
			ErrorObject error = new ErrorObject(0, "Contact not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			contact.setStatus(contactUD.getStatus());
			contact.setUser(userService.getUserById(id_crt));
                        System.out.println(contact.getUser().getId());
                        contactService.editContact(contactId,contact,contact.getUser().getId());
			response.setData(contact);
			response.setMessage("Update Contact");
		}
		return new ResponseEntity<ResponseMessage>(response,
				contact == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@DeleteMapping(value = "contacts/{id}")
	public ResponseEntity<ResponseMessage> deleteContact(@PathVariable(name = "id") Integer contactId) {
		ResponseMessage response = new ResponseMessage();
		contactService.deleteContact(contactId);
		response.setData("Delete");
		response.setMessage("Delete contact");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	@GetMapping(value = "contacts")
	public ResponseEntity<ResponseMessage> showListContact() {
		ResponseMessage responseMessage = new ResponseMessage();
		List<Contact> list = contactService.findAll();
		if (list == null) {
			ErrorObject errorObject = new ErrorObject(1, "List Contact null");
			responseMessage.setError(errorObject);
			responseMessage.setMessage("Error");
		} else {
			responseMessage.setData(list);
			responseMessage.setMessage("Show List Contact");
		}
		return new ResponseEntity<ResponseMessage>(responseMessage,
				list == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@GetMapping(value = "contacts/{status}")
	public ResponseEntity<ResponseMessage> showListContactByStatus(@PathVariable(name = "status") String status) {
		ResponseMessage responseMessage = new ResponseMessage();
		List<Contact> list = contactService.findContactByStatus(status);
		if (list == null) {
			ErrorObject errorObject = new ErrorObject(1, "List Contact By Status null");
			responseMessage.setError(errorObject);
			responseMessage.setMessage("Error");
		} else {
			responseMessage.setData(list);
			responseMessage.setMessage("Show List Contact By Status");
		}
		return new ResponseEntity<ResponseMessage>(responseMessage,
				list == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

}
