package com.example.tree.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tree.pojo.Comment;
import com.example.tree.service.CommentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;




@RestController
@RequestMapping("/comment")


public class CommentController {
    @Autowired
    private CommentService commentService;
    @PostMapping("/post")
  public String postComment(@RequestBody String requestBody) {
          String jsonString=requestBody;
    ObjectMapper objectMapper = new ObjectMapper();
        try {
            Comment comment= objectMapper.readValue(jsonString, Comment.class);
            System.out.println("数据是"+jsonString);
       commentService.add(comment);
       return jsonString;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "comment转换失败";
    }
    @GetMapping("/get")
    public String getByPostId(@RequestParam Integer postId) {
         List<Comment> comments = commentService.findByPostId(postId);
    if (comments == null || comments.isEmpty()) {
        return "未找到该贴子的评论";
    } else {
        Comment[] commentArray = comments.toArray(new Comment[comments.size()]);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonString = objectMapper.writeValueAsString(commentArray);
            System.out.println("返回的代码是" + jsonString);
            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "comment转换失败";
        }
    }
    }
    
    
}

