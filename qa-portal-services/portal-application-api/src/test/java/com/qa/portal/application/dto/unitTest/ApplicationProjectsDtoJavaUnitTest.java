package com.qa.portal.application.dto.unitTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.HashSet;
import java.util.Set;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.qa.portal.application.dto.ApplicationProjectsDto;
import com.qa.portal.application.dto.PortalApplicationDto;
import com.qa.portal.application.dto.PortalProjectDto;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApplicationProjectsDtoJavaUnitTest {

	@InjectMocks
	ApplicationProjectsDto applicationProjectsDto = new ApplicationProjectsDto(null, null);
	
	@Mock
	ApplicationProjectsDto applicationProjectsDtoNull = null;
	String applicationProjectsDtoDiffClass = "this is a string";
	ApplicationProjectsDto applicationProjectsDtoDiffPortalApplicationDto = new ApplicationProjectsDto(null, null);
	ApplicationProjectsDto applicationProjectsDtoDiffPortalProjects = new ApplicationProjectsDto(null, null);
	
	
		
	
	
	
	@Test
	public void getPortalApplicationTest() {
		PortalApplicationDto portalApplicationDto = new PortalApplicationDto();
		portalApplicationDto.setId(1);
		this.applicationProjectsDto.setPortalApplication(portalApplicationDto);
		PortalProjectDto portalProjectDto1 = new PortalProjectDto();
		PortalProjectDto portalProjectDto2 = new PortalProjectDto();
		portalProjectDto1.setId(1);
		portalProjectDto2.setId(2);
		Set<PortalProjectDto> portalProjectSet = new HashSet<PortalProjectDto>();
		portalProjectSet.add(portalProjectDto1);
		portalProjectSet.add(portalProjectDto2);
		this.applicationProjectsDto.setPortalProjects(portalProjectSet);
		assertThat(String.valueOf(this.applicationProjectsDto.getPortalApplication())).isEqualTo("PortalApplicationDto{id=1, name=\'null\', description=\'null\', displayOrder=null, baseUrl=\'null\'}"); 
	}
	
	@Test
	public void getPortalProjectsTest() {
		PortalApplicationDto portalApplicationDto = new PortalApplicationDto();
		portalApplicationDto.setId(1);
		this.applicationProjectsDto.setPortalApplication(portalApplicationDto);
		PortalProjectDto portalProjectDto1 = new PortalProjectDto();
		PortalProjectDto portalProjectDto2 = new PortalProjectDto();
		portalProjectDto1.setId(1);
		portalProjectDto2.setId(2);
		Set<PortalProjectDto> portalProjectSet = new HashSet<PortalProjectDto>();
		portalProjectSet.add(portalProjectDto1);
		portalProjectSet.add(portalProjectDto2);
		this.applicationProjectsDto.setPortalProjects(portalProjectSet);
		assertThat(String.valueOf(this.applicationProjectsDto.getPortalProjects())).isEqualTo(String.valueOf((portalProjectSet))); 
	}
	
	@Test
	public void hashTest() {
		assertThat(String.valueOf(this.applicationProjectsDto.hashCode()).length()).isEqualTo(3);
	}
	
	@Test
	public void toStringTest() {
		assertThat((this.applicationProjectsDto.toString())).isEqualTo("DepartmentApplicationsDto{department=null, applications=null}");
	}
}
