package com.__105.Banchan.vote.repository;

import com.__105.Banchan.vote.Entity.Vote;
import com.__105.Banchan.vote.Entity.VoteParticipant;
import com.__105.Banchan.vote.Entity.VoteParticipantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface VoteParticipantRepository extends JpaRepository<VoteParticipant, VoteParticipantId> {

    @Query("select vp.vote from VoteParticipant vp " +
            "where vp.user.id = :userId " +
            "and :currentDate between vp.vote.startDate and vp.vote.endDate " +
            "order by vp.vote.id desc")
    List<Vote> findVotesByUserId(@Param("userId") Long userId, @Param("currentDate") LocalDateTime currentDate);

    @Query("select vp.vote from VoteParticipant vp " +
            "where vp.user.id = :userId " +
            "and :currentDate >= vp.vote.endDate " +
            "order by vp.vote.id desc")
    List<Vote> findDoneVotesByUserId(@Param("userId") Long userId, @Param("currentDate") LocalDateTime currentDate);
}
