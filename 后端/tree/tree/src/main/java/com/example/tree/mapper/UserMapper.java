package com.example.tree.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.tree.pojo.User;

@Mapper
public interface  UserMapper {
    //根据id查找用户
    @Select("select * from user where id=#{id}")
    User findById(Integer id);
     //根据用户名查询用户
     @Select("select * from user where username=#{username}")
     User findByUsername(String username);
     //统计user里的元素个数
     @Select ("select count(*) from user")
     Integer countUsers();
     //添加
     @Insert("insert into user(id,username,avatar,last_login,login_days,password,phone_number)"+"values(#{num},#{user.username},#{user.avatar},curdate(),1,#{user.password},#{user.phonenumber})")
     void add(@Param("user")User user,@Param("num")Integer num);
     //更新
     @Update("update user set username=#{username},avatar=#{avatar},last_login=#{lastLogin},login_days=#{loginDays},password=#{password},phone_number=#{phonenumber} where id=#{id}")
     void update(User user);
 }