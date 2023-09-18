package com.ssafy.moa.api.data;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Locale;

@Component
public class LevelDataInitializer implements CommandLineRunner {

    @PersistenceContext
    private EntityManager entityManager;


    @Transactional
    @Override
    public void run(String... args) throws Exception {
        if(checkIfInitialDataExists()) {
            insertInitialData();
        }
    }

    private boolean checkIfInitialDataExists() {
        Long count = (Long) entityManager.createQuery("SELECT COUNT(1) FROM Level l").getSingleResult();
        return count == 0;
    }

    private void insertInitialData() {

        // 19개의 초기 데이터를 삽입하는 쿼리문
        String insertQuery =
                "INSERT INTO level (required_exp, level_name, level_grade) VALUES " +
                        "(100, '건', 1), (200, '건', 2), (300, '건', 3), (400, '곤', 1), (500, '곤', 2), " +
                        "(600, '곤', 3), (700, '곤', 4), (800, '감', 1), (900, '감', 2), (1000, '감', 3), " +
                        "(1100, '감', 4), (1200, '감', 5), (1300, '리', 1), (1400, '리', 2), (1500, '리', 3), " +
                        "(1600, '리', 4), (1700, '리', 5), (1800, '리', 6), (1900, '태극', 1)";

        entityManager.createNativeQuery(insertQuery).executeUpdate();

    }
}
