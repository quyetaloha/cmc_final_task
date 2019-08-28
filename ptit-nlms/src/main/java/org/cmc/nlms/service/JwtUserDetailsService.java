package org.cmc.nlms.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.dao.UserDao;
import org.cmc.nlms.dao.UserRegistrationTokenDao;
import org.cmc.nlms.model.AuthUser;
import org.cmc.nlms.model.Mail;
import org.cmc.nlms.model.Role;
import org.cmc.nlms.model.User;
import org.cmc.nlms.model.UserRegistrationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserRegistrationTokenDao urtDao;

	@Autowired
	private PasswordEncoder bcryptEncoder;
	
	@Autowired
	private EmailService emailService;

	@Override
	public AuthUser loadUserByUsername(String username) throws UsernameNotFoundException {
		try
		{
			User user = userDao.findByUsername(username).get(0);
			return new AuthUser(user.getId(), user.getUsername(), user.getPassword(), getAuthority(user));
		}
		catch(IndexOutOfBoundsException e)
		{
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}

	public User save(User user, HttpServletRequest request) {
		user.setPassword(bcryptEncoder.encode(user.getPassword()));
		UserRegistrationToken urt = new UserRegistrationToken();
		urt.setAvatarUrl(user.getAvatarUrl());
		urt.setEmail(user.getEmail());
//		urt.setFirstName(user.getFirstName());
//		urt.setLastName(user.getLastName());
		urt.setFullName(user.getFullName());
		urt.setPassword(user.getPassword());
		urt.setPhone(user.getPhone());
		
		urt.setUsername(user.getUsername());
		
		urt.setToken(UUID.randomUUID().toString());
		urt.setExpiryDate(120);
		
		List<User> temp = userDao.findByUsername(user.getUsername());
		if(temp.size() >= 1)	//duplicate
		{
			System.out.println(temp.get(0).getUsername());
			System.out.println("Duplicate username entry");
			return null;
		}
		
		try {
			urt = urtDao.save(urt);
		} catch (Exception e) {
			if (isCausedBy(e, java.sql.SQLIntegrityConstraintViolationException.class))
				System.out.println("Duplicate registration entry");
			return null;
		}
		
		//send confirmation email
		Mail mail = new Mail();
        mail.setFrom("no-reply@cmc.com.vn");
        mail.setTo(user.getEmail());
        mail.setSubject("User Registration");

        Map<String, Object> model = new HashMap<>();
        model.put("token", urt);
        model.put("signature", "CMC Global");
        String url = request.getScheme() + "://" + request.getServerName() + ":4200";
        model.put("resetUrl", url + "/confirm?token=" + urt.getToken());
        mail.setModel(model);
        emailService.sendUserRegistrationEmail(mail);
		
		return user;
	}

	
	private boolean isCausedBy(Throwable caught, Class<? extends Throwable> isOfOrCausedBy) {
		if (caught == null)
			return false;
		else if (isOfOrCausedBy.isAssignableFrom(caught.getClass()))
			return true;
		else
			return isCausedBy(caught.getCause(), isOfOrCausedBy);
	}
        

	private Set getAuthority(User user) {
        Set authorities = new HashSet<>();
        Set<Role> roles = user.getRole();
        for (Role role : roles) {
            System.out.println(role.getName());
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        }     
		return authorities;
	}

}
