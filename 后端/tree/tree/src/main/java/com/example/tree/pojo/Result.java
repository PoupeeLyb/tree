package com.example.tree.pojo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {
    private  Integer code;//0 成功，1 失败
    private  String  message;//提示信息
    private T data;//响应数据

    //返回操作成功响应成果（带响应数据）
    public static <E> Result<E> success (E data){return new Result<>(0,"操作成功",data);}
    //返回操作成功响应成果(不带数据)
    public static Result success(){return new Result<>(0,"操作成功",null);}
    //返回操作失败响应成果
    public static Result error(String message){return new Result<>(1,message,null);}
}
