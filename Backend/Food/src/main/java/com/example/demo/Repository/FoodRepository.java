package com.example.demo.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.FoodEntity;

@Repository
public interface FoodRepository extends CrudRepository<FoodEntity, Integer> {

}


