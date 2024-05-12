package com.example.tree.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "commenter_id", referencedColumnName = "id")
    private User commenter;

    private String content;

    @JsonProperty("ref_comment")
    @ManyToOne
    @JoinColumn(name = "ref_comment_id", referencedColumnName = "id")
    private Comment refComment;

    // Getters and setters
}

