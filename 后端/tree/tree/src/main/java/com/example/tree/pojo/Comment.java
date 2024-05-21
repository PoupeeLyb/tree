package com.example.tree.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("post_id")
    private Integer postId;

    @JsonProperty("commenter_id")
    private Integer commenterId;

    @JsonProperty("content")
    private String content;

    @JsonProperty("ref_comment_id")
    private Integer refCommentId;

    // Getters and setters
}

