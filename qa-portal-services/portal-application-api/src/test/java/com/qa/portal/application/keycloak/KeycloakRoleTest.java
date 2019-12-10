package com.qa.portal.application.keycloak;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.keycloak.representations.idm.RoleRepresentation;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.qa.portal.common.keycloak.KeycloakAdminClient;

@SpringBootTest
public class KeycloakRoleTest {
	
	
	@Mock
    private KeycloakRoleValidator keycloakRoleValidator;
	@Mock
    private KeycloakRoleFactory keycloakRoleFactory;
	@Mock
    private KeycloakAdminClient keycloakAdminClient;

	@Test
	public void testCreateKeycloakRole() {
		KeycloakRoleFactory KcF = new KeycloakRoleFactory();
		RoleRepresentation result =KcF.createKeycloakRole("test role");
		assertEquals(result.getName(),"test role");
	}
	
	@Test
	public void testCreateRole() {
		KeycloakRoleResourceManager KRRM = new KeycloakRoleResourceManager(keycloakRoleValidator,keycloakRoleFactory,keycloakAdminClient);
		RoleRepresentation result = KRRM.createRole("test role");
		assertEquals(result.getName(), "test role");
	}	
}
