package com.__105.Banchan.vote.service;

import com.__105.Banchan.user.entity.User;
import com.__105.Banchan.user.enums.Role;
import com.__105.Banchan.user.repository.UserRepository;
import com.__105.Banchan.vote.Dto.*;
import com.__105.Banchan.vote.Entity.*;
import com.__105.Banchan.vote.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoteServiceImpl implements VoteService {

    private final VoteRepository voteRepository;
    private final UserRepository userRepository;
    private final VoteQuestionRepository voteQuestionRepository;
    private final VoteOptionRepository voteOptionRepository;
    private final VoteParticipantRepository voteParticipantRepository;
    private final VoteResultRepository voteResultRepository;

    /*
    * 새로운 투표를 생성하고, 해당 투표의 문항, 선택지 및 참가자를 저장하는 메서드입니다.
    * 한 투표에는 여러 문항이 포함될 수 있고, 한 문항에는 객관식으로 여러 선택지가 있을 수 있음
    * voteRequestDto : 투표 세부 정보를 포함하는 DTO
    * 투표 범위 지정의 로직은 아직 구현하지 않았고, 추후에 투표 생성자(아파트 관리자)의 아파트 코드를
    * 참조하여 투표 범위를 아파트 관리자의 아파트 코드의 주민들로 지정할 예정입니다.
    * */
    @Transactional
    @Override
    public void createVote(VoteRequestDto voteRequestDto, String username) {

        User user = findUserByUsername(username);

        if (user.getRole() != Role.ADMIN) {
            throw new RuntimeException("Only ADMIN users can regist");
        }

        Vote vote = Vote.builder()
                .createdUser(user)
                .title(voteRequestDto.getTitle())
                .content(voteRequestDto.getContent())
                .imageUrl(voteRequestDto.getImageUrl())
                .startDate(voteRequestDto.getStartDate())
                .endDate(voteRequestDto.getEndDate())
                .build();
        voteRepository.save(vote);

        for (VoteRequestDto.QuestionDto questionDto : voteRequestDto.getQuestions()) {
            VoteQuestion voteQuestion = VoteQuestion.builder()
                    .vote(vote)
                    .questionText(questionDto.getQuestionText())
                    .build();

            voteQuestionRepository.save(voteQuestion);

            for (String optionText : questionDto.getOptions()) {
                VoteOption voteOption = VoteOption.builder()
                        .voteQuestion(voteQuestion)
                        .optionText(optionText)
                        .build();

                voteOptionRepository.save(voteOption);
            }
        }

        List<User> users = userRepository.findUsersInSameApartment(user.getId());

        for (User user1 : users) {
            VoteParticipant voteParticipant = VoteParticipant.builder()
                    .vote(vote)
                    .user(user1)
                    .build();

            voteParticipantRepository.save(voteParticipant);
        }
    }

    /*
    * 투표 정보 상세 조회
    * */
    @Override
    public VoteResponseDto getVoteWithDetails(Long voteId) {
        Vote vote = voteRepository.findById(voteId)
                .orElseThrow(() -> new RuntimeException("Invalid vote ID"));
        return new VoteResponseDto(vote);
    }

    /*
     * 투표 Id를 통해서 투표의 상세 정보를 response
     * @ManyToOne 양방향 매핑을 이용하여 조회 쿼리 실행
     * LAZY를 이용하여 한 번 select 쿼리 실행됨.
     * */
    @Override
    public List<VoteListResponseDto> getCurrentVoteList(String username) {

        User user = findUserByUsername(username);
        LocalDateTime currentDate = LocalDateTime.now();
        List<Vote> votes = voteParticipantRepository.findVotesByUserId(user.getId(), currentDate);

        return votes.stream()
                .map(VoteListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Override
    public List<VoteListResponseDto> getlistFinished(String username) {

        User user = findUserByUsername(username);
        LocalDateTime currentDate = LocalDateTime.now();
        List<Vote> votes = voteParticipantRepository.findDoneVotesByUserId(user.getId(), currentDate);
        return votes.stream()
                .map(VoteListResponseDto::new)
                .collect(Collectors.toList());
    }

    /*
     * 투표진행 시 : 어떠한 유저(user_id)가 어떤 투표(vote_id)에
     *            어떠한 질문(question_id)의 어떠한 선택지(option_id)애
     *            투표를 했는지에 대한 여부 저장
     * DoVoteRequestDto 클래스를 이용하여 Post 방식으로 서버에 전달하여 투표를 처리하며
     * 아래 비지니스 로직에서 해당 vote_id에 해당하는 user가 아닌 경우 Bad Request 처리
     * */
    @Transactional
    @Override
    public void vote(DoVoteRequestDto doVoteRequestDto, String username) {

        User user = findUserByUsername(username);

        Long voteId = doVoteRequestDto.getVoteId();

        System.out.println(voteId);

        Vote vote = voteRepository.findById(voteId)
                .orElseThrow(() -> new RuntimeException("Invalid vote ID"));

        VoteParticipantId vpId = new VoteParticipantId(vote.getId(), user.getId());

        if (!voteParticipantRepository.existsById(vpId)) {
            throw new RuntimeException("Vote participant does not exist");
        }

        List<DoVoteRequestDto.ResponseDto> responseDtos = doVoteRequestDto.getResponses();

        for (DoVoteRequestDto.ResponseDto responseDto : responseDtos) {
            VoteQuestion question = voteQuestionRepository.findById(responseDto.getQuestionId())
                    .orElseThrow(() -> new RuntimeException("Invalid question ID"));
            VoteOption option = voteOptionRepository.findById(responseDto.getOptionId())
                    .orElseThrow(() -> new RuntimeException("Invalid option ID"));
            VoteResult result = VoteResult.builder()
                    .vote(vote)
                    .user(user)
                    .voteQuestion(question)
                    .voteOption(option)
                    .build();

            voteResultRepository.save(result);
        }
    }

    /*
    * 투표 결과 조회
    * 투표 조회 결과는 VoteResultResponseDto를 생성하여 Response 하며
    * 투표 결과는 집계함수 및 카운팅 함수를 사용하고 0인 컬럼까지 조회하므로 left join을 사용하는 복잡한 쿼리이므로
    * Object 배열을 반환하는 네이티브 쿼리 (직접 SQL 작성)으로 구현하였고 아래 비지니스 로직을 통하여
    * VoteResultResponseDto 객체에 알맞게 매핑하여 반환하는 코드
    * */
    @Transactional
    @Override
    public VoteResultDto getResult(Long voteId) {

        Vote vote = voteRepository.findById(voteId)
                .orElseThrow(() -> new RuntimeException("Invalid vote ID"));

        List<VoteQuestion> voteQuestions = vote.getQuestions();

        List<VoteResultDto.QuestionResultDto> questionResults = voteQuestions.stream()
                .map(question -> {
                    List<Object[]> optionResults = voteResultRepository.findVoteCountsByQuestionId(question.getId());
                    List<VoteResultDto.OptionResultDto> optionResultDtos = optionResults.stream()
                            .map(result -> new VoteResultDto.OptionResultDto(
                                    ((Number) result[0]).longValue(),
                                    (String) result[1],
                                    ((Number) result[2]).longValue()
                            ))
                            .collect(Collectors.toList());

                    return new VoteResultDto.QuestionResultDto(
                            question.getId(),
                            question.getQuestionText(),
                            optionResultDtos
                    );
                })
                .collect(Collectors.toList());

        return new VoteResultDto(vote.getId(), questionResults);
    }

    private User findUserByUsername(String username) {

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid username"));
    }
}
