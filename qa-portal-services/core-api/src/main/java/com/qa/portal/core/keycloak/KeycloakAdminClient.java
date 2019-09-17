package com.qa.portal.core.keycloak;

import com.qa.portal.common.exception.QaPortalBusinessException;
import com.qa.portal.common.security.QaSecurityContext;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class KeycloakAdminClient {

    public static final String QA_KEYCLOAK_ADMIN_URL_PROP = "qa.keycloak.admin.url";

    public static final String QA_KEYCLOAK_ADMIN_REALM_PROP = "qa.keycloak.admin.realm";

    public static final String QA_KEYCLOAK_ADMIN_USER_PROP = "qa.keycloak.admin.user";

    public static final String QA_KEYCLOAK_AUTH_PASSWORD_PROP = "qa.keycloak.admin.password";

    public static final String QA_KEYCLOAK_AUTH_CLIENT_ID_PROP = "qa.keycloak.admin.clientId";

    private Keycloak keycloak;

	private Environment environment;

	private QaSecurityContext qaSecurityContext;

    public KeycloakAdminClient(Environment environment,
                               QaSecurityContext qaSecurityContext) {
        this.environment = environment;
        this.qaSecurityContext = qaSecurityContext;
    }

    @PostConstruct
    public void init() {
        keycloak = KeycloakBuilder.builder()
                    .serverUrl(environment.getProperty(QA_KEYCLOAK_ADMIN_URL_PROP))
                    .realm(environment.getProperty(QA_KEYCLOAK_ADMIN_REALM_PROP))
                    .username(environment.getProperty(QA_KEYCLOAK_ADMIN_USER_PROP))
                    .password(environment.getProperty(QA_KEYCLOAK_AUTH_PASSWORD_PROP))
                    .clientId(environment.getProperty(QA_KEYCLOAK_AUTH_CLIENT_ID_PROP))
                    .resteasyClient(new ResteasyClientBuilder().build()).build();
    }

    public Keycloak getKeycloakAdminClient() {
        if (qaSecurityContext.getUserName().equals(environment.getProperty(QA_KEYCLOAK_ADMIN_USER_PROP))) {
            return keycloak;
        }
        else {
            throw new QaPortalBusinessException("User does not have privileges to maintain keycloak resources.");
        }
	}

	public RealmResource getRealm() {
    	return getKeycloakAdminClient().realm(environment.getProperty(QA_KEYCLOAK_ADMIN_REALM_PROP));
	}
}
