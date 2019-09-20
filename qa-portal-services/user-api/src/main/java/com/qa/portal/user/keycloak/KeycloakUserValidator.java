package com.qa.portal.user.keycloak;

import com.qa.portal.common.exception.QaPortalBusinessException;
import com.qa.portal.common.keycloak.KeycloakAdminClient;
import com.qa.portal.common.dto.QaUserDetailsDto;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class KeycloakUserValidator {

    private KeycloakAdminClient keycloakAdminClient;

    public KeycloakUserValidator(KeycloakAdminClient keycloakAdminClient) {
        this.keycloakAdminClient = keycloakAdminClient;
    }

    public void validateUser(QaUserDetailsDto userDetails) {
        if (StringUtils.isEmpty(userDetails.getUser().getFirstName()) ||
                StringUtils.isEmpty(userDetails.getUser().getUserName()) ||
                StringUtils.isEmpty(userDetails.getUser().getLastName())) {
            throw new QaPortalBusinessException("Cannot create user. Not all user details supplied");
        }

        if (userNameExists(userDetails.getUser().getUserName())) {
            throw new QaPortalBusinessException("User already exists for supplied username");
        }
    }

    private boolean userNameExists(String username) {
        return keycloakAdminClient.getRealm().users().list().stream()
                    .filter(u -> u.getUsername().equals(username))
                    .findAny()
                    .map(u -> true)
                    .orElseGet(() -> false);
    }

    private boolean emailExists(String email) {
        return keycloakAdminClient.getRealm().users().list().stream()
                .filter(u -> u.getEmail().equals(email))
                .findAny()
                .map(u -> true)
                .orElseGet(() -> false);
    }
}
