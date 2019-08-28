package org.cmc.nlms.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tblprogress")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Progress implements Serializable{
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private int id;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private User user;
	
	@ManyToOne(cascade = CascadeType.MERGE)
	private Course course;
	
	@Column(name = "finishedLecture")
	private int finishedLecture;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	public int getFinishedLecture() {
		return finishedLecture;
	}
	public void setFinishedLecture(int finishedLecture) {
		this.finishedLecture = finishedLecture;
	}
	
	
}
