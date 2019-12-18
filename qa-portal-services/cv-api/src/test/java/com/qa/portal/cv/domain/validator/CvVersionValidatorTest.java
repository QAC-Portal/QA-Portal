package com.qa.portal.cv.domain.validator;

import com.qa.portal.common.exception.QaPortalBusinessException;
import com.qa.portal.cv.mocks.MockCvs;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
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

    @Test
    public void validateCvVersionTest2222() {


    }

    @Test(expected = QaPortalBusinessException.class)
    public void validateCvVersionTest() {
        cvVersionValidator.validateCvVersion(cvs.getCv2());
    }




}
