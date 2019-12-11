package com.qa.portal.cv.domain;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HobbiesTest {

    private Feedback f1 = new Feedback();
    private Feedback f2 = new Feedback();
    private List<Feedback> feedback = new ArrayList<>();

    @InjectMocks
    public Hobbies hobbies;

    @Before
    public void setVariables() {
        f1.setReviewer("Dan Ryan");
        f1.setDate("2019-11-12");
        f1.setComment("feedback 1");

        f2.setReviewer("Steve Roddy");
        f2.setDate("1972-06-30");
        f2.setComment("feedback 2");

        feedback.add(f1);
        feedback.add(f2);
        hobbies.setHobbiesFeedback(feedback);

        hobbies.setHobbiesDetails("some data about hobbies");

    }

    @Test
    public void getHobbiesFeedbackTest() {
        assertEquals("getHobbiesFeedback() returning an unexpected result",
                feedback,
                hobbies.getHobbiesFeedback());
        assertEquals("Feedback list incorrectly sized",
                2,
                hobbies.getHobbiesFeedback().size());
    }

    @Test
    public void getHobbiesDetailsTest() {
        assertEquals("getHobbiesDetails() returning unexpected result", "some data about hobbies", hobbies.getHobbiesDetails());
    }


}
