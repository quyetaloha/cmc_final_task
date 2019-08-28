package org.cmc.nlms.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthUser extends User implements UserDetails{
	
	private int id = 0;
        private Set authority;

    public AuthUser(int id, String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.id =id;
    }
	
	public AuthUser() {
		super("", "", new ArrayList<>());
	}
	
//	public AuthUser(int id, String username, String password,Set authority)
//	{
//		super(username, password, new ArrayList<>());
//		this.id = id;
////                this.role=role;
//	}

        

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	};
}
