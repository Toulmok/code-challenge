//Currently, not used

import { defineStore } from 'pinia'
import Portal from '@arcgis/core/portal/Portal'
import PortalQueryParams from '@arcgis/core/portal/PortalQueryParams'

interface portalState {
    portal?: __esri.Portal
}

const defaultState: portalState = { }

export const portalStores = defineStore({
    id: 'portalStores',
    state: () => (defaultState),
    getters: { 
        
    },
    actions: {
        
    }
})

/*
export async function loadPortalItems(portal: Portal, createdDate: Date, before: Boolean) {
    if(before) {
        const queryParams = {
            query: 'created:[' + 'to' + createdDate + ']',
            num: 50,
        }
        return portal.queryItems(queryParams as any)
    } else {
        const queryParams = {
            query: 'created:[' + createdDate + 'to' + ']',
            num: 50,
        }
        return portal.queryItems(queryParams as any)
    }
}

export async function queryPortal(authenticated: Boolean) {
    if (authenticated) {
        portal.authMode = "immediate";
        await portal.load()

        const queryParams = new PortalQueryParams({
            query: "owner:" + portal.user.username,
            sortOrder: "desc",
            num: 20
        })
        return portal.queryItems(queryParams);
    }
}

const tempDate = 1249084800000
const createdDate = new Date(tempDate * 10000)
const before = true
const portal = await loadPortal(portalUrl)
const { results } = await loadPortalItems(portal, createdDate, before)
this.portalItems = results

*/