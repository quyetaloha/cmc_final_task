package org.cmc.nlms.service;

import java.util.List;

import org.cmc.nlms.dao.ContactDao;
import org.cmc.nlms.model.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
	
	@Autowired
	private ContactDao contactDao;
         @Autowired
        private UserService userService;
	
	public void addContact(Contact contact) {
                contact.setStatus("PENDING");
		contactDao.save(contact);
	}
	public void editContact(int id, Contact sl,int id_user) {
                sl.setId(id);
                sl.setStatus(sl.getStatus());
                sl.setUser(userService.getUserById(id_user));
		contactDao.save(sl);
	}
	public void deleteContact(int contactId) {
		contactDao.deleteById(contactId);
	}
	public Contact getContactById(int contactId) {
		return contactDao.getOne(contactId);
	}
	public List<Contact> findContactByStatus(String status){
		return contactDao.findContactByStatus(status);
	}
	public List<Contact> findAll(){
		return contactDao.findAll(new Sort("createdDate"));
	}
}
