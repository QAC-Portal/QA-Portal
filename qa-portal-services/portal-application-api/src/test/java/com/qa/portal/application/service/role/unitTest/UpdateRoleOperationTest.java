package com.qa.portal.application.service.role.unitTest;

//import static org.assertj.core.api.Assertions.assertThat;
//
//import java.util.Optional;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import com.qa.portal.application.dto.PortalApplicationDto;
//import com.qa.portal.application.dto.RoleDto;
//import com.qa.portal.application.persistence.entity.PortalApplicationEntity;
//import com.qa.portal.application.persistence.entity.RoleEntity;
//import com.qa.portal.application.persistence.repository.PortalApplicationRepository;
//import com.qa.portal.application.persistence.repository.RoleRepository;
//import com.qa.portal.application.service.role.UpdateRoleOperation;
//import com.qa.portal.common.service.mapper.BaseMapper;

//@RunWith(SpringRunner.class)
//@SpringBootTest
public class UpdateRoleOperationTest {
//	
//	@InjectMocks
//	UpdateRoleOperation updateRoleOperation;
//	
//	@Mock
//	RoleRepository roleRepository;
//	
//	@Mock
//	PortalApplicationRepository portalApplicationRepository;
//	
//	@Mock
//	BaseMapper baseMapper;
//	
//	@Test
//	public void updateRoleTest() {
//		RoleDto rd = new RoleDto();
//		RoleEntity re = new RoleEntity();
//		PortalApplicationDto pae = new PortalApplicationDto();
//		PortalApplicationEntity paeE = new PortalApplicationEntity();
//		
//		pae.setName("Pa");
//		
//		rd.setId(123);
//		rd.setName("Admin");
//		rd.setPortalApplication(pae);
//		
//		Mockito.when(this.roleRepository.findByName(rd.getName())).thenReturn(Optional.of(re));
//		Mockito.when(this.portalApplicationRepository.findByName(rd.getPortalApplication().getName())).thenReturn(Optional.of(paeE));
//		Mockito.when(this.baseMapper.mapObject(re, RoleEntity.class)).thenReturn(re);
//		
//		assertThat(this.updateRoleOperation.updateRole(rd)).isEqualTo(re);
//	}

}
