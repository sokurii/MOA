package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Foreigner;
import com.ssafy.moa.api.entity.key.ForeignerKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForeignerRepository extends JpaRepository<Foreigner, ForeignerKey> {
    Optional<Foreigner> findByForeignerKey(ForeignerKey foreignerKey);
}
