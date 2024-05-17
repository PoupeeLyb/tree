package com.example.tree.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.tree.pojo.Praise;

@Mapper
public interface PraiseMapper {
    //添加
    @Insert("insert into praise(post_id,user_id)"+"values(#{postId},#{userId})")
    void add(Praise praise);
    //查找
    @Select("select user_id from praise where post_id=#{postId}")
    List <Integer> findByPostId(Integer postId);
    //删除
    @Delete("delete from praise where post_id=#{postId} and user_id=#{userId} ")
    void delete(Integer postId,Integer userId);
}
