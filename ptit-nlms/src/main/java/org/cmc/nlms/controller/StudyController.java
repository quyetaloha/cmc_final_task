package org.cmc.nlms.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.config.JwtTokenUtil;
import org.cmc.nlms.model.Course;
import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.Lesson;
import org.cmc.nlms.model.Progress;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.model.User;
import org.cmc.nlms.model.UserLesson;
import org.cmc.nlms.service.CourseService;
import org.cmc.nlms.service.DocumentService;
import org.cmc.nlms.service.LessionService;
import org.cmc.nlms.service.ProgressService;
import org.cmc.nlms.service.UserLessonService;
import org.cmc.nlms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudyController {

	@Autowired
	private LessionService lessonService;
	@Autowired
	private CourseService courseService;
	@Autowired
	private DocumentService documentService;
	@Autowired
	private UserLessonService userLessonService;
	@Autowired
	private JwtTokenUtil jwtToken;
	@Autowired
	private UserService userService;
	@Autowired
	private ProgressService progressService;

	@GetMapping(value = "course-study")
	public ResponseEntity<ResponseMessage> getCourseStudy(@RequestParam(name = "idCourse") Integer id,
			HttpServletRequest request) {
		ResponseMessage response = new ResponseMessage();
		Course course = courseService.getSliderById(id);
		if (course == null) {
			ErrorObject error = new ErrorObject(0, "Course null");
			response.setError(error);
			response.setData("Error");
		} else {
			// get user
			String requestTokenHeader = request.getHeader("Authorization");
			String jwt = null;
			if (requestTokenHeader != null && requestTokenHeader.startsWith("Token ")) {
				jwt = requestTokenHeader.substring(6);
			}
			int idUser = jwtToken.getIdFromToken(jwt);
			User user = userService.getUserById(idUser);

			// get data
			List<Lesson> listAllLesson = new ArrayList<>();
			for (Lesson l : course.getListLesson()) {
				if (!l.getListLesson().isEmpty()) {
					for (Lesson lesson : l.getListLesson()) {
						listAllLesson.add(lesson);
					}
				}
			}
			Map<String, Object> data = new HashMap<>();
			data.put("course", course);
			data.put("listLesson", listAllLesson);
			data.put("number", progressService.getProgress(idUser, course).getFinishedLecture());
			response.setData(data);
			response.setMessage("Course");
		}
		return new ResponseEntity<ResponseMessage>(response,
				course == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@GetMapping(value = "course-study-lesson")
	public ResponseEntity<ResponseMessage> getListLessonByCourse(@RequestParam(name = "idCourse") Integer idC,
			@RequestParam(name = "idLesson") Integer idL, HttpServletRequest request) {
		ResponseMessage res = new ResponseMessage();
		Course course = courseService.getSliderById(idC);
		Lesson lesson = lessonService.getLessionById(idL);
		if (course == null || lesson == null) {
			ErrorObject error = new ErrorObject(0, "Data null");
			res.setError(error);
			res.setMessage("Error");
		} else {
			// get user
			String requestTokenHeader = request.getHeader("Authorization");
			String jwt = null;
			if (requestTokenHeader != null && requestTokenHeader.startsWith("Token ")) {
				jwt = requestTokenHeader.substring(6);
			}
			int userID = jwtToken.getIdFromToken(jwt);
			User user = userService.getUserById(userID);

			// list lesson con
			List<Lesson> listAllLesson = new ArrayList<>();
			for (Lesson l : course.getListLesson()) {
				if (!l.getListLesson().isEmpty()) {
					for (Lesson ul : l.getListLesson()) {
						listAllLesson.add(ul);
					}
				}
			}

			Map<String, Object> data = new HashMap<>();
			data.put("course", course);
			data.put("lesson", lesson);
			data.put("listLesson", listAllLesson);
			data.put("number", progressService.getProgress(userID, course).getFinishedLecture());

			res.setData(data);
			res.setMessage("Course study lesson");
		}

		return new ResponseEntity<ResponseMessage>(res,
				course == null || lesson == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

	@GetMapping(value = "update-lesson-status")
	public ResponseEntity<ResponseMessage> updateLessonStatus(@RequestParam(name = "idCourse") Integer courseID,
			@RequestParam(name = "idLesson") Integer lessonID, HttpServletRequest request) {

		ResponseMessage response = new ResponseMessage();
		Course course = courseService.getSliderById(courseID);
		Lesson lesson = lessonService.getLessionById(lessonID);
		if (course == null || lesson == null) {
			ErrorObject error = new ErrorObject(0, "Data null");
			response.setError(error);
			response.setMessage("error");
		} else {
			// get user
			String tokenHeader = request.getHeader("Authorization");
			String jwt = null;
			if (tokenHeader != null && tokenHeader.startsWith("Token ")) {
				jwt = tokenHeader.substring(6);
			}
			int userID = jwtToken.getIdFromToken(jwt);
			User user = userService.getUserById(userID);

			// Kiem tra User da hoc qua Lesson hay chua
			UserLesson userL = userLessonService.getUserLessonBy(userID, lessonID);
			if (userL == null) {
				userL = new UserLesson();
				userL.setLesson(lesson);
				userL.setUser(userService.getUserById(userID));
				userL.setStatus(true);
				userLessonService.addUserLesson(userL);
				Progress progress = progressService.getProgress(userID, course);
				if (progress == null) {
					progress = progressService.createProgress(userID, course);
					progress.setFinishedLecture(1);
					progressService.updateProgress(userID, progress);
				} else {
					progress.setFinishedLecture(progress.getFinishedLecture() + 1);
					progressService.updateProgress(userID, progress);
				}
			}

			// Tra ve so luong Lesson trong Course da dc User hoc
			int number = progressService.getProgress(userID, course).getFinishedLecture();
			Map<String, Integer> data = new HashMap<>();
			data.put("number", number);

			response.setData(data);
			response.setMessage("So lesson da hoc");
		}
		return new ResponseEntity<ResponseMessage>(response,
				course == null || lesson == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}

}
