package com.__105.Banchan.auth.dto;

import com.__105.Banchan.user.enums.Role;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class SecurityUserDto {
    private Long id;          // User 도메인의 id와 일치
    private String email;
    private String username;
    private Role role;
}