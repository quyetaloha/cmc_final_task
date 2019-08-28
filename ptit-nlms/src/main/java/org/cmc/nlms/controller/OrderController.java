package org.cmc.nlms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.config.JwtTokenUtil;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.Order;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.OrderService;
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
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private JwtTokenUtil tokenUtil;
	
	@GetMapping(value = "/order")
	public ResponseEntity<ResponseMessage> getorderById(@RequestParam int id)
	{
		ResponseMessage response = new ResponseMessage();
		Order order = orderService.getOrderById(id);
		response.setData(order);
		if(order == null)
		{
			ErrorObject error = new ErrorObject(0, "order not found");
			response.setError(error);
			response.setMessage("error");
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, order == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@GetMapping(value = "/orderByUser")
	public ResponseEntity<ResponseMessage> getOrderByUser(HttpServletRequest request)
	{
		final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
		
		ResponseMessage response = new ResponseMessage();
		List<Order> order = orderService.getOrderByUserId(id);
		response.setData(order);
		if(order == null)
		{
			ErrorObject error = new ErrorObject(0, "order not found");
			response.setError(error);
			response.setMessage("error");
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, order == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value = "/order", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> InsertUser(@RequestBody Order order, HttpServletRequest request)
	{
		final String requestTokenHeader = request.getHeader("Authorization");
		String jwtToken = null;
		// JWT Token is in the form "Bearer token". Remove Bearer word and get
		// only the Token
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Token "))
			jwtToken = requestTokenHeader.substring(6);
		int id = tokenUtil.getIdFromToken(jwtToken);
		
		ResponseMessage response = new ResponseMessage();
		order = orderService.addOrder(id, order);;
		response.setData(order);
		if(order != null)
		{
			response.setMessage("success");
			response.setError(null);
		}
		else
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "user not found"));
		}
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/orders", method = RequestMethod.PUT)
	public ResponseEntity<ResponseMessage> updateUser(@RequestBody Order order, HttpServletRequest request)
	{
		
		ResponseMessage response = new ResponseMessage();
		orderService.updateOrInsertOrder(order);;
		response.setMessage("saved");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/orders", method = RequestMethod.DELETE)
	public ResponseEntity<ResponseMessage> deleteUser(@RequestParam int id)
	{
		orderService.deleteById(id);
		ResponseMessage response = new ResponseMessage();
		response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/orders", method = RequestMethod.GET)
	public ResponseEntity<ResponseMessage> getAll()
	{
		ResponseMessage response = new ResponseMessage();
		response.setData(orderService.getAllOrder());
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

}
