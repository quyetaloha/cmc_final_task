package org.cmc.nlms.dao;

import org.cmc.nlms.model.UserRegistrationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRegistrationTokenDao extends JpaRepository<UserRegistrationToken, Integer>{
	UserRegistrationToken findByToken(String token);
}
