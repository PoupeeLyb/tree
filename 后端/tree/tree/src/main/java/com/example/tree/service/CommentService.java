package com.example.tree.service;

import java.util.List;

import com.example.tree.pojo.Comment;

public interface CommentService {
    //上传评论
    void add(Comment comment);
    //获得评论
    List <Comment> findByPostId(Integer postId);
}
