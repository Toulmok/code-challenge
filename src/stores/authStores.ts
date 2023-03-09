import { defineStore } from 'pinia'
import { checkCurrentStatus, fetchCredentials } from '../helpers/auth'
import IdentityManager from '@arcgis/core/identity/IdentityManager'

interface authState { credential: __esri.Credential | undefined }
const defaultState: authState = { credential: undefined }

export const authStores = defineStore({
    id: 'authStores',
    state: () => (defaultState),
    getters: { },
    actions: {
        async signIn (authenticated: Boolean) {
            if (!authenticated) {
                try {
                    this.credential = (await checkCurrentStatus()).cred;
                } catch (error) {
                    this.credential = await fetchCredentials();
                }
            }
            return this.credential;
        },
        async signOut (authenticated: Boolean) {
            // make sure the identitymanager has the credential so it can destroy it
            this.signIn(authenticated);
            IdentityManager.destroyCredentials();
        }
    }
})