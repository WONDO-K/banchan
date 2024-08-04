package com.__105.Banchan.user.repository;

import com.__105.Banchan.user.entity.User;
import com.__105.Banchan.user.entity.UserApartment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAptRepository extends JpaRepository<UserApartment, Integer> {

    Optional<UserApartment> findByUser(User user);
}
