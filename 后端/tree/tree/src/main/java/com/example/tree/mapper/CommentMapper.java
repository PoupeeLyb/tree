package com.example.tree.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.tree.pojo.Comment;

@Mapper
public interface CommentMapper {
    //上传
    @Insert("insert into comment (post_id,commenter_id,ref_comment_id,content)"+"values(#{postId},#{commenterId},#{refCommentId},#{content})")
    void add(Comment comment);
    //获得评论
    @Select("Select * from comment where post_id=#{postId} ")
    List <Comment> findByPostId(Integer postId);
}
