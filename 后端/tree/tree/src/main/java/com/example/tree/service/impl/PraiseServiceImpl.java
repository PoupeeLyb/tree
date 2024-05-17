package com.example.tree.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tree.mapper.PraiseMapper;
import com.example.tree.pojo.Praise;
import com.example.tree.service.PraiseService;

@Service

public class PraiseServiceImpl implements PraiseService {
    
    @Autowired 
    private PraiseMapper praiseMapper;

    @Override
    public void add(Praise praise){
        praiseMapper.add(praise);
    }
    @Override
    public List <Integer> findByPostId(Integer postId){
     return praiseMapper.findByPostId(postId);
    }
    @Override
    public void delete(Integer postId,Integer userId){
        praiseMapper.delete(postId, userId);
    }
}
