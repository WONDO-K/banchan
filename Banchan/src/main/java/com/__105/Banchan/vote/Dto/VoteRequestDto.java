package com.__105.Banchan.vote.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VoteRequestDto {

    private String title;
    private String content;
    private String imageUrl;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<QuestionDto> questions;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class QuestionDto {

        private String questionText;

        private List<String> options;
    }
}
