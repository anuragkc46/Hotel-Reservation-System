package com.anurag.hotelreservation.repository;

import com.anurag.hotelreservation.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}