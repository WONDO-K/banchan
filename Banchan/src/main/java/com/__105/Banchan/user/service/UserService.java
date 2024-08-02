package com.__105.Banchan.user.service;

import com.__105.Banchan.user.domain.User;
import com.__105.Banchan.user.dto.SignupRequestDto;
import com.__105.Banchan.user.dto.UserAptRequestDto;

import java.util.Optional;

public interface UserService {
    User getMyInfo();

    boolean checkPhone(String phone);

    void setMyInfo(User user, SignupRequestDto signupRequestDto);

    void setUserApt(User user, UserAptRequestDto requestDto);
}
