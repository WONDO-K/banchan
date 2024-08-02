package com.__105.Banchan.vote.Dto;

import com.__105.Banchan.vote.Entity.Vote;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/*
* 투표 리스트를 response하기 위한 DTO 클래스
* VoteResponseDto를 통해 response를 한다면 필요없는 조인을 실행하게 됨.
* 나머지 컬럼의 경우 모두 Fetch -> LAZY로 설정하여 필요한 쿼리문 1개만 실행하게 됨.
* */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VoteListResponseDto {

    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private LocalDateTime createdAt;

    public VoteListResponseDto(Vote vote) {

        this.id = vote.getId();
        this.title = vote.getTitle();
        this.content = vote.getContent();
        this.imageUrl = vote.getImageUrl();
        this.startDate = vote.getStartDate();
        this.endDate = vote.getEndDate();
        this.createdAt = vote.getCreatedAt();
    }
}
