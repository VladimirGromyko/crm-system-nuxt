import {useMutation, useQuery} from "@tanstack/vue-query";
import {DB} from "~/lib/utils/appwrite";
import {COLLECTION_DEALS, DB_ID} from "~/app.constants";
import {KANBAN_DATA} from "./kanban.data";
import type {IDeal} from "~/types/deals.types";
import type {IColumn} from "~/components/kanban/kanban.types";
import {v4 as uuid4} from "uuid";
import type {IDealFormState} from "~/components/kanban/FormDeal.vue";

interface ICreateDealMutation {
    refetch: Function | null,
    handleReset?: Function,
}
interface IMutationVariables {
    docId: string,
    status?: string,
    placeInStatus: number,
}
export function useKanbanQuery() {
    return useQuery({
        queryKey: ['deals'],
        queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
        select(data) {
            const newBoard: IColumn[] = KANBAN_DATA.map(column => ({...column, items:[]}))
            const deals = data.documents as unknown as IDeal[]
            for(const deal of deals) {
                const column = newBoard.find(col => col.id === deal.status)
                if (column) {
                    column.items.push({
                        $createdAt: deal.$createdAt,
                        id: deal.$id,
                        name: deal.name,
                        price: deal.price,
                        companyName: deal.customer.name,
                        companyId: deal.customer.$id,
                        email: deal.customer.email,
                        status: column.id,
                        placeInStatus: deal.placeInStatus,
                    })
                }
            }
            newBoard.forEach((list) =>
                list.items.sort((a, b) => a.placeInStatus - b.placeInStatus))
            return newBoard
        }
    })
}

export function useCreateDealMutation(payload: ICreateDealMutation) {
    return useMutation({
        mutationKey: ['create a new deal'],
        mutationFn: (data: IDealFormState) => DB.createDocument(DB_ID, COLLECTION_DEALS, uuid4(), data),
        onSuccess() {
            payload.refetch && payload.refetch()
            payload.handleReset && payload.handleReset()
        },
    })
}

export function useMoveDealMutation(refetch: Function) {
    return useMutation({
        mutationKey: ['move deal place'],
        mutationFn: (newData: IMutationVariables) => {
            return DB.updateDocument(DB_ID, COLLECTION_DEALS, newData.docId, {
                status: newData.status,
                placeInStatus: newData.placeInStatus
            })
        },
        onSuccess: () => refetch()
    })
}
export function useUpdateDealMutation(payload: ICreateDealMutation) {
    return useMutation({
        mutationKey: ['update deal'],
        mutationFn: (data: IDealFormState) => {
            return DB.updateDocument(DB_ID, COLLECTION_DEALS, '-1',{}) //data)
        },
        onSuccess() {
            // payload.refetch && payload.refetch()
            // payload.handleReset && payload.handleReset()
        },
    })
}

