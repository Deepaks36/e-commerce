package com.example.demo.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.CartEntity;
import com.example.demo.Entity.FoodEntity;
import com.example.demo.Entity.LoginEntity;
import com.example.demo.Repository.CartRepository;
import com.example.demo.Repository.FoodRepository;
import com.example.demo.Repository.LoginRepository;

@RestController
@RequestMapping("/cart")  // Common base path
public class CartController {
    
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private FoodRepository foodRepository;

    // ADD FOOD TO CART (Auto-increments quantity if item exists)
    @PostMapping("/add/{userId}/{foodId}")
    public ResponseEntity<?> addToCart(@PathVariable Long userId, @PathVariable int foodId) {
        // Check if the user is logged in
        Optional<LoginEntity> userOptional = loginRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in!");
        }

        // Check if the food exists
        Optional<FoodEntity> foodOptional = foodRepository.findById(foodId);
        if (foodOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Food item not found!");
        }

        LoginEntity user = userOptional.get();
        FoodEntity food = foodOptional.get();

        // Check if the item is already in the cart
        Optional<CartEntity> existingCartItem = cartRepository.findByUserIdAndFoodId(user.getId(), food.getId());

        if (existingCartItem.isPresent()) {
            // Increase quantity by 1
            CartEntity cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            cartItem.setPrice(food.getPrice() * cartItem.getQuantity());
            cartItem.setImg(food.getImg());
            CartEntity savedcart= cartRepository.save(cartItem);
//            return ResponseEntity.ok("Quantity updated: " + cartItem.getQuantity());
            return ResponseEntity.ok(savedcart);
        } else {
            // Add new item to cart with quantity = 1
            CartEntity newCartItem = new CartEntity(user, food, 1);
            cartRepository.save(newCartItem);
            return ResponseEntity.ok("New food item added to cart!");
        }
    }

    // GET CART ITEMS FOR USER
//    @GetMapping("/user/{userId}")
//    public ResponseEntity<?> getUserCart(@PathVariable Long userId) {
//        if (loginRepository.findById(userId).isEmpty()) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in!");
//        }
//
//        return ResponseEntity.ok(cartRepository.findByUserId(userId));
//    }
    @GetMapping("/getall")
    public Iterable<CartEntity> getallitem(){
    	return cartRepository.findAll();
    }
    
    
    @DeleteMapping("/{id}")
    public String deleteone(@PathVariable long id) {
    	cartRepository.deleteById(id);
    	return "Deleted";
    }
}
