package com.__105.Banchan.user.service.impl;

import com.__105.Banchan.user.domain.User;
import com.__105.Banchan.user.repository.UserRepository;
import com.__105.Banchan.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
