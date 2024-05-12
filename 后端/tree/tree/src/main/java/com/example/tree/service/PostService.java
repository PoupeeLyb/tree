package com.example.tree.service;

import java.util.List;

import com.example.tree.pojo.Post;

public interface PostService {

    //获得所有贴子
    List <Post> findAll();
    //查找贴子
    List <Post> findByUserId(Integer userId);
     //统计post数量
    Integer countPosts();
    //新增post
    void add(Post post,Integer num);
} 
