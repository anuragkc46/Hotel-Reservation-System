package com.anurag.hotelreservation.repository;

import com.anurag.hotelreservation.entity.Room;
import com.anurag.hotelreservation.enums.RoomCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByCategory(RoomCategory category);

    List<Room> findByAvailableTrue();
    List<Room> findByHotelIdOrderByRoomNumberAsc(Long hotelId);
}