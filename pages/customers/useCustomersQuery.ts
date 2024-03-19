import {useQuery} from "@tanstack/vue-query";
import {DB} from "~/lib/utils/appwrite";
import {COLLECTION_CUSTOMERS, DB_ID} from "~/app.constants";

export function useCustomersQuery(){
    return useQuery({
        queryKey: ['customers'],
        queryFn: () => DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS)
    })
}
