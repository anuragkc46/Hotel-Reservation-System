package com.anurag.hotelreservation.service;
import com.anurag.hotelreservation.entity.Room;
import com.anurag.hotelreservation.entity.User;
import com.anurag.hotelreservation.enums.BookingStatus;
import com.anurag.hotelreservation.repository.RoomRepository;
import com.anurag.hotelreservation.repository.UserRepository;
import com.anurag.hotelreservation.entity.Booking;
import com.anurag.hotelreservation.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    public BookingService(BookingRepository bookingRepository,
                          RoomRepository roomRepository,
                          UserRepository userRepository) {

        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }


    public Booking createBooking(Booking booking) {

        User user = userRepository.findById(booking.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Room room = roomRepository.findById(booking.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (!room.getAvailable()) {
            throw new RuntimeException("Room is already booked.");
        }

        if (booking.getCheckOutDate().isBefore(booking.getCheckInDate())) {
            throw new RuntimeException("Check-out date must be after check-in date.");
        }

        room.setAvailable(false);
        roomRepository.save(room);

        booking.setUser(user);
        booking.setRoom(room);
        booking.setStatus(BookingStatus.CONFIRMED);

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public void cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Room room = booking.getRoom();

        room.setAvailable(true);

        roomRepository.save(room);

        bookingRepository.delete(booking);
    }
}