package com.qa.portal.application.service.page.mapper;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.qa.portal.application.persistence.entity.PortalProjectEntity;
import com.qa.portal.application.persistence.entity.ProjectPageEntity;
import com.qa.portal.application.persistence.entity.RoleProjectPageEntity;
import com.qa.portal.application.persistence.repository.RoleRepository;
import com.qa.portal.common.service.mapper.BaseMapper;

public class ProjectPageMapperTest {
	@InjectMocks
	public ProjectPageMapper projectPageMapper;

	@Mock
	public BaseMapper baseMapper;

	@Mock
	public RoleRepository roleRepository;

	@Test
	public void mapToProjectPageDtoTest() {
		ProjectPageEntity projectPageEntity2 = new ProjectPageEntity();

		PortalProjectEntity portalProjectEntity = new PortalProjectEntity();

		portalProjectEntity.setId(1);
		portalProjectEntity.setName("ppname");
		List<ProjectPageEntity> projectPageEntityList = new ArrayList<ProjectPageEntity>();
		projectPageEntityList.add(projectPageEntity2);
		portalProjectEntity.setProjectPages(projectPageEntityList);

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

	}
}
