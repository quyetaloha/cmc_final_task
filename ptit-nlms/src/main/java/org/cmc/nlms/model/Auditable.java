package org.cmc.nlms.model;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.util.Date;

//@Getter(AccessLevel.PROTECTED)
//@Setter(AccessLevel.PROTECTED)
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class Auditable<U> {
	@CreatedBy
	@Column(name = "created_by")
	private U createdByUser;

	@CreatedDate
	@Column(name = "created_date")
	private Date createdDate;

	@LastModifiedBy
	@Column(name = "last_modified_by",updatable=true )
	private U lastModifiedByUser;

	@LastModifiedDate
	@Column(name = "last_modified_date",updatable=true)
	private Date lastModifiedDate;

    public U getCreatedByUser() {
        return createdByUser;
    }

    public void setCreatedByUser(U createdByUser) {
        this.createdByUser = createdByUser;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public U getLastModifiedByUser() {
        return lastModifiedByUser;
    }

    public void setLastModifiedByUser(U lastModifiedByUser) {
        this.lastModifiedByUser = lastModifiedByUser;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
        
}