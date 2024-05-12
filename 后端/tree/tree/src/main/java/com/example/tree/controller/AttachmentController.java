package com.example.tree.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.tree.pojo.Attachment;
import com.example.tree.service.AttachmentService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;




@RestController
@RequestMapping("/attachment")
public class AttachmentController {
    
    @Autowired
    private AttachmentService attachmentService;
    @PostMapping("/post")
    public String postMethodName(@RequestBody String requestBody) {
          String jsonString=requestBody;
    ObjectMapper objectMapper = new ObjectMapper();
        try {
            Attachment attachment= objectMapper.readValue(jsonString, Attachment.class);
            System.out.println("数据是"+jsonString);
       Integer num=attachmentService.countAttachments()+1;
       attachmentService.add(attachment,num);
       return jsonString;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "Attachment转换失败";
    }
    @GetMapping("/get")
    public String getMethodName(@RequestParam Integer postId) {
    List<Attachment> attachments = attachmentService.findByPostId(postId);
    System.out.println("贴子是" + postId);
    if (attachments == null || attachments.isEmpty()) {
        return "未找到该用户的贴子";
    } else {
        Attachment[] attachmentArray = attachments.toArray(new Attachment[attachments.size()]);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            String jsonString = objectMapper.writeValueAsString(attachmentArray);
            System.out.println("返回的代码是" + jsonString);
            return jsonString;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Attachment转换失败";
        }
    }
}

       
    
}
