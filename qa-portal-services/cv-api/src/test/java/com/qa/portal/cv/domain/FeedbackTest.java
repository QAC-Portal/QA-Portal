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
public class FeedbackTest {

    @InjectMocks
    public Feedback feedback;

    @Before
    public void setVariables() {
        feedback.setReviewer("Tom Bennett");
        feedback.setDate("2019-12-11");
        feedback.setComment("comment");
    }

    @Test
    public void getReviewerTest() {
        assertEquals("getReviewer() returning an unexpected result",
                "Tom Bennett",
                feedback.getReviewer());
    }

    @Test
    public void getDateTest() {
        assertEquals("getDate() returning an unexpected result",
                "2019-12-11",
                feedback.getDate());
    }

    @Test
    public void getComment() {
        assertEquals("getComment() returning an unexpected result",
                "comment",
                feedback.getComment());
    }
}
