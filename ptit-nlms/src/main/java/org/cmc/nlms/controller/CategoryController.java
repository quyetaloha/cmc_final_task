package org.cmc.nlms.controller;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.model.Category;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.CategoryService;
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
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	@GetMapping(value = "/category")
	public ResponseEntity<ResponseMessage> getCategoryById(@RequestParam int id)
	{
		ResponseMessage response = new ResponseMessage();
		Category category = categoryService.getCategoryById(id);
		response.setData(category);
		if(category == null)
		{
			ErrorObject error = new ErrorObject(0, "Category not found");
			response.setError(error);
			response.setMessage("error");
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, category == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value = "/category", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> InsertUser(@RequestBody Category category, HttpServletRequest request)
	{
		
		ResponseMessage response = new ResponseMessage();
		categoryService.updateOrInsertCategory(category);;
		response.setMessage("saved");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
		
		
	}
	
	@RequestMapping(value = "/categorys", method = RequestMethod.PUT)
	public ResponseEntity<ResponseMessage> updateUser(@RequestBody Category category, HttpServletRequest request)
	{
		
		ResponseMessage response = new ResponseMessage();
		categoryService.updateOrInsertCategory(category);;
		response.setMessage("saved");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
		
		
	}
	
	@RequestMapping(value = "/categorys", method = RequestMethod.DELETE)
	public ResponseEntity<ResponseMessage> deleteUser(@RequestParam int id)
	{
		categoryService.deleteById(id);
		ResponseMessage response = new ResponseMessage();
		response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "/categorys", method = RequestMethod.GET)
	public ResponseEntity<ResponseMessage> getAll()
	{
		ResponseMessage response = new ResponseMessage();
		response.setData(categoryService.getAllCategory());
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
}
