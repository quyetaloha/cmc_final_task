package org.cmc.nlms.service;

import java.util.List;

import org.cmc.nlms.dao.RegistrationDao;
import org.cmc.nlms.model.Registration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

	@Autowired
	private RegistrationDao registrationDao;

	public void addReg(Registration reg) {
		registrationDao.save(reg);
	}

	public void editReg(Registration reg) {
		registrationDao.saveAndFlush(reg);
	}

	public void delReg(int id) {
		registrationDao.deleteById(id);
	}

	public Registration getRegistrationById(int id) {
		return registrationDao.getOne(id);
	}

	public List<Registration> getRegistrationByUser(int userId) {
		return registrationDao.getRegistrationByUser(userId);
	}
	
	public List<Registration> getRegistrationByStatus(String status){
		return registrationDao.getRegistrationByStatus(status);
	}
	
	public List<Registration> getRegistrationByCourse(int courseID){
		return registrationDao.getRegistrationByCourse(courseID);
	}
}
