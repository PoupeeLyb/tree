package com.example.tree.pojo;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class UserRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @JsonProperty("user_id")
    private Integer userId;

    
    @JsonProperty("related_user_id")
    private Integer relatedUserId;

    @JsonProperty("relation_type")
    @Enumerated(EnumType.STRING)
    private RelationType relationType;

    // Getters and setters
}
