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

import com.example.tree.pojo.Praise;
import com.example.tree.pojo.User;
import com.example.tree.service.PraiseService;
import com.example.tree.service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;




@RestController
@RequestMapping("/praise")

public class PraiseController {
    @Autowired
    private PraiseService praiseService;
    @Autowired
    private UserService userService;
    @PostMapping("/post")
    public String add(@RequestBody String requestBody) {
        String jsonString=requestBody;
    System.out.println("数据是"+jsonString);
    ObjectMapper objectMapper = new ObjectMapper();
        try {
            Praise praise = objectMapper.readValue(jsonString, Praise.class);
            System.out.println(praise.getPostId());
            praiseService.add(praise);
            return "上传成功";
        }
            catch (Exception e) {
                e.printStackTrace();
            }
            return "priase转换失败";
        
    }
    @GetMapping("/get")
    public String getPraise(@RequestParam Integer postId) {
         List<Integer> praises = praiseService.findByPostId(postId);
        List<User> users = new ArrayList<>();

        for (Integer praiseId : praises) {
            User findUser = userService.findById(praiseId);
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
    @DeleteMapping("/delete/{postId}/{userId}")
        public String delete(@PathVariable Integer postId,@PathVariable Integer userId){
       
            praiseService.delete(postId, userId);
            
            return "删除成功";
    }

}
