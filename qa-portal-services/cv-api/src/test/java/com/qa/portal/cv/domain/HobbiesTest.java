package com.qa.portal.cv.domain;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HobbiesTest {

    private MockFeedbackList feedback = new MockFeedbackList();

    @InjectMocks
    public Hobbies hobbies;

    @Before
    public void setVariables() {
        hobbies.setHobbiesFeedback(feedback.getFeedbackList());

        hobbies.setHobbiesDetails("some data about hobbies");

    }

    @Test
    public void getHobbiesFeedbackTest() {
        assertEquals("getHobbiesFeedback() returning an unexpected result",
                feedback.getFeedbackList(),
                hobbies.getHobbiesFeedback());
        assertEquals("Feedback list incorrectly sized",
                3,
                hobbies.getHobbiesFeedback().size());
    }

    @Test
    public void getHobbiesDetailsTest() {
        assertEquals("getHobbiesDetails() returning unexpected result", "some data about hobbies", hobbies.getHobbiesDetails());
    }


}
