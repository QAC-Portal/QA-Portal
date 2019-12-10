package com.qa.portal.application.keycloak;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.keycloak.representations.idm.RoleRepresentation;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.qa.portal.common.keycloak.KeycloakAdminClient;

@RunWith(SpringRunner.class)
@SpringBootTest
public class KeycloakRoleResourceManagerTests {
	
	@Mock
	private KeycloakRoleValidator keycloakRoleValidator;
	@Mock
	private KeycloakRoleFactory keycloakRoleFactory;
	@Mock
	private KeycloakAdminClient keycloakAdminClient;

	@Test
	public void testCreateRole() {
		
		
		
		
		KeycloakRoleResourceManager KRRM = new KeycloakRoleResourceManager(keycloakRoleValidator, keycloakRoleFactory,
				keycloakAdminClient);
		RoleRepresentation result = KRRM.createRole("test role");
		assertEquals(result.getName(), "test role");
		
		
		
	}
}
