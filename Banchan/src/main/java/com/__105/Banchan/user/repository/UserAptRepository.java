package com.__105.Banchan.user.repository;

import com.__105.Banchan.user.domain.User;
import com.__105.Banchan.user.domain.UserApartment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAptRepository extends JpaRepository<UserApartment, Integer> {

    Optional<UserApartment> findByUser(User user);
}
