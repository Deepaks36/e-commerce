package com.example.demo.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.LoginEntity;

@Repository
public interface LoginRepository extends CrudRepository<LoginEntity, Long> {

//	Optional<LoginEntity> findByEmail(String email);

	Optional<LoginEntity> findByEmail(String email);

//	Optional<LoginEntity> findById(long userId);

//	Optional<LoginEntity> findById(long userId);

//	Optional<LoginEntity> findById(long userId);

//	Optional<LoginEntity> findByuserId(long userId);
	

}
