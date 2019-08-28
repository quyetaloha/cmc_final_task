package org.cmc.nlms.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
	@RequestMapping(value = "/hello")
	public String test()
	{
		return "test 1 2 3";
	}
}
