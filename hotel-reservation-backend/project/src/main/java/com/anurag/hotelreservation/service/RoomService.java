package com.anurag.hotelreservation.service;

import com.anurag.hotelreservation.entity.Room;
import com.anurag.hotelreservation.enums.RoomCategory;
import com.anurag.hotelreservation.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public Room addRoom(Room room) {
        return roomRepository.save(room);
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByAvailableTrue();
    }

    public List<Room> getRoomsByCategory(RoomCategory category) {
        return roomRepository.findByCategory(category);
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }

    public List<Room> getRoomsByHotel(Long hotelId) {
        return roomRepository.findByHotelIdOrderByRoomNumberAsc(hotelId);
    }

    public Room updateRoom(Long id, Room updatedRoom) {

        Room room = getRoomById(id);

        room.setRoomNumber(updatedRoom.getRoomNumber());
        room.setCategory(updatedRoom.getCategory());
        room.setPricePerNight(updatedRoom.getPricePerNight());
        room.setCapacity(updatedRoom.getCapacity());
        room.setDescription(updatedRoom.getDescription());
        room.setAvailable(updatedRoom.getAvailable());
        room.setHotel(updatedRoom.getHotel());

        return roomRepository.save(room);
    }

    public void deleteRoom(Long id) {
        roomRepository.deleteById(id);
    }
}