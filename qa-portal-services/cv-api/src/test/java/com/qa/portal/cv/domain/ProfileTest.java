package com.qa.portal.cv.domain;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProfileTest {

    @InjectMocks
    public Profile profile;

    @Before
    public void setVariables() {
        profile.setProfileDetails("some details about a profile");
    }

    @Test
    public void getProfileDetailsTest() {
        assertEquals("getProfileDetails() returning an unexpected result",
                "some details about a profile",
                profile.getProfileDetails());
    }


}
