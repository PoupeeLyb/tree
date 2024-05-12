package com.example.tree.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tree.mapper.UserMapper;
import com.example.tree.pojo.User;
import com.example.tree.service.UserService;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private  UserMapper userMapper;

    @Override
    //查询用户通过id
    public User findById(Integer id){
        User findUser=userMapper.findById(id);
        return findUser;
    }
    @Override
//查询用户
public User findByUsername(String username){
    User findUser=userMapper.findByUsername(username);
   return findUser;
}
    @Override
//注册
public void register(User user,Integer num){
     //添加
     userMapper.add(user,num);
    
} 
    @Override
    // 统计用户数量
    public Integer countUsers() {
        return userMapper.countUsers();
    }
    @Override
    public void update(User user){
        userMapper.update(user);
    }
}