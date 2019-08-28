package org.cmc.nlms.model;

import java.io.Serializable;

public class ResponseMessage implements Serializable{
	private Object data;
	private String message;
	private ErrorObject error;
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public ErrorObject getError() {
		return error;
	}
	public void setError(ErrorObject error) {
		this.error = error;
	}
	
	
}
