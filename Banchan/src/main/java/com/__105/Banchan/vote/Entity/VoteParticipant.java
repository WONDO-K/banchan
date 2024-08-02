package com.__105.Banchan.vote.Entity;

import com.__105.Banchan.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vote_participant")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class VoteParticipant {

    @EmbeddedId
    private VoteParticipantId id;

    @ManyToOne
    @MapsId("vote")
    @JoinColumn(name = "vote_id")
    private Vote vote;

    @ManyToOne
    @MapsId("user")
    @JoinColumn(name = "user_id")
    private User user;
}
