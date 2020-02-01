package com.qa.portal.cv.mocks;

import com.qa.portal.cv.domain.WorkExperience;

import java.util.ArrayList;
import java.util.List;

public class MockAllWorkExperience {

    private List<WorkExperience> work1 = new ArrayList<>();
    private List<WorkExperience> work2 = new ArrayList<>();

    private MockFeedback feedback = new MockFeedback();

    public MockAllWorkExperience() {
        WorkExperience w1 = new WorkExperience();
        w1.setJobTitle("Consultant");
        w1.setWorkExperienceDetails("some details about work experience");
        w1.setWorkExperienceFeedback(feedback.getFeedbackList());
        work1.add(w1);
        work2.add(w1);
        work2.add(w1);


        WorkExperience w2 = new WorkExperience();
        w2.setJobTitle("Lab assistant");
        w2.setWorkExperienceDetails("some details about work experience");
        w2.setWorkExperienceFeedback(feedback.getFeedbackList());
        work1.add(w2);

        WorkExperience w3 = new WorkExperience();
        w3.setJobTitle("Sandwich architect");
        w3.setWorkExperienceDetails(setLimitExceedingWorkExperience());
        w3.setWorkExperienceFeedback(feedback.getFeedbackList());
        work2.add(w3);
        work2.add(w3);
    }

    private String setLimitExceedingWorkExperience() {
        StringBuilder details = new StringBuilder("a");
        while (details.length() < 1000000) {
            details.append("a");
        }
        return details.toString();
    }

    public List<WorkExperience> getWork1() {
        return work1;
    }

    public List<WorkExperience> getWork2() {
        return work2;
    }
}
