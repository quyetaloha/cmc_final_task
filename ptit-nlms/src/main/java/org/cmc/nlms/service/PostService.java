package org.cmc.nlms.service;

import java.util.ArrayList;

import org.cmc.nlms.model.Post;
import org.springframework.stereotype.Service;

@Service
public interface PostService {
	public ArrayList<Post> getRecentPost(int number);
	public ArrayList<Post> getAllPost();
	public Post getPostById(int id);
	public void updateOrInsertPost(Post post);
	public void deleteById(int id);
        public Post updateClick(int id,Post post);
}
