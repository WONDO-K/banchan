package com.__105.Banchan.user.repository;

import com.__105.Banchan.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhone(String phone);

    Boolean existsByUsername(String username);

    @Query("SELECT ua2.user FROM UserApartment ua1 " +
            "JOIN UserApartment ua2 ON ua1.apartment.code = ua2.apartment.code " +
            "WHERE ua1.user.id = :userId AND ua2.user.id != :userId")
    List<User> findUsersInSameApartment(@Param("userId") Long userId);
}
