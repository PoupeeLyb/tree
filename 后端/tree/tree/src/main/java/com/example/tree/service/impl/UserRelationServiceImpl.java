package com.example.tree.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tree.mapper.UserRelationMapper;
import com.example.tree.pojo.UserRelation;
import com.example.tree.service.UserRationService;

@Service
public class UserRelationServiceImpl implements UserRationService{
    
    @Autowired
    private UserRelationMapper userRelationMapper;

  
    @Override
    public void deleteFollow(Integer userId,Integer relatedUserId){
        userRelationMapper.deleteFollow(userId, relatedUserId);
    }
    @Override
    public void deleteFans(Integer userId,Integer relatedUserId){
        userRelationMapper.deleteFans(userId, relatedUserId);
    }
    @Override
    //找到关注的人
    public List <Integer> findFollow(Integer userId){
        return userRelationMapper.findFollow(userId);
    }
    @Override
    //找到粉丝
    public List <Integer> findFans(Integer relatedUserId){
        return userRelationMapper.findFans(relatedUserId);
    }
    @Override
    //统计
    public Integer countUserRalations(){
        return userRelationMapper.countUserRalations();
    }
    @Override
    //添加
    public void add(UserRelation userRelation,Integer num){
        userRelationMapper.add(userRelation, num);
    }
}
