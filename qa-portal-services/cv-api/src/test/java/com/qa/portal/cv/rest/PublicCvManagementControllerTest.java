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

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PublicCvManagementControllerTest {

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
    public PublicCvManagementController publicCvManagementController;

    @Mock
    public CvManagementService cvManagementService;

    @Test
    public void getCvAsPdfPublicTest() throws IOException {
        byte[] bytes = {0, 1};
        Mockito.when(this.cvManagementService.getGeneratedCv(cv1)).thenReturn(bytes);
        assertEquals(bytes, this.publicCvManagementController.getCvAsPdfPublic(cv1).getBody());
        assertEquals(200, this.publicCvManagementController.getCvAsPdfPublic(cv1).getStatusCodeValue());
    }




}
