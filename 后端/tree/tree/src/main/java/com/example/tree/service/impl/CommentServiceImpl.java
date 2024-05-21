package com.example.tree.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tree.mapper.CommentMapper;
import com.example.tree.pojo.Comment;
import com.example.tree.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService {
     @Autowired
     private CommentMapper commentMapper;

     @Override
     public void add(Comment comment){
        commentMapper.add(comment);
     }
     @Override
     //获得评论
    public List <Comment> findByPostId(Integer postId){
      return commentMapper.findByPostId(postId);
    }
    }
