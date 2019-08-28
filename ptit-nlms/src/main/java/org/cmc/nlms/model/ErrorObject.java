package org.cmc.nlms.model;

import java.io.Serializable;

public class ErrorObject implements Serializable{
	private String message;
	private int code;
	
	public ErrorObject(int code, String message)
	{
		this.code = code;
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}
}
