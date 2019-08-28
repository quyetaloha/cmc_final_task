/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.cmc.nlms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.model.Setting;
import org.cmc.nlms.service.SettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
public class SettingController {
	@Autowired
	private SettingService settingService;

	@RequestMapping(value = "/Setting")
	public ResponseEntity<ResponseMessage> getSettingById(@RequestParam int id) {
		ResponseMessage response = new ResponseMessage();
		Setting u = settingService.getSettingById(id);
		response.setData(u);
		if (u == null) {
			ErrorObject error = new ErrorObject(0, "Setting not found");
			response.setError(error);
			response.setMessage("error");
		} else {
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response,
				u == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@RequestMapping(value = "/Setting/name")
	public ResponseEntity<ResponseMessage> getSettingById(@RequestParam String groupType) {
		ResponseMessage response = new ResponseMessage();
		List<Setting> list = settingService.getSettingByName(groupType);
		response.setData(list);
		if (list == null) {
			ErrorObject error = new ErrorObject(0, "Setting not found");
			response.setError(error);
			response.setMessage("error");
		} else {
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response,
				list == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@RequestMapping(value = "/Setting", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> addSetting(@RequestBody Setting Setting, HttpServletRequest request) {
		ResponseMessage response = new ResponseMessage();
		settingService.addSetting(Setting);
		response.setData(Setting);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);

	}

	@RequestMapping(value = "/Setting", method = RequestMethod.PUT)
	public ResponseEntity<ResponseMessage> updateSetting(@RequestBody Setting setting, HttpServletRequest request) {
		ResponseMessage response = new ResponseMessage();
		setting = settingService.updateSetting(setting.getId(), setting);
		response.setData(setting);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "/Settings", method = RequestMethod.GET)
	public ResponseEntity<ResponseMessage> getAll() {
		ResponseMessage response = new ResponseMessage();
		List<Setting> list = settingService.getAll();
		response.setData(list);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "/Setting", method = RequestMethod.DELETE)
	public ResponseEntity<ResponseMessage> deleteSetting(@RequestParam int id) {
		ResponseMessage response = new ResponseMessage();
		settingService.deleteSetting(id);
		response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	@GetMapping(value = "/group-type")
	public ResponseEntity<ResponseMessage> getGroupType(){
		ResponseMessage response = new ResponseMessage();
		List<String> listGroupType = settingService.getGroupType();
		Map<String, Object> data = new HashMap<>();
		data.put("groupType", listGroupType);
		response.setData(data);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	
}
