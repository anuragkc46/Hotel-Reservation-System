package com.anurag.hotelreservation.repository;

import com.anurag.hotelreservation.entity.Booking;
import com.anurag.hotelreservation.entity.User;
import com.anurag.hotelreservation.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(User user);

    boolean existsByRoomIdAndStatus(Long roomId, BookingStatus status);



}