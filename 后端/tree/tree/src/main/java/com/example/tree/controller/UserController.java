package com.example.tree.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tree.pojo.User;
import com.example.tree.pojo.UserLogin;
import com.example.tree.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;





@RestController
@RequestMapping("/user")

public class UserController {

    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public String register(@RequestBody String requestBody){
    String jsonString=requestBody;
    System.out.println("数据是"+jsonString);
    ObjectMapper objectMapper = new ObjectMapper();
        try {
            User user1 = objectMapper.readValue(jsonString, User.class);
            System.out.println(user1.getUsername());
            User findUser=userService.findByUsername(user1.getUsername());
    if(findUser==null){
        //没有占用
       Integer num=userService.countUsers()+1;
       userService.register(user1,num);
       return "注册成功";
    }
    else{
        //占用
        return "用户名已注册";
    }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "User转换失败";
    //查询用户
    }
    @PostMapping("/login")
    public String login(@RequestBody UserLogin requestBody ) {
        //根据用户名查询用户
        System.out.println(requestBody.getUsername()+requestBody.getPassword());
        User loginUser=userService.findByUsername(requestBody.getUsername());
        //判断用户是否存在
        if(loginUser==null){
            return "用户名不存在";
        }
        //判断密码是否正确
        else if(requestBody.getPassword().equals(loginUser.getPassword())){
            return "登录成功";
        }
        else{
        return "密码错误";
        }
    }
    @GetMapping("/userInfo")
    public String userInfo(@RequestParam String username) {
        User findUser=userService.findByUsername(username);
        System.out.println("用户是"+username);
        if(findUser==null)
            return "未找到该用户";
        else{    
            ObjectMapper objectMapper = new ObjectMapper();
           try {
                String jsonString = objectMapper.writeValueAsString(findUser);
                System.out.println("返回的代码是" + jsonString);
                return jsonString;
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return "User转换失败";
            }
        }
    }
    @GetMapping("/userInfoById")
    public String findUserById(@RequestParam Integer id) {
        User findUser=userService.findById(id);
        System.out.println("用户是"+id);
        if(findUser==null)
            return "未找到该用户";
        else{    
            ObjectMapper objectMapper = new ObjectMapper();
           try {
                String jsonString = objectMapper.writeValueAsString(findUser);
                System.out.println("返回的代码是" + jsonString);
                return jsonString;
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return "User转换失败";
            }
        }
    }
    
    @PutMapping("/update")
    public String putMethodName(@RequestBody User user) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
             String jsonString = objectMapper.writeValueAsString(user);
             System.out.println("更新的代码是" + jsonString);
             userService.update(user);
             return "更新成功";
         } catch (JsonProcessingException e) {
             e.printStackTrace();
             return "User转换失败";
         }
    }
}
