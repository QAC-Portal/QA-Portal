package com.qa.portal.cv.rest;

import com.qa.portal.common.security.QaSecurityContext;
import com.qa.portal.cv.domain.CvSearchCriteria;
import com.qa.portal.cv.domain.CvVersion;
import com.qa.portal.cv.services.CvManagementService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.ArgumentMatchers;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CvManagementControllerTest {

    private CvVersion cv1 = new CvVersion();
    private CvVersion cv2 = new CvVersion();
    private List<CvVersion> cvs = new ArrayList<>();

    @Before
    public void initialiseCv() {
        cv1.setFullName("Steve Roddy");
        cv1.setId("1234567890");

        cv2.setFullName("John Smith");
        cv2.setId("0987654321");

        cvs.add(cv1);
        cvs.add(cv2);


    }

    @InjectMocks
    public CvManagementController cvManagementController;

    @Mock
    public CvManagementService cvManagementService;

    @Mock
    public QaSecurityContext qaSecurityContext;


    @Test
    public void createCvTest() {
        Mockito.when(this.cvManagementService.createCv(cv1, qaSecurityContext)).thenReturn(cv1);
        assertEquals(this.cvManagementController.createCv(cv1).getBody(), cv1);
        assertEquals(200, this.cvManagementController.createCv(cv1).getStatusCodeValue());
    }

    @Test
    public void updateCvTest() {
        Mockito.when(this.cvManagementService.updateCv(cv1)).thenReturn(cv1);
        assertEquals(this.cvManagementController.updateCv(cv1).getBody(), cv1);
        assertEquals(200, this.cvManagementController.updateCv(cv1).getStatusCodeValue());
    }

    @Test
    public void getCvByIdTest() {
        Mockito.when(this.cvManagementService.findById("1234567890")).thenReturn(cv1);
        assertEquals(this.cvManagementController.getCvById("1234567890").getBody(), cv1);
        assertEquals(200, this.cvManagementController.getCvById("1234567890").getStatusCodeValue());
    }

    @Test
    public void getAllTest() {
        Mockito.when(this.cvManagementService.getAll()).thenReturn(cvs);
        assertEquals(this.cvManagementController.getAll().getBody(), cvs);
        assertEquals(200, this.cvManagementController.getAll().getStatusCodeValue());
    }

    @Test
    public void findByFullNameIgnoreCaseTest() {
        List<CvVersion> matches = new ArrayList<>();
        matches.add(cv1);
        Mockito.when(this.cvManagementService.findByFullNameIgnoreCase("Steve Roddy"))
                .thenReturn(matches);
        assertTrue(Objects.requireNonNull(this.cvManagementController.findByFullNameIgnoreCase("Steve Roddy").getBody()).contains(cv1));
        assertEquals(200, this.cvManagementController.findByFullNameIgnoreCase("Steve Roddy").getStatusCodeValue());
    }

    @Test
    public void findCvVersionsForTraineeTest() {
        Mockito.when(this.cvManagementService.findByUserNameIgnoreCase(null))
                .thenReturn(cvs);
        assertTrue(Objects.requireNonNull(this.cvManagementController.findCvVersionsForTrainee().getBody()).contains(cv1));
        assertEquals(200, this.cvManagementController.findCvVersionsForTrainee().getStatusCodeValue());
    }

    @Test
    public void findCurrentCvVersionForTraineeTest() {
        Mockito.when(this.cvManagementService.getCurrentCvVersionForUser(ArgumentMatchers.any()))
                .thenReturn(cv1);
        assertEquals(this.cvManagementController.findCurrentCvVersionForTrainee().getBody(), cv1);
        assertEquals(200, this.cvManagementController.findCurrentCvVersionForTrainee().getStatusCodeValue());
    }

    @Test
    public void cvSearchTest() {
        Mockito.when(this.cvManagementService.cvSearch(ArgumentMatchers.any(CvSearchCriteria.class))).thenReturn(cvs);
        assertEquals(cvs, this.cvManagementController.cvSearch("cohort", "tech", "status", "Steve Roddy").getBody());
    }

}
