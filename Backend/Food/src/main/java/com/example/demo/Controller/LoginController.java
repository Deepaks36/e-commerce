package com.example.demo.Controller;

//import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.LoginEntity;
import com.example.demo.Repository.LoginRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class LoginController {
	
	@Autowired
	LoginRepository loginrepository;

	    
	    @PostMapping("/register")
	    public ResponseEntity<?> registerUser(@RequestBody LoginEntity loginEntity) {
	        Optional<LoginEntity> existingUser = loginrepository.findByEmail(loginEntity.getEmail());

	        if (existingUser.isPresent()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already in use");
	        }

	        LoginEntity loginid = loginrepository.save(loginEntity);
	        return ResponseEntity.ok(loginid);
	    }

	    
	    @PostMapping("/login")
	    public ResponseEntity<?> loginUser(@RequestBody LoginEntity loginEntity) {
	        Optional<LoginEntity> user = loginrepository.findByEmail(loginEntity.getEmail());

	        if (user.isPresent() && user.get().getPassword().equals(loginEntity.getPassword())) {
	            return ResponseEntity.ok(user.get()); // Send user data on successful login
	        } else {
//	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("plese signup");
	        	return ResponseEntity.ok("please Sinup");
	        }
	    }

	
	@GetMapping("/getlogins")
	public Iterable<LoginEntity> getlogin(){
		return loginrepository.findAll();
	}
	
	

}
