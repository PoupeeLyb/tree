package com.example.tree.service;

import com.example.tree.pojo.User;

public interface UserService {

//查询用户通过id
User findById(Integer id);
//查询用户
User findByUsername(String username);
//注册
void register(User user,Integer num);
// 统计用户数量
Integer countUsers();
//更新用户
void update(User user);
}
