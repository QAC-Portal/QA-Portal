package com.qa.portal.application.keycloak;

import static org.assertj.core.api.Assertions.assertThat;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.RoleRepresentation.Composites;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.qa.portal.common.keycloak.KeycloakAdminClient;

@RunWith(SpringRunner.class)
@SpringBootTest
public class KeycloakRoleResourceManagerTests {

	@InjectMocks
	public KeycloakRoleResourceManager keycloakRoleResourceManager;
	@Mock
	KeycloakRoleResourceManager keycloakRoleResourceManagermock;
	@Mock
	public KeycloakRoleValidator keycloakRoleValidator;
	@Mock
	public KeycloakRoleFactory keycloakRoleFactory;
	@Mock
	public KeycloakAdminClient keycloakAdminClient;
	
	@Mock
	public RolesResource rolesResource;
	
	@Mock
	public RealmResource realmResource;
	
	@Test
	public void getRRTest() { 
	}

	@Test
	public void testCreateRole() throws Exception{
		RoleRepresentation RR = new RoleRepresentation();
		RR.setId("1");
		RR.setName("test role"); 
		RR.setDescription("test description");
		RR.setComposite(true);
		Composites C = new Composites();
		Set<String> realm = new HashSet<String>();
		realm.add("qa.keycloak.admin.realm");
		C.setRealm(realm);
		Map<String, List<String>> myMaps = new HashMap<String, List<String>>();
		C.setClient(myMaps);
		RR.setComposites(C);
		RR.setClientRole(true);
		RR.setContainerId("1");
		Map<String, List<String>> attMap = new HashMap<String, List<String>>();
		RR.setAttributes(attMap);
		Mockito.when(keycloakRoleFactory.createKeycloakRole(RR.getName())).thenReturn(RR);
		System.out.println(RR);
		Optional<RoleRepresentation> oRR = Optional.of(RR); 
		Mockito.when(keycloakAdminClient.getRealm()).thenReturn(realmResource);
		Mockito.when(keycloakAdminClient.getRealm().roles()).thenReturn(rolesResource);

		Mockito.when(this.keycloakRoleResourceManagermock.getRoleRepresentation("test role")).thenReturn(oRR);
		
//		keycloakRoleResourceManager.getRoleRepresentation(RR.getName());
//		keycloakRoleResourceManager.createRole(RR.getName()).getName();
		assertThat(keycloakRoleResourceManager.createRole("test role")).isEqualTo(RR);
	}
}