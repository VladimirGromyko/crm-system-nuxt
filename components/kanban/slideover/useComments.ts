import {useDealSlideStore} from "~/store/dealSlide.store";
import {useQuery} from "@tanstack/vue-query";
import {DB} from "~/lib/utils/appwrite";
import {COLLECTION_DEALS, DB_ID} from "~/app.constants";

export function useComments() {
    const store = useDealSlideStore()
    const cardId = store.card?.id || ''
    return useQuery({
        queryKey: ['deal', cardId],
        queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId)
    })
}