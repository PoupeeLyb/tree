package com.example.tree.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tree.mapper.AttachmentMapper;
import com.example.tree.pojo.Attachment;
import com.example.tree.service.AttachmentService;

@Service
public class AttachmentServiceImpl implements AttachmentService {
    
    @Autowired
    private AttachmentMapper attachmentMapper;
    
    @Override
    //查找附件
    public List <Attachment> findByPostId(Integer postId){
        return attachmentMapper.findByPostId(postId);
    }
    
    @Override
    //统计attachment的数量
    public Integer countAttachments(){
        return attachmentMapper.countAttachments();
    }

    @Override
    //新增attachment
    public void add(Attachment attachment,Integer num){
        attachmentMapper.add(attachment,num);
    }
}
