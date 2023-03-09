//https://developers.arcgis.com/javascript/latest/api-reference/esri-portal-PortalItem.html
import { defineStore } from 'pinia'
import PortalQueryParams from '@arcgis/core/portal/PortalQueryParams'
import { checkCurrentStatus } from '../helpers/auth'

interface itemList {
    id: string,
    title?: string,
    created?: Date,
    tags?: string[]
}
interface itemState { 
    items: itemList[],
    item: any, 
    loading: boolean, 
    error: any }

const defaultState: itemState = { 
    items: [{id:''}],  //[{id:'',title:'',created:undefined}], 
    item: null, 
    loading: false, 
    error: null }

export const itemStores = defineStore({
    id: 'item',
    state: () => (defaultState),
    getters: { },
    actions: { 
        async fetchItems(portal: __esri.Portal){
            //console.log(portal.user.username) Returns portal.user is null
            const userId = (await checkCurrentStatus()).cred.userId

            const queryParams = new PortalQueryParams({
                query: "owner:" + userId, //"Eileonx",//portal.user.username,credential
                sortOrder: "desc",
                num: 20
            })

            let queryResults: __esri.PortalItem[] = []
            this.items = [{id:'',title:'',created:undefined}] //clear data
            this.loading = true
            try { 
                queryResults = await portal.queryItems(queryParams)
                .then((response: __esri.PortalQueryResult) => (
                    response.results as __esri.PortalItem[]
                ))
                await this.transferItems(queryResults)           
            }
            catch (error) { this.error = error}
            finally { this.loading = false}
        },
        // Prevents proxy error with Vue3
        async transferItems(queryResults: __esri.PortalItem[]) {     
            this.items = queryResults.map(({id,title,created,tags}) => ({id,title,created,tags}))
        },
        //
        async updateTags(portal: __esri.Portal, buttonItemId: string) {
            console.log(buttonItemId)
        }
    }
})