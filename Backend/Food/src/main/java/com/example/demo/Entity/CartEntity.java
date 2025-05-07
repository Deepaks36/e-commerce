package com.example.demo.Entity;

import jakarta.persistence.*;

@Entity
public class CartEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double price;
    public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	private String img;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private LoginEntity user;  // Mapping to User

    @ManyToOne
    @JoinColumn(name = "food_id", nullable = false)
    private FoodEntity food;  // Mapping to Food Item

    private int quantity;

    // Constructors
    public CartEntity() {}

    public CartEntity(LoginEntity user, FoodEntity food, int quantity) {
        this.user = user;
        this.food = food;
        this.quantity = quantity;
    }

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LoginEntity getUser() {
        return user;
    }

    public void setUser(LoginEntity user) {
        this.user = user;
    }

    public FoodEntity getFood() {
        return food;
    }

    public void setFood(FoodEntity food) {
        this.food = food;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
