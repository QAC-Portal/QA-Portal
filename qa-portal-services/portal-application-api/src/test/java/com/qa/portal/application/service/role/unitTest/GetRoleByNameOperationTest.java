package com.qa.portal.application.service.role.unitTest;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.qa.portal.application.dto.RoleDto;
import com.qa.portal.application.persistence.entity.PortalApplicationEntity;
import com.qa.portal.application.persistence.entity.RoleEntity;
import com.qa.portal.application.persistence.repository.RoleRepository;
import com.qa.portal.application.service.role.GetRoleByNameOperation;
import com.qa.portal.common.service.mapper.BaseMapper;

//Throws an exception despite a valid input

@RunWith(SpringRunner.class)
@SpringBootTest
public class GetRoleByNameOperationTest {
	
	@InjectMocks
	GetRoleByNameOperation getRoleByNameOperation;
	
	@Mock
	RoleRepository roleRepository;
	
	@Mock
	BaseMapper baseMapper;
	
	@Test
	public void getRoleByNameTest() {
		String roleName = "User";
		RoleEntity re = new RoleEntity();
		PortalApplicationEntity pae = new PortalApplicationEntity();
		
		pae.setName("Appy");
		pae.setId(231);
	
		re.setId(1);
		re.setName("User");
		re.setPortalApplication(pae);
		
		Optional<RoleEntity> ore = Optional.of(re);
		RoleDto rd = baseMapper.mapObject(ore, RoleDto.class);
		
		Mockito.when(roleRepository.findByName(roleName)).thenReturn(ore);
		
		assertThat(this.getRoleByNameOperation.getRoleByName(roleName)).isEqualTo(rd);
	}

}
