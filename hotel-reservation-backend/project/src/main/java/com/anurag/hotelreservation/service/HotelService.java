package com.anurag.hotelreservation.service;

import com.anurag.hotelreservation.entity.Hotel;
import com.anurag.hotelreservation.repository.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    private final HotelRepository hotelRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public Hotel addHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));
    }

    public Hotel updateHotel(Long id, Hotel updatedHotel) {

        Hotel hotel = getHotelById(id);

        hotel.setHotelName(updatedHotel.getHotelName());
        hotel.setAddress(updatedHotel.getAddress());
        hotel.setCity(updatedHotel.getCity());
        hotel.setState(updatedHotel.getState());
        hotel.setCountry(updatedHotel.getCountry());
        hotel.setRating(updatedHotel.getRating());

        return hotelRepository.save(hotel);
    }

    public void deleteHotel(Long id) {
        hotelRepository.deleteById(id);
    }
}