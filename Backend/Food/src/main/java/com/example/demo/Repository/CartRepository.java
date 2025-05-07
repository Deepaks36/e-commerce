package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.CartEntity;

public interface CartRepository extends JpaRepository<CartEntity, Long> {
    List<CartEntity> findByUserId(Long userId);  // Fetch cart items by user
    Optional<CartEntity> findByUserIdAndFoodId(Long userId, int foodId);  // Check if item exists
}
