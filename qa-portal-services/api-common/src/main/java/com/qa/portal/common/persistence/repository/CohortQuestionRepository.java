package com.qa.portal.common.persistence.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qa.portal.common.persistence.entity.QaCohortEntity;
import com.qa.portal.common.persistence.entity.CohortQuestionEntity;

@Repository
public interface CohortQuestionRepository extends JpaRepository<CohortQuestionEntity, Integer> {

    public Set<CohortQuestionEntity> findByCohort(QaCohortEntity cohort);
}