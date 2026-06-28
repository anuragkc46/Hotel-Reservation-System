package com.anurag.hotelreservation.controller;

import com.anurag.hotelreservation.entity.Hotel;
import com.anurag.hotelreservation.service.HotelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    private final HotelService hotelService;

    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @PostMapping
    public Hotel addHotel(@RequestBody Hotel hotel) {
        return hotelService.addHotel(hotel);
    }

    @GetMapping
    public List<Hotel> getAllHotels() {

        List<Hotel> hotels = hotelService.getAllHotels();

        hotels.forEach(h ->
                System.out.println(
                        h.getHotelName() + " -> " + h.getImageUrl()
                )
        );

        return hotels;
    }
}