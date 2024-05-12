package com.example.tree.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.example.tree.pojo.Attachment;

@Mapper
public interface AttachmentMapper {
    //获取附件
    @Select("select * from attachment where post_id=#{postId}")
    List <Attachment> findByPostId(Integer postId);
    //统计个数
    @Select("select count(*) from attachment")
    Integer countAttachments();
    //新增
    @Insert("insert into attachment(id,post_id,imageUrl)"+"values(#{num},#{attachment.postId},#{attachment.imageUrl})")
    void add(@Param("attachment")Attachment attachment,@Param("num")Integer num);
}
