package com.example.tree.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.example.tree.pojo.Post;



@Mapper

public interface PostMapper {
    //获得所有贴子
    @Select("select * from post")
    List <Post> findAll();
    //查找贴子
    @Select("select * from post where user_id=#{userId}")
    List <Post> findByUserId(Integer userId);
    //统计个数
    @Select ("select count(*) from post")
     Integer countPosts();
    //新增
    @Insert("insert into post(id,user_id,content,created_at)"+"values(#{num},#{post.userId},#{post.content},#{post.createdat})")
    void add(@Param("post")Post post,@Param("num")Integer num);
}
