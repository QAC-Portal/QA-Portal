package com.qa.portal.cv.rest;

import com.qa.portal.common.security.QaSecurityContext;
import com.qa.portal.cv.domain.CvVersion;
import com.qa.portal.cv.services.CvManagementService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CvManagementControllerTest {

    @InjectMocks
    public CvManagementController cvManagementController;

    @Mock
    public CvManagementService cvManagementService;
    public QaSecurityContext qaSecurityContext;

    @Test
    public void createCvTest() {
        CvVersion cvVersion = new CvVersion();
        Mockito.when(this.cvManagementService.createCv(cvVersion, qaSecurityContext)).thenReturn(cvVersion);
        assertEquals(this.cvManagementController.createCv(cvVersion).getBody(), cvVersion);
    }

    @Test
    public void updateCvTest() {
        CvVersion cvVersion = new CvVersion();
        Mockito.when(this.cvManagementService.updateCv(cvVersion)).thenReturn(cvVersion);
        assertEquals(this.cvManagementController.updateCv(cvVersion).getBody(), cvVersion);
    }

//    @Test
//    public void

}
