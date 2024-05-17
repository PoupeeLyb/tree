package com.example.tree.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tree.pojo.Post;
import com.example.tree.service.PostService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;




@RestController
@RequestMapping("/post")

public class PostController {
    @Autowired
    private PostService postService;

    @PostMapping("/newpost")
    public Integer add(@RequestBody String requestBody) {
        String jsonString=requestBody;
    ObjectMapper objectMapper = new ObjectMapper();
        try {
            Post post= objectMapper.readValue(jsonString, Post.class);
            System.out.println(jsonString);
       Integer num=postService.countPosts()+1;
       postService.add(post,num);
       return num;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
   @GetMapping("/getpost")
   public String postInfo(@RequestParam Integer userId) {
      List<Post> posts = postService.findByUserId(userId);
    System.out.println("贴子是" + userId);
    if (posts == null || posts.isEmpty()) {
        return "未找到该用户的贴子";
    } else {
        Post[] postArray = posts.toArray(new Post[posts.size()]);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonString = objectMapper.writeValueAsString(postArray);
            System.out.println("返回的代码是" + jsonString);
            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "post转换失败";
        }
    }
   }
   

   @GetMapping("/allpost")
   public String getAllPost() {
    List<Post> posts = postService.findAll();
    if (posts == null || posts.isEmpty()) {
        return "未找到该用户的贴子";
    } else {
        Post[] postArray = posts.toArray(new Post[posts.size()]);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonString = objectMapper.writeValueAsString(postArray);
            System.out.println("返回的代码是" + jsonString);
            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "post转换失败";
        }
    }
   }
   @DeleteMapping("/delete/{id}")
   public String deletePost(@PathVariable Integer id){
    postService.deleteById(id);
    postService.updateIdsAfterDeletion(id);
    return "删除成功";
   }
}
