import {useQuery} from "@tanstack/vue-query";
import {DB} from "~/lib/utils/appwrite";
import {COLLECTION_DEALS, DB_ID} from "~/app.constants";
import {KANBAN_DATA} from "./kanban.data";
import type {IDeal} from "~/types/deals.types";
import type {IColumn} from "~/components/kanban/kanban.types";

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
                        status: column.name,
                        placeInStatus: deal.placeInStatus
                    })
                }
            }
            newBoard.forEach((list) =>
                list.items.sort((a, b) => a.placeInStatus - b.placeInStatus))
            return newBoard
        }
    })
}

