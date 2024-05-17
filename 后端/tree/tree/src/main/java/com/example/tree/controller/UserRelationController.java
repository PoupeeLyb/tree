package com.example.tree.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tree.pojo.RelationType;
import com.example.tree.pojo.User;
import com.example.tree.pojo.UserRelation;
import com.example.tree.service.UserRationService;
import com.example.tree.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;



@RestController
@RequestMapping("/userRelation")

public class UserRelationController {
    
    @Autowired
    private UserRationService userRalationService;
    @Autowired
    private UserService userService;

    @PostMapping("/post")
    public String add(@RequestBody String requestBody) {
        String jsonString=requestBody;
    System.out.println("数据是"+jsonString);
    ObjectMapper objectMapper = new ObjectMapper();
        try {
            UserRelation userRelation1 = objectMapper.readValue(jsonString, UserRelation.class);
            UserRelation userRelation2 = objectMapper.readValue(jsonString, UserRelation.class);
            userRelation2.setUserId(userRelation1.getRelatedUserId());
            userRelation2.setRelatedUserId(userRelation1.getUserId());
            userRelation2.setRelationType(RelationType.BE_FOLLOWED);
            userRelation1.setRelationType(RelationType.FOLLOW);
            System.out.println(userRelation1.getRelationType());
            Integer num1=userRalationService.countUserRalations()+1;
            Integer num2=num1+1;
            userRalationService.add(userRelation1, num1);
            userRalationService.add(userRelation2, num2);
            return "上传成功";
        }
            catch (Exception e) {
                e.printStackTrace();
            }
            return "UserRalation转换失败";
        
    }
    @DeleteMapping("/delete/{userId}/{relatedUserId}")
    public String delete(@PathVariable Integer userId,@PathVariable Integer relatedUserId){
       
            userRalationService.deleteFollow(userId, relatedUserId);
            userRalationService.deleteFans(relatedUserId, userId);
            return "删除成功";
    }
    @GetMapping("/findFollow")
    public String findFollowUser(@RequestParam Integer userId) {
        List<Integer> follows = userRalationService.findFollow(userId);
        List<User> users = new ArrayList<>();

        for (Integer followId : follows) {
            User findUser = userService.findById(followId);
            users.add(findUser);
        }
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(users);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "User 转化失败 ";
        }
    }
    @GetMapping("/findFans")
    public String getFanUser(@RequestParam Integer userId) {
        List<Integer> fans = userRalationService.findFans(userId);
        List<User> users = new ArrayList<>();

        for (Integer followId : fans) {
            User findUser = userService.findById(followId);
            users.add(findUser);
        }
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(users);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "User 转化失败 ";
        }
    }
    
}
