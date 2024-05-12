package com.example.tree.service;

import java.util.List;

import com.example.tree.pojo.Attachment;

public interface AttachmentService {

    //查找附件
    List <Attachment> findByPostId(Integer postId);
    //统计attachment的数量
    Integer countAttachments();
    //新增attachment
    void add(Attachment attachment,Integer num);
    
} 
