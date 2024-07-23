package com.__105.Banchan.user.service;

import com.__105.Banchan.user.domain.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
}
