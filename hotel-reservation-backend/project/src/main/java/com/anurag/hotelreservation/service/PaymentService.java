package com.anurag.hotelreservation.service;
import com.anurag.hotelreservation.entity.Booking;
import com.anurag.hotelreservation.repository.BookingRepository;
import com.anurag.hotelreservation.entity.Payment;
import com.anurag.hotelreservation.enums.PaymentStatus;
import com.anurag.hotelreservation.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    public PaymentService(PaymentRepository paymentRepository,
                          BookingRepository bookingRepository) {

        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    public Payment makePayment(Payment payment) {

        Booking booking = bookingRepository.findById(
                        payment.getBooking().getId())
                .orElseThrow(() ->
                        new RuntimeException("Booking not found"));

        payment.setBooking(booking);

        payment.setPaymentDate(LocalDateTime.now());

        payment.setPaymentStatus(PaymentStatus.SUCCESS);

        return paymentRepository.save(payment);
    }

    public Payment getPaymentById(Long id) {

        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
}