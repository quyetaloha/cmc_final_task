package org.cmc.nlms.service;

import java.util.ArrayList;
import java.util.List;

import org.cmc.nlms.model.Order;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {
	public ArrayList<Order> getAllOrder();
	public Order getOrderById(int id);
	public void updateOrInsertOrder(Order order);
	public void deleteById(int id);
	public List<Order> getOrderByUserId(int id);
	public Order addOrder(int id, Order order);
}
