package org.cmc.nlms.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.cmc.nlms.dao.UserDao;
import org.cmc.nlms.dao.UserRegistrationTokenDao;
import org.cmc.nlms.model.User;
import org.cmc.nlms.model.UserRegistrationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Autowired
	private PasswordEncoder bcryptEncoder;
	@Autowired
	private UserDao userDao;
	@Autowired
	private UserRegistrationTokenDao urtDao;
	
	public User getUserById(int id)
	{
		try
		{
			User user = userDao.findById(id).get();
			return user;
		}
		catch(java.util.NoSuchElementException e)
		{
			return null;
		}
	}
        public List<User> getAll()
        {
            List<User> list= userDao.findAll();
            return list;
        }

	public User updateUser(int id, User user) {
		user.setId(id);
		user.setPassword(bcryptEncoder.encode(user.getPassword()));
                System.out.println(user.getPassword());
		user = userDao.save(user);
		return user;
	}

	public void deleteUser(int id) {
		userDao.deleteById(id);
	}

	public User confirmRegistration(String token) {
		UserRegistrationToken urt = urtDao.findByToken(token);
		if(urt == null)	//not found
		{
			System.out.println("User not found");
			return null;
		}
		User user = new User();
		user.setAvatarUrl(urt.getAvatarUrl());
		user.setEmail(urt.getEmail());
		user.setFullName(urt.getFullName());
		user.setPassword(urt.getPassword());
		user.setPhone(urt.getPhone());
		user.setAvatarUrl("/assets/img/default.png");
		user.setUsername(urt.getUsername());
		
		List<User> temp = userDao.findByUsername(user.getUsername());
		if(temp.size() > 0)	//duplicate
		{
			System.out.println(userDao.findAll().size());
			return null;
		}
		
		user = userDao.save(user);
		return user;
	}
	
	public User getUserByUsername(String username)
	{
		List<User> listUser = userDao.findByUsername(username);
		if(listUser.size() > 0)
			return listUser.get(0);
		else
			return null;
		
	}

	public List<User> getAllUsers() {
		List<User> listUser = userDao.findAll();
		if(listUser.size() > 0)
			return listUser;
		else
			return null;
	}
	public User updateUserWithoutPassword(int id, User user) {
		User existUser = userDao.getOne(id);
		user.setId(id);
		user.setPassword(existUser.getPassword());
                user.setAvatarUrl(user.getAvatarUrl());
                user.setEmail(user.getEmail());
                user.setFullName(user.getFullName());
                user.setPhone(user.getPhone());
                user.setUsername(user.getUsername());
		user = userDao.save(user);
		return user;
	}

//    @Override
//    public UserDetails loadUserByUsername(String string) throws UsernameNotFoundException {
//        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
//    }
//    private Set getAuthority(User user) {
//        Set authorities = new HashSet<>();
//		user.getRole().forEach(role -> {
//            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getClass().getName()));
//		});
//		return authorities;
//	}
        
   

}
