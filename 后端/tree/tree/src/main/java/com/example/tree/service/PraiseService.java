package com.example.tree.service;

import java.util.List;

import com.example.tree.pojo.Praise;

public interface PraiseService {
    //添加
    void add(Praise praise);
    //找到
    List <Integer> findByPostId(Integer postId);
    //删除
    void delete(Integer postId,Integer userId);
}
