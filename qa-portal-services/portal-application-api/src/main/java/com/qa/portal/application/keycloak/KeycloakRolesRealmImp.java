package com.qa.portal.application.keycloak;

import java.util.List;
import java.util.Map;

import javax.ws.rs.core.Response;

import org.keycloak.admin.client.resource.AttackDetectionResource;
import org.keycloak.admin.client.resource.AuthenticationManagementResource;
import org.keycloak.admin.client.resource.ClientInitialAccessResource;
import org.keycloak.admin.client.resource.ClientRegistrationPolicyResource;
import org.keycloak.admin.client.resource.ClientScopesResource;
import org.keycloak.admin.client.resource.ClientsResource;
import org.keycloak.admin.client.resource.ComponentsResource;
import org.keycloak.admin.client.resource.GroupsResource;
import org.keycloak.admin.client.resource.IdentityProvidersResource;
import org.keycloak.admin.client.resource.KeyResource;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.RoleByIdResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserStorageProviderResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.adapters.action.GlobalRequestResult;
import org.keycloak.representations.idm.AdminEventRepresentation;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.ClientScopeRepresentation;
import org.keycloak.representations.idm.EventRepresentation;
import org.keycloak.representations.idm.GroupRepresentation;
import org.keycloak.representations.idm.PartialImportRepresentation;
import org.keycloak.representations.idm.RealmEventsConfigRepresentation;
import org.keycloak.representations.idm.RealmRepresentation;


public class KeycloakRolesRealmImp implements RealmResource{

	@Override
	public RealmRepresentation toRepresentation() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void update(RealmRepresentation realmRepresentation) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ClientsResource clients() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ClientScopesResource clientScopes() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ClientScopeRepresentation> getDefaultDefaultClientScopes() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addDefaultDefaultClientScope(String clientScopeId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeDefaultDefaultClientScope(String clientScopeId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ClientScopeRepresentation> getDefaultOptionalClientScopes() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addDefaultOptionalClientScope(String clientScopeId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeDefaultOptionalClientScope(String clientScopeId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ClientRepresentation convertClientDescription(String description) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UsersResource users() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RolesResource roles() {
		//KeycloakRolesResImp rolesRes = new KeycloakRolesResImp();
		// TODO Auto-generated method stub
		return null;
//		return rolesRes;
	}

	@Override
	public RoleByIdResource rolesById() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public GroupsResource groups() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void clearEvents() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<EventRepresentation> getEvents() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<EventRepresentation> getEvents(List<String> types, String client, String user, String dateFrom,
			String dateTo, String ipAddress, Integer firstResult, Integer maxResults) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void clearAdminEvents() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<AdminEventRepresentation> getAdminEvents() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<AdminEventRepresentation> getAdminEvents(List<String> operationTypes, String authRealm,
			String authClient, String authUser, String authIpAddress, String resourcePath, String dateFrom,
			String dateTo, Integer firstResult, Integer maxResults) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RealmEventsConfigRepresentation getRealmEventsConfig() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateRealmEventsConfig(RealmEventsConfigRepresentation rep) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public GroupRepresentation getGroupByPath(String path) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<GroupRepresentation> getDefaultGroups() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addDefaultGroup(String groupId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeDefaultGroup(String groupId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public IdentityProvidersResource identityProviders() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void remove() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<Map<String, String>> getClientSessionStats() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ClientInitialAccessResource clientInitialAccess() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ClientRegistrationPolicyResource clientRegistrationPolicy() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Response partialImport(PartialImportRepresentation rep) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RealmRepresentation partialExport(Boolean exportGroupsAndRoles, Boolean exportClients) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AuthenticationManagementResource flows() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AttackDetectionResource attackDetection() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Response testLDAPConnection(String action, String connectionUrl, String bindDn, String bindCredential,
			String useTruststoreSpi, String connectionTimeout) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Response testSMTPConnection(String config) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void clearRealmCache() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void clearUserCache() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void clearKeysCache() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public GlobalRequestResult pushRevocation() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public GlobalRequestResult logoutAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteSession(String sessionId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ComponentsResource components() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserStorageProviderResource userStorage() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public KeyResource keys() {
		// TODO Auto-generated method stub
		return null;
	}

}
