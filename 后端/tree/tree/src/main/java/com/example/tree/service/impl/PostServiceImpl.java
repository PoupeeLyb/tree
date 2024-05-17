package com.example.tree.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tree.mapper.PostMapper;
import com.example.tree.pojo.Post;
import com.example.tree.service.PostService;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private PostMapper postMapper;

    @Override
    //获得所有贴子
    public List <Post> findAll(){
      return postMapper.findAll();
    }
    @Override
    //查找贴子
    public List <Post> findByUserId(Integer userId){
      return postMapper.findByUserId(userId);
    }
    @Override
    //统计post数量
    public Integer countPosts(){
      return postMapper.countPosts();
    }
    @Override
    //新增post
    public void add(Post post,Integer num){
        post.setCreatedat(LocalDate.now());
        postMapper.add(post,num);
    }
    @Override
    //删除
    public void deleteById(Integer id){
      postMapper.deleteById(id);
    }
    @Override
    //删除后更新id
    public void updateIdsAfterDeletion(Integer id){
      postMapper.updateIdsAfterDeletion(id);
    }
}
