package org.cmc.nlms.dao;

import org.cmc.nlms.model.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenDao extends JpaRepository<PasswordResetToken, Integer>{
	PasswordResetToken findByToken(String token);
}
