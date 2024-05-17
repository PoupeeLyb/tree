package com.example.tree.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.example.tree.pojo.UserRelation;

@Mapper
public interface UserRelationMapper {
    @Delete("delete from userrelation where user_id=#{userId} and related_user_id=#{relatedUserId} and relation_type='FOLLOW' ")
    //删除关注的人
    void deleteFollow(Integer userId,Integer relatedUserId);
    @Delete("delete from userrelation where user_id=#{userId} and related_user_id=#{relatedUserId} and relation_type='BE_FOLLOWED' ")
    void deleteFans(Integer userId,Integer relatedUserId);
    //找到关注的人
    @Select("select related_user_id from userrelation where user_id=#{userId} and relation_type='FOLLOW' ")
    List <Integer> findFollow(Integer userId);
    //找到粉丝
    @Select("select related_user_id from userrelation where user_id=#{userId} and relation_type='BE_FOLLOWED' ")
    List <Integer> findFans(Integer userId);
     //统计userrelation里的元素个数
     @Select ("select count(*) from userrelation")
     Integer countUserRalations();
    //添加
    @Insert("insert into userrelation(user_id,relation_type,related_user_id)"+"values(#{userRelation.userId},#{userRelation.relationType},#{userRelation.relatedUserId})")
    void add(@Param("userRelation")UserRelation userRelation,@Param("num")Integer num);
}
