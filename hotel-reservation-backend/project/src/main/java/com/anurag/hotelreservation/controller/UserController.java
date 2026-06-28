package com.anurag.hotelreservation.controller;

import com.anurag.hotelreservation.dto.request.UserRequest;
import com.anurag.hotelreservation.dto.response.UserResponse;
import com.anurag.hotelreservation.entity.User;
import com.anurag.hotelreservation.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserResponse registerUser(@Valid @RequestBody UserRequest request) {

        return userService.registerUser(request);

    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}