package org.cmc.nlms.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.dao.PasswordResetTokenDao;
import org.cmc.nlms.dao.UserDao;
import org.cmc.nlms.model.Mail;
import org.cmc.nlms.model.PasswordResetToken;
import org.cmc.nlms.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordForgotService {
	@Autowired
	private PasswordResetTokenDao tokenDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private EmailService emailService;
	
	public boolean sendPasswordTokenEmail(String email, HttpServletRequest request)
	{
		User user = userDao.findByEmail(email);
		if(user == null)	//if no user can be found with that email, send error message
			return false;
		
		PasswordResetToken token = new PasswordResetToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUser(user);
        token.setExpiryDate(120);
        tokenDao.save(token);
        
        Mail mail = new Mail();
        mail.setFrom("no-reply@cmc.com.vn");
        mail.setTo(user.getEmail());
        mail.setSubject("Password reset request");

        Map<String, Object> model = new HashMap<>();
        model.put("token", token);
        model.put("user", user);
        model.put("signature", "CMC Global");
        String url = request.getScheme() + "://" + request.getServerName() + ":4200";
        model.put("resetUrl", url + "/change?token=" + token.getToken());
        mail.setModel(model);
        emailService.sendForgetPasswordEmail(mail);
		
		return true;
	}

	public User getUserByToken(String token) {
		PasswordResetToken pwToken = tokenDao.findByToken(token);
		if(pwToken == null)	//not found
			return null;
		else
			return pwToken.getUser();
	}
}
