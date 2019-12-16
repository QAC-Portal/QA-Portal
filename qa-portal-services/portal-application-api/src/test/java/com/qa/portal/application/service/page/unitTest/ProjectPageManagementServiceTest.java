package com.qa.portal.application.service.page.unitTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.qa.portal.application.dto.ProjectPageDto;
import com.qa.portal.application.service.page.CreateProjectPageOperation;
import com.qa.portal.application.service.page.ProjectPageManagementService;
import com.qa.portal.application.service.page.UpdateProjectPageOperation;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProjectPageManagementServiceTest {
	
	@InjectMocks
	public ProjectPageManagementService projectPageManagementService;
	
	@Mock
	public CreateProjectPageOperation createProjectPageOperation;
	
	@Mock
	public UpdateProjectPageOperation updateProjectPageOperation;
	
	@Test
	public void createProjectPageTest() {
		ProjectPageDto p = new ProjectPageDto();
		p.setDisplayOnMenu(true);
		p.setIcon("icon");
		p.setId(1);
		p.setLevel(1);
		p.setName("name");
		p.setPortalProjectName("p-p-name");
		List<String> rolesDummyData = new ArrayList<String>();
		rolesDummyData.add("a");
		rolesDummyData.add("b");
		rolesDummyData.add("c");
		p.setRoles(rolesDummyData);
		p.setTooltip("tooltip");
		p.setUrl("www.test.co.uk");
		this.projectPageManagementService.createProjectPage(p);
		
		Mockito.when(createProjectPageOperation.createProjectPage(p)).thenReturn(p);
		assertThat(this.projectPageManagementService.createProjectPage(p).getName()).isEqualTo(p.getName());
		
	}
	
	@Test
	public void updateProjectPageTest() {
		ProjectPageDto p = new ProjectPageDto();
		p.setDisplayOnMenu(true);
		p.setIcon("icon");
		p.setId(1);
		p.setLevel(1);
		p.setName("name");
		p.setPortalProjectName("p-p-name");
		List<String> rolesDummyData = new ArrayList<String>();
		rolesDummyData.add("a");
		rolesDummyData.add("b");
		rolesDummyData.add("c");
		p.setRoles(rolesDummyData);
		p.setTooltip("tooltip");
		p.setUrl("www.test.co.uk");
		this.projectPageManagementService.updateProjectPage(p);
		
		Mockito.when(updateProjectPageOperation.updateProjectPage(p)).thenReturn(p);
		assertThat(this.projectPageManagementService.updateProjectPage(p).getName()).isEqualTo(p.getName());
	} 

}
