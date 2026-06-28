package com.anurag.hotelreservation.repository;

import com.anurag.hotelreservation.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

}