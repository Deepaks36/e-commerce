package com.example.demo.Entity;

import java.util.List;

//import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
//import jakarta.persistence.ManyToOne;

@Entity
public class FoodEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String img;
	private String icon;
	private String rate;
	private String costicon;
	private double price;
	private String catogry;
	@ManyToMany
	private List<LoginEntity> loginentity;
	public List<LoginEntity> getLoginentity() {
		return loginentity;
	}
	public void setLoginentity(List<LoginEntity> loginentity) {
		this.loginentity = loginentity;
	}
	public String getCatogry() {
		return catogry;
	}
	public void setCatogry(String catogry) {
		this.catogry = catogry;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getCosticon() {
		return costicon;
	}
	public void setCosticon(String costicon) {
		this.costicon = costicon;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	
	
}
