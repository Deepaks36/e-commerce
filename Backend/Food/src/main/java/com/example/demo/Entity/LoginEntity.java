package com.example.demo.Entity;

import java.util.List;

//import jakarta.persistence.CascadeType;
//import jakarta.persistence.CascadeType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.JoinTable;
//import jakarta.persistence.ManyToMany;
//import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;


@Entity
public class LoginEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	private String email;
    private String password;
    private String conform_password;

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getConform_password() {
		return conform_password;
	}

	public void setConform_password(String conform_password) {
		this.conform_password = conform_password;
	}


}
