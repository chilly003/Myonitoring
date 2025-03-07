package com.myaicrosoft.myonitoring.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "devices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY 전략 사용
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false) // 외래 키 이름 지정
    private User user;

    @OneToOne(mappedBy = "device", cascade = CascadeType.ALL)
    private Cat cat;

    @Column(nullable = false)
    private LocalDate registrationDate;

    @Column(length = 100, nullable = false, unique = true)
    private String serialNumber;

    @PrePersist
    public void prePersist() {
        this.registrationDate = (this.registrationDate == null) ? LocalDate.now() : this.registrationDate;
    }
}