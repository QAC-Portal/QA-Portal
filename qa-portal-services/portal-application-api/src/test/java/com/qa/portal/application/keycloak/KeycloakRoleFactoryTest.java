package com.qa.portal.application.keycloak;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class KeycloakRoleFactoryTest {

	@Test
	public void testCreateKeycloakRole() {
		KeycloakRoleFactory KcF = new KeycloakRoleFactory();
		RoleRepresentation result = KcF.createKeycloakRole("test role");
		assertEquals(result.getName(), "test role");
	}

}
