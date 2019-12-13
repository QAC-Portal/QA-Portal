package com.qa.portal.application.service.page;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.containsString;
import java.util.ArrayList;
import java.util.List;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.qa.portal.application.dto.ProjectPageDto;
import com.qa.portal.application.persistence.entity.PortalProjectEntity;
import com.qa.portal.application.persistence.entity.ProjectPageEntity;
import com.qa.portal.application.persistence.entity.RoleProjectPageEntity;
import com.qa.portal.application.persistence.repository.ProjectPageRepository;
import com.qa.portal.application.service.page.mapper.ProjectPageMapper;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CreateProjectPageOperationTest {
	@InjectMocks
	public CreateProjectPageOperation createProjectPageOperation;

	@Mock
	public ProjectPageRepository projectPageRepository;

	@Mock
	public ProjectPageMapper projectPageMapper;

	@Rule
	public ExpectedException thrown = ExpectedException.none();

	@Test
	public void createProjectPageTest() {
		ProjectPageDto pageDto = new ProjectPageDto();
		pageDto.setDisplayOnMenu(true);
		pageDto.setIcon("icon");
		pageDto.setId(1);
		pageDto.setLevel(1);
		pageDto.setName("pname");
		pageDto.setPortalProjectName("p-p-name");
		List<String> dummyData = new ArrayList<String>();
		dummyData.add("a");
		dummyData.add("b");
		dummyData.add("c");
		pageDto.setRoles(dummyData);
		pageDto.setTooltip("tooltip");
		pageDto.setUrl("www.test.co.uk");

		ProjectPageEntity projectPageEntity2 = new ProjectPageEntity();

		PortalProjectEntity portalProjectEntity = new PortalProjectEntity();
		portalProjectEntity.setId(1);
		portalProjectEntity.setName("ppname");
		List<ProjectPageEntity> projectPageList = new ArrayList<ProjectPageEntity>();
		projectPageList.add(projectPageEntity2);
		portalProjectEntity.setProjectPages(projectPageList);

		RoleProjectPageEntity roleProjectPageEntity = new RoleProjectPageEntity();

		ProjectPageEntity projectPageEntity = new ProjectPageEntity();
		projectPageEntity.setId(1);
		projectPageEntity.setName("pename");
		projectPageEntity.setUrl("www.url.com");
		projectPageEntity.setTooltip("tooltip two");
		projectPageEntity.setIcon("icons");
		projectPageEntity.setPortalProject(portalProjectEntity);
		List<RoleProjectPageEntity> roleProjectPageEntityList = new ArrayList<RoleProjectPageEntity>();
		roleProjectPageEntityList.add(roleProjectPageEntity);
		projectPageEntity.setRoleProjectPageEntities(roleProjectPageEntityList);
		projectPageEntity.setDisplayOnMenu(true);

		Mockito.when(projectPageMapper.mapToNewProjectPageEntity(pageDto)).thenReturn(projectPageEntity);
		Mockito.when(projectPageRepository.save(projectPageEntity)).thenReturn(projectPageEntity);
		Mockito.when(projectPageMapper.mapToProjectPageDto(projectPageEntity)).thenReturn(pageDto);
		assertThat(createProjectPageOperation.createProjectPage(pageDto)).isEqualTo(pageDto);

		ProjectPageDto newPageDto = new ProjectPageDto();
		newPageDto.setDisplayOnMenu(true);
		newPageDto.setIcon("icon");
		newPageDto.setId(1);
		newPageDto.setLevel(1);
		newPageDto.setName("pname");
		newPageDto.setPortalProjectName("p-p-name");
		List<String> newDummyData = new ArrayList<String>();
		newDummyData.add("a");
		newDummyData.add("b");
		newDummyData.add("c");
		newPageDto.setRoles(newDummyData);
		newPageDto.setTooltip("tooltip");
		newPageDto.setUrl("www.test.co.uk");

		Mockito.when(projectPageMapper.mapToNewProjectPageEntity(newPageDto)).thenReturn(projectPageEntity);

		Mockito.when(projectPageRepository.save(projectPageEntity)).thenReturn(projectPageEntity);
		Mockito.when(projectPageMapper.mapToProjectPageDto(projectPageEntity)).thenReturn(newPageDto);
		thrown.expectMessage(containsString("Portal Page already exists with the same name"));

	}

}
