import type {EnumStatus, IDeal} from "~/types/deals.types";

export interface ICard {
    id: string
    name: string
    price: number
    $createdAt: string
    companyName: string
    status: string
    placeInStatus: number
}
export interface IColumn {
    id: EnumStatus
    name: string
    items: ICard[]
}
export interface ICardMutate extends Omit<ICard, 'status'>{
    status: EnumStatus
}