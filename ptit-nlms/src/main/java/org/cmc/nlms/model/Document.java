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
@Table(name = "tbldocument")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Document extends Auditable<String> implements Serializable{
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private int id;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	private Setting type;
	
	@Column(name = "url")
	private String url;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Setting getType() {
		return type;
	}
	public void setType(Setting type) {
		this.type = type;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
	
}
