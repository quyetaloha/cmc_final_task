
package org.cmc.nlms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.cmc.nlms.model.ErrorObject;
import org.cmc.nlms.model.Post;
import org.cmc.nlms.model.ResponseMessage;
import org.cmc.nlms.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@GetMapping(value = "/post")
	public ResponseEntity<ResponseMessage> getPostById(@RequestParam int id)
	{
		ResponseMessage response = new ResponseMessage();
		Post Post = postService.getPostById(id);
		response.setData(Post);
		if(Post == null)
		{
			ErrorObject error = new ErrorObject(0, "Post not found");
			response.setError(error);
			response.setMessage("error");
		}
		else
		{
			response.setMessage("success");
			response.setError(null);
		}
		return new ResponseEntity<ResponseMessage>(response, Post == null ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.OK);
	}
	
	@RequestMapping(value = "/post", method = RequestMethod.POST)
	public ResponseEntity<ResponseMessage> InsertUser(@RequestBody Post post, HttpServletRequest request)
	{
		
		ResponseMessage response = new ResponseMessage();
		postService.updateOrInsertPost(post);
                response.setData(post);
		response.setMessage("sussescc");
                response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/posts", method = RequestMethod.PUT)
	public ResponseEntity<ResponseMessage> updateUser(@RequestBody Post post, HttpServletRequest request)
	{
		
		ResponseMessage response = new ResponseMessage();
		postService.updateOrInsertPost(post);
                List<Post>list=postService.getAllPost();
                response.setData(list);
		response.setMessage("saved");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/posts", method = RequestMethod.DELETE)
	public ResponseEntity<ResponseMessage> deleteUser(@RequestParam int id)
	{
		postService.deleteById(id);
		ResponseMessage response = new ResponseMessage();
		response.setData(true);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/posts", method = RequestMethod.GET)
	public ResponseEntity<ResponseMessage> getAll()
	{
		ResponseMessage response = new ResponseMessage();
		response.setData(postService.getAllPost());
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}

	@RequestMapping(value = "/recentposts", method = RequestMethod.GET)
	public ResponseEntity<ResponseMessage> getRecentPosts(@RequestParam int number)
	{
		List<Post> listPost = postService.getRecentPost(number);
		ResponseMessage response = new ResponseMessage();
		response.setData(listPost);
		response.setMessage("success");
		response.setError(null);
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	}
        @RequestMapping(value="/updateClickCount",method =RequestMethod.PUT)
            public ResponseEntity<ResponseMessage> updateClickCount(@RequestBody Post post)
	{
		//Post Post = postService.getPostById(id);
		ResponseMessage response = new ResponseMessage();
		postService.updateClick(post.getId(),post);
		response.setMessage("saved");
		return new ResponseEntity<ResponseMessage>(response, HttpStatus.OK);
	
	
        }
}