package com.qa.portal.cv.rest;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CvManagementControllerTest {

    @InjectMocks
    public CvManagementController cvManagementController;

    @Before
    public void setVariables() {
    }


}
