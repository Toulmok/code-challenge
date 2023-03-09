import type Credential from '@arcgis/core/identity/Credential'
import IdentityManager from '@arcgis/core/identity/IdentityManager'
import OAuthInfo from '@arcgis/core/identity/OAuthInfo'
import { appId, portalUrl, urlCallback } from '../config'
import Portal from '@arcgis/core/portal/Portal'

let credential: Credential
let oauthInfo: OAuthInfo

/**
 * Register application ID and Portal URL
 * with the IdentityManager
 * @param appId
 * @param portalUrl
 * @param urlCallback
 */
export const initialize = () => {
    if (!oauthInfo) {
        oauthInfo = new OAuthInfo({
            appId: appId,
            portalUrl: portalUrl,
            flowType: "authorization-code",
            popup: true,
            popupCallbackUrl: urlCallback 
        });
        IdentityManager.registerOAuthInfos([oauthInfo])
    }
};

//Check current logged in status for current portal
export const checkCurrentStatus = async () => {
    return await IdentityManager.checkSignInStatus(`${oauthInfo.portalUrl}/sharing`) 
    .then((cred) => {
        const portal = new Portal()
        portal.load()
        //console.log(portal.user.username) returns portal.user is null
        return {cred, portal}
    })
}
/**
 * Get the credentials for the provided portal
 */
export const fetchCredentials = async () => {
    credential = await IdentityManager.getCredential(`${oauthInfo.portalUrl}/sharing`, {
        error: null as any,
        oAuthPopupConfirmation: false,
        token: null as any
    })
    return credential
};