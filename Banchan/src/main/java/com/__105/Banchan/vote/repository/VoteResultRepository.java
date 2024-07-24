package com.__105.Banchan.vote.repository;

import com.__105.Banchan.vote.Entity.VoteResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoteResultRepository extends JpaRepository<VoteResult, Long> {

    @Query(value = "SELECT vo.id as option_id, vo.option_text, " +
            "COALESCE(COUNT(vr.id), 0) as vote_count " +
            "FROM vote_option vo " +
            "LEFT JOIN vote_result vr ON vo.id = vr.option_id " +
            "WHERE vo.question_id = :questionId " +
            "GROUP BY vo.id, vo.option_text", nativeQuery = true)
    List<Object[]> findVoteCountsByQuestionId(@Param("questionId") Long questionId);
}
