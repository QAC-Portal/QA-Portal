package com.qa.portal.cv.domain;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class QualificationTest {

    private MockFeedbackList feedback = new MockFeedbackList();

    @InjectMocks
    public Qualification qualification;

    @Before
    public void setVariables() {
        qualification.setQualificationFeedback(feedback.getFeedbackList());
        qualification.setQualificationDetails("some qualification details");
    }

    @Test
    public void getQualificationFeedbackTest() {
        assertEquals("getQualificationFeedback() returning an unexpected value",
                feedback.getFeedbackList(),
                qualification.getQualificationFeedback());
        assertEquals("Feedback list incorrectly sized",
                3,
                qualification.getQualificationFeedback().size());
    }

    @Test
    public void getQualificationDetailsTest() {
        assertEquals("getQualificationDetails() returning unexpected value",
                "some qualification details",
                qualification.getQualificationDetails());
    }

    @Test
    public void toStringTest() {
        assertEquals("toString() returning an unexpected result",
                "Qualification [qualificationDetails=some qualification details, qualificationFeedback=" + feedback.getFeedbackList() + "]",
                qualification.toString());
    }

}
