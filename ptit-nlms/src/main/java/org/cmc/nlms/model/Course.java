package org.cmc.nlms.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tblcourse")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Course extends Auditable<String> implements Serializable{
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private int id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "briefInfo")
	private String briefInfo;
	
	@Column(name = "originPrice")
	private double originPrice;
	
	@Column(name = "salePrice")
	private double salePrice;
	
	@Column(name = "requirement")
	private String requirement;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "courselength")
	private int courselength;
	
	@Column(name = "numberOfLecture")
	private int numberOfLecture;
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Lesson> listLesson;
	
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Category> listCategory;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private User createdBy;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private User trainer;
	
	@Column(name = "imgUrl")
	private String imgUrl;
	
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
	public String getBriefInfo() {
		return briefInfo;
	}
	public void setBriefInfo(String briefInfo) {
		this.briefInfo = briefInfo;
	}
	public double getOriginPrice() {
		return originPrice;
	}
	public void setOriginPrice(double originPrice) {
		this.originPrice = originPrice;
	}
	public double getSalePrice() {
		return salePrice;
	}
	public void setSalePrice(double salePrice) {
		this.salePrice = salePrice;
	}
	public String getRequirement() {
		return requirement;
	}
	public void setRequirement(String requirement) {
		this.requirement = requirement;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getCourselength() {
		return courselength;
	}
	public void setCourselength(int courselength) {
		this.courselength = courselength;
	}
	public int getNumberOfLecture() {
		return numberOfLecture;
	}
	public void setNumberOfLecture(int numberOfLecture) {
		this.numberOfLecture = numberOfLecture;
	}
	public List<Lesson> getListLesson() {
		return listLesson;
	}
	public void setListLesson(List<Lesson> listLesson) {
		this.listLesson = listLesson;
	}
	public List<Category> getListCategory() {
		return listCategory;
	}
	public void setListCategory(List<Category> listCategory) {
		this.listCategory = listCategory;
	}
	public User getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}
	public User getTrainer() {
		return trainer;
	}
	public void setTrainer(User trainer) {
		this.trainer = trainer;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	
}
