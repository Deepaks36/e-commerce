package com.example.demo.Controller;

import java.util.Optional;

//import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.Entity.FoodEntity;
import com.example.demo.Entity.LoginEntity;
import com.example.demo.Repository.FoodRepository;
import com.example.demo.Repository.LoginRepository;

import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class FoodController {
	@Autowired
	FoodRepository foodrepository;

	
	
	
	@PostMapping("/put")
	public ResponseEntity<FoodEntity> post(@RequestBody FoodEntity foodentity) {
	    FoodEntity savedFood = foodrepository.save(foodentity);
	    return ResponseEntity.ok(savedFood);  // Return the saved entity
	}

	@GetMapping("/path")
	public Iterable<FoodEntity> gets(){
		return foodrepository.findAll();
	
	}
	
}

