package com.qa.portal.application.keycloak;

import java.util.List;

import org.keycloak.admin.client.resource.RoleResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.web.bind.annotation.RequestMapping;
public class KeycloakRolesResImp implements RolesResource {

	@Override
	public List<RoleRepresentation> list() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void create(RoleRepresentation roleRepresentation) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public RoleResource get(String roleName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteRole(String roleName) {
		// TODO Auto-generated method stub
		
	}




}
