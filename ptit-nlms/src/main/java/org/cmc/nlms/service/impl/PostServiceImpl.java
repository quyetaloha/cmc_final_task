package org.cmc.nlms.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.cmc.nlms.dao.CategoryDao;
import org.cmc.nlms.dao.PostDao;
import org.cmc.nlms.model.Category;
import org.cmc.nlms.model.Post;
import org.cmc.nlms.service.CategoryService;
import org.cmc.nlms.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PostServiceImpl implements PostService{

	@Autowired
	private PostDao postDao;

	@Override
	public ArrayList<Post> getAllPost() {
		// TODO Auto-generated method stub
		return (ArrayList<Post>) postDao.findAll();
	}

	@Override
	public Post getPostById(int id) {
		// TODO Auto-generated method stub
		return postDao.findById(id).get();
	}

	@Override
	public void updateOrInsertPost(Post post) {
		postDao.save(post);
		
	}
	@Override
	public void deleteById(int id) {
		postDao.deleteById(id);
		
	}

	@Override
	public ArrayList<Post> getRecentPost(int number) {
		ArrayList<Post> allPost = (ArrayList<Post>) postDao.findAll();
		int size = allPost.size();
		if(number > size)
			number = size;
		Collections.sort(allPost, new PostDateCompare());
		for(int i = 0; i < size - number; i++)
			allPost.remove(0);
		return allPost;
	}

    @Override
    public Post updateClick(int id,Post post) {
                Post temp = postDao.getOne(id);
                temp.setClickCount(temp.getClickCount()+1);
                post = postDao.save(temp);
                return post;
    }

  
	
	//comparing books by id
	class PostDateCompare implements Comparator<Post>
	{
		@Override
		public int compare(Post arg0, Post arg1) {
			return arg0.getId() - arg1.getId();
		}
	}

}
