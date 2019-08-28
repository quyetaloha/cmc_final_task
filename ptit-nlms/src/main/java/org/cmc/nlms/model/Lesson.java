package org.cmc.nlms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tbllesson")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Lesson extends Auditable<String> implements Serializable{
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private int id;
	
	@Column(name = "name")
	private String name;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Lesson parentLesson;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Lesson> listLesson;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Document> listDocument;
	
	@Column(name = "duration")
	private int duration;
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Lesson> getListLesson() {
		return listLesson;
	}
	public void setListLesson(List<Lesson> listLesson) {
		this.listLesson = listLesson;
	}
	public List<Document> getListDocument() {
		return listDocument;
	}
	public void setListDocument(List<Document> listDocument) {
		this.listDocument = listDocument;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public Lesson getParentLesson() {
		return parentLesson;
	}
	public void setParentLesson(Lesson parentLesson) {
		this.parentLesson = parentLesson;
	}
}
