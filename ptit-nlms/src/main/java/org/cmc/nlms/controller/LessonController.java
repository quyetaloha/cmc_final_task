package org.cmc.nlms.controller;

import java.util.List;

import javax.validation.Valid;

import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.Lesson;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.LessionService;
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
public class LessonController {

	@Autowired
	private LessionService ls;

	@GetMapping(value = { "lessons-user" })
	public ResponseEntity<ResponseMessage> showListLessonUser() {
		List<Lesson> list = ls.getAll();
		ResponseMessage response = new ResponseMessage();
		if (list.isEmpty()) {
			ErrorObject error = new ErrorObject(1, "ListLesson not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			response.setData(list);
			response.setMessage("Show List Lesson");
		}
		return new ResponseEntity<ResponseMessage>(response,
				list == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@GetMapping(value = { "lessons" })
	public ResponseEntity<ResponseMessage> showListLessonAdmin() {
		List<Lesson> list = ls.getAll();
		ResponseMessage response = new ResponseMessage();
		if (list.isEmpty()) {
			ErrorObject error = new ErrorObject(1, "ListLesson not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			response.setData(list);
			response.setMessage("Show List Lesson");
		}

		return new ResponseEntity<ResponseMessage>(response,
				list == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@PostMapping(value = "add-lesson")
	public ResponseEntity<ResponseMessage> addLesson(@Valid @RequestBody Lesson lesson) {
		ls.add(lesson);
		ResponseMessage response = new ResponseMessage();
		response.setData(lesson);
		response.setMessage("Add Lesson");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@GetMapping(value = "find-lesson/{name}")
	public ResponseEntity<ResponseMessage> findLessonByName(@PathVariable(name = "name") String name) {
		List<Lesson> list = ls.getLessonByName(name);
		ResponseMessage response = new ResponseMessage();
		if (list.isEmpty()) {
			ErrorObject error = new ErrorObject(0, "LessonByName not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			response.setData(list);
			response.setMessage("List lesson by name");
		}

		return new ResponseEntity<ResponseMessage>(response,
				list.isEmpty() ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@PutMapping(value = "lessons/{id}")
	public ResponseEntity<ResponseMessage> updateLesson(@Valid @RequestBody Lesson lessonUD,
			@PathVariable(name = "id") Integer lessonId) {
		ResponseMessage response = new ResponseMessage();
		Lesson lesson = ls.getLessionById(lessonId);
		if (lesson == null) {
			ErrorObject error = new ErrorObject(1, "Lesson not found");
			response.setError(error);
			response.setMessage("Error");
		} else {
			lesson.setDuration(lessonUD.getDuration());
			lesson.setListDocument(lessonUD.getListDocument());
			lesson.setListLesson(lessonUD.getListLesson());
			lesson.setName(lessonUD.getName());
			lesson.setParentLesson(lessonUD.getParentLesson());
			System.out.println(lesson.getName());
			ls.edit(lesson);
			response.setData(lesson);
			response.setMessage("Update");
		}
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@DeleteMapping(value = "lessons/{id}")
	public ResponseEntity<ResponseMessage> deleteLesson(@PathVariable(name = "id") Integer lessonId) {
		ResponseMessage response = new ResponseMessage();
		ls.delete(lessonId);
		response.setData("Delete");
		response.setMessage("Delete Lesson");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
}
