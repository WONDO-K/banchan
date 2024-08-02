package com.__105.Banchan.vote.repository;

import com.__105.Banchan.vote.Entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VoteRepository extends JpaRepository<Vote, Long> {

    @Query(value = "select v.* from vote v where v.id in " +
            "(select vp.vote_id from vote_participant vp where vp.user_id = :userId)", nativeQuery = true)
    List<Vote> findVotesByUserId(@Param("userId") Long userId);
}
