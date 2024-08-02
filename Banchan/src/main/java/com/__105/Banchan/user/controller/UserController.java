package com.__105.Banchan.user.controller;

import com.__105.Banchan.user.domain.User;
import com.__105.Banchan.user.dto.SignupRequestDto;
import com.__105.Banchan.user.dto.UserAptRequestDto;
import com.__105.Banchan.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@Tag(name = "UserController", description = "유저 관련 API")
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/myinfo")
    @Operation(summary = "내 정보 조회", description = "현재 로그인된 사용자의 정보를 반환합니다.")
    public ResponseEntity<User> getMyInfo() {
        User user = userService.getMyInfo();
        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/setmyinfo")
    @Operation(summary = "내 정보 초기 설정", description = "초기 가입시 입력한 정보를 반영합니다.")
    public ResponseEntity<User> setMyInfo(@RequestBody SignupRequestDto signupRequestDto) {
        User user = userService.getMyInfo();
        userService.setMyInfo(user, signupRequestDto);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/check/phone")
    @Operation(summary = "전화번호 중복 확인", description = "전화번호 중복 확인")
    public ResponseEntity<Boolean> checkPhone(@RequestParam String phone) { // 전화번호 하나만 받기 때문에 @PathVariable
        return ResponseEntity.ok().body(userService.checkPhone(phone));
    }

    @PostMapping("/setmyapt")
    @Operation(summary = "아파트 정보 초기 설정", description = "아파트 초기 설정")
    public ResponseEntity<User> setUserAPt(@RequestBody UserAptRequestDto requestDto) {
        User user = userService.getMyInfo();
        userService.setUserApt(user, requestDto);
        return ResponseEntity.ok().body(user);
    }
}
