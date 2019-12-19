package com.qa.portal.cv.domain.validator;

import com.qa.portal.common.exception.QaPortalBusinessException;
import com.qa.portal.cv.mocks.MockCvs;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.Environment;
import org.springframework.test.context.junit4.SpringRunner;


@RunWith(SpringRunner.class)
@SpringBootTest
public class CvVersionValidatorTest {

    private MockCvs cvs = new MockCvs();

    @Mock
    private Environment environment;

    @InjectMocks
    private CvVersionValidator cvVersionValidator = new CvVersionValidator(environment);

    @Before
    public void prepare() {
        Mockito.when(environment.getProperty("cv.profile.detail.max")).thenReturn("1000000001");
        Mockito.when(environment.getProperty("cv.hobbies.detail.max")).thenReturn("1000000001");
        Mockito.when(environment.getProperty("cv.workexperience.entries.max")).thenReturn("1000000001");
        Mockito.when(environment.getProperty("cv.workexperience.detail.max")).thenReturn("1000000001");
        Mockito.when(environment.getProperty("cv.qualification.entries.max")).thenReturn("1000000001");
        Mockito.when(environment.getProperty("cv.qualification.detail.max")).thenReturn("1000000001");
    }


    @Test(expected = QaPortalBusinessException.class)
    public void validateProfileDetailTest() {
        Mockito.when(environment.getProperty("cv.profile.detail.max")).thenReturn("1");
        cvVersionValidator.validateCvVersion(cvs.getCv2());
    }

    @Test(expected = QaPortalBusinessException.class)
    public void validateHobbiesDetailTest() {
        Mockito.when(environment.getProperty("cv.hobbies.detail.max")).thenReturn("1");
        cvVersionValidator.validateCvVersion(cvs.getCv2());
    }


    @Test(expected = QaPortalBusinessException.class)
    public void validateWorkExperienceEntriesTest() {
        Mockito.when(environment.getProperty("cv.workexperience.entries.max")).thenReturn("1");
        cvVersionValidator.validateCvVersion(cvs.getCv2());
    }

    @Test(expected = QaPortalBusinessException.class)
    public void validateWorkExperienceDetailTest() {
        Mockito.when(environment.getProperty("cv.workexperience.detail.max")).thenReturn("1");
        cvVersionValidator.validateCvVersion(cvs.getCv2());
    }

    @Test(expected = QaPortalBusinessException.class)
    public void validateQualificationEntriesTest() {
        Mockito.when(environment.getProperty("cv.qualification.entries.max")).thenReturn("1");
        cvVersionValidator.validateCvVersion(cvs.getCv2());
    }

    @Test(expected = QaPortalBusinessException.class)
    public void validateQualificationDetailTest() {
        Mockito.when(environment.getProperty("cv.qualification.detail.max")).thenReturn("1");
        cvVersionValidator.validateCvVersion(cvs.getCv2());
    }

}