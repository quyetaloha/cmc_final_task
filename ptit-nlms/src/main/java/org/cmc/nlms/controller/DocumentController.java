package org.cmc.nlms.controller;

import org.cmc.nlms.model.Document;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DocumentController {
	@Autowired
	private DocumentService documentService;
	
	@RequestMapping(value= "/document", method = RequestMethod.GET)
	public ResponseEntity<ResponseMessage> getDocumentById(@RequestParam int id)
	{
		Document doc = documentService.getDocumentById(id);
		ResponseMessage response = new ResponseMessage();
		response.setData(doc);
		if(doc == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "Document not found"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, doc == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value= "/document", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> addDocument(@RequestBody Document document)
	{
		Document doc = documentService.addDocument(document);
		ResponseMessage response = new ResponseMessage();
		response.setData(doc);
		if(doc == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "Error while adding document"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, doc == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value= "/document", method = RequestMethod.PUT)
	public ResponseEntity<ResponseMessage> updateDocument(@RequestBody Document document)
	{
		Document doc = documentService.updateDocument(document);
		ResponseMessage response = new ResponseMessage();
		response.setData(doc);
		if(doc == null)
		{
			response.setMessage("error");
			response.setError(new ErrorObject(0, "Error while updating document"));
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, doc == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value= "/document", method = RequestMethod.DELETE)
	public ResponseEntity<ResponseMessage> deleteDocument(@RequestBody Document document)
	{
		documentService.deleteDocument(document);
		ResponseMessage response = new ResponseMessage();
		response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value= "/documentId", method = RequestMethod.DELETE)
	public ResponseEntity<ResponseMessage> deleteDocument(@RequestParam int id)
	{
		documentService.deleteDocument(id);
		ResponseMessage response = new ResponseMessage();
		response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
}
