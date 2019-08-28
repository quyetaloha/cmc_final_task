package org.cmc.nlms.service;

import java.util.List;

import org.cmc.nlms.dao.LessonDao;
import org.cmc.nlms.model.Lesson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LessionService {

	@Autowired
	private LessonDao l;

	public void add(Lesson lesson) {
		l.save(lesson);
	}

	public void edit(Lesson lesson) {
		l.saveAndFlush(lesson);
	}

	public void delete(int lessonId) {
		l.deleteById(lessonId);
	}

	public Lesson getLessionById(int lessonId) {
		return l.getOne(lessonId);
	}

	public List<Lesson> getLessonByName(String name) {
		return l.getLessonByName(name);
	}

	public List<Lesson> getAll() {
		return l.findAll();
	}
}
