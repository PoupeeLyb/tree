package com.example.tree.service;

import java.util.List;

import com.example.tree.pojo.UserRelation;

public interface UserRationService {
    //删除关注的人
    void deleteFollow(Integer userId,Integer relatedUserId);
    //删除粉丝
    void deleteFans(Integer userId,Integer relatedUserId);
     //找到关注的人  
    List <Integer> findFollow(Integer userId);
    //找到粉丝
    List <Integer> findFans(Integer relatedUserId);
    //统计userrelation里的元素个数
     Integer countUserRalations();
     //添加
    void add(UserRelation userRelation,Integer num);
}
