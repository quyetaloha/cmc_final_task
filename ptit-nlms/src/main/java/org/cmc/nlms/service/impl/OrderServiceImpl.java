package org.cmc.nlms.service.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.cmc.nlms.dao.CategoryDao;
import org.cmc.nlms.dao.OrderDao;
import org.cmc.nlms.dao.UserDao;
import org.cmc.nlms.model.Category;
import org.cmc.nlms.model.Course;
import org.cmc.nlms.model.Order;
import org.cmc.nlms.model.User;
import org.cmc.nlms.model.UserCourse;
import org.cmc.nlms.service.CategoryService;
import org.cmc.nlms.service.OrderService;
import org.cmc.nlms.service.ProgressService;
import org.cmc.nlms.service.UserCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderDao orderDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private UserCourseService ucService;
	
	@Autowired
	private ProgressService progressService;

	@Override
	public ArrayList<Order> getAllOrder() {
		// TODO Auto-generated method stub
		return (ArrayList<Order>) orderDao.findAll();
	}

	@Override
	public Order getOrderById(int id) {
		// TODO Auto-generated method stub
		return orderDao.findById(id).get();
	}

	@Override
	public void updateOrInsertOrder(Order order) {
		orderDao.save(order);
		
	}
	@Override
	public void deleteById(int id) {
		orderDao.deleteById(id);
		
	}

	@Override
	public List<Order> getOrderByUserId(int id) {
		List<Order> listOrder = orderDao.findAll();
		List<Order> result = new ArrayList<>();
		
		for(Order order : listOrder)
		{
			if(order.getUser().getId() == id)
				result.add(order);
		}
		
		return result;
	}

	@Override
	public Order addOrder(int id, Order order) {
		User user = null;
		try
		{
			user = userDao.findById(id).get();
		}
		catch(NoSuchElementException ex)
		{
			return null;
		}
		//add to my course and progress
		for(Course course : order.getListCourse())
		{
			UserCourse uc = new UserCourse();
			uc.setStartDate(new Date());
			Date endDate = new Date();
			Calendar c = Calendar.getInstance(); 
			c.setTime(endDate); 
			c.add(Calendar.MONTH, 3);
			endDate = c.getTime();
			uc.setEndDate(endDate);
			ucService.addUserCourse(id, course, uc);
			
			progressService.createProgress(id, course);
		}
		
		order.setUser(user);
		return orderDao.save(order);
	}
	
	
}
