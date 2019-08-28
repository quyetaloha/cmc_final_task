/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.cmc.nlms.controller;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.model.Slider;
import org.cmc.nlms.model.User;
import org.cmc.nlms.service.SliderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author MyPC
 */
@RestController
public class SliderController {
    @Autowired
	private SliderService sliderService;
    
    @PreAuthorize("hasAnyRole('Admin')")
    @RequestMapping(value = "/slider")
    	public ResponseEntity<ResponseMessage> getUserById(@RequestParam int id)
	{
		ResponseMessage response = new ResponseMessage();
		Slider u = sliderService.getSliderById(id);
		response.setData(u);
		if(u == null)
		{
			ErrorObject error = new ErrorObject(0, "Slider not found");
			response.setError(error);
			response.setMessage("error");
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, u == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
   @RequestMapping(value="/slider",method =RequestMethod.POST)
        public ResponseEntity<ResponseMessage> addSlider(@RequestBody Slider slider , HttpServletRequest request)
        {
              ResponseMessage response = new ResponseMessage();
              sliderService.addSlider(slider);
              response.setData(slider);
              response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
              
        }
   @RequestMapping(value = "/sliders", method = RequestMethod.PUT)
	public ResponseEntity<ResponseMessage> updateSlider(@RequestBody Slider slider, HttpServletRequest request)
	{
		ResponseMessage response = new ResponseMessage();
		slider = sliderService.updateSlider(slider.getId(), slider);
		response.setData(slider);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	} 
    @RequestMapping(value="/sliders" , method =RequestMethod.GET)
        public ResponseEntity<ResponseMessage> getAll()
	{
		ResponseMessage response = new ResponseMessage();
		List<Slider> list = sliderService.getAll();
		response.setData(list);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	} 
    @RequestMapping(value="/sliders", method = RequestMethod.DELETE)
        public ResponseEntity<ResponseMessage> deleteSlider (@RequestParam int id)
        {
            ResponseMessage response = new ResponseMessage();
            sliderService.deleteSlider(id);
                response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
        }
}
