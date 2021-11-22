package com.guidelk.tourism.repository;

import com.guidelk.tourism.entity.BookingNumberConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingNumberConfigRepository extends JpaRepository<BookingNumberConfig, Integer> {
    BookingNumberConfig findByPrefixAndStatus(String prefix, Integer status);
}
