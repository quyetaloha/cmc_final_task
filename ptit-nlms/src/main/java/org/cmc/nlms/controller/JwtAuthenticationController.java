package org.cmc.nlms.controller;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.config.JwtTokenUtil;
import org.cmc.nlms.model.AuthUser;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.JwtRequest;
import org.cmc.nlms.model.JwtResponse;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.model.User;
import org.cmc.nlms.service.JwtUserDetailsService;
import org.cmc.nlms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailsService;
	
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final AuthUser userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());
		
		User user = userService.getUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		ResponseMessage response = new ResponseMessage();
		response.setData(new Object[]{user, token});
		
		if(user == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "user not found"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		
		return new ResponseEntity<ResponseMessage>(response, user == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> saveUser(@RequestBody User user, HttpServletRequest request) throws Exception {
		user = userDetailsService.save(user, request);
		ResponseMessage response = new ResponseMessage();
		response.setData(user);
		if(user == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "duplicate entry"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, user == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	private void authenticate(String username, String password) throws Exception {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
	}
}