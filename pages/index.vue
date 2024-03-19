<template>
  <div class="p-10">
    <h1 class="font-bold text-2xl mb-10">CRM System</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div class="grid grid-cols-5 gap-16">
        <div v-for="(column, index) in data"
             :key="column.id"
        >
          <div class="rounded bg-slate-700 py-1 px-5 mb-2 text-center"
               :style="generateColumnStyle(index, data?.length)"
          >
            {{ column.name }}
          </div>
          <div class="col-3">
            <KanbanCreateDeal :refetch="refetch"
                              :status="column.id"
                              :placeInStatus="column.items.length"
            />
            <div>
              <draggable
                  :list="columnItems(column)"
                  class="min-h-screen"
                  item-key="id"
                  group="a"
                  @change="(e:ICheckMove) => checkMove(e, column)"
              >
                <template #item="{ element }">
                  <div>
                    <template v-if="!element.isEdit.value" >
                      <UiCard class="mb-5">
                        <UiCardHeader role="button" @click="store.set(element)">
                          <UiCardTitle>{{ element.name }}</UiCardTitle>
                          <UiCardDescription class="mt-2 block">{{ convertCurrency(element.price) }}</UiCardDescription>
                        </UiCardHeader>
                        <UiCardContent class="text-xs"><div>Компания</div>{{ element.companyName }}</UiCardContent>
                        <UiCardFooter class="flex justify-between">
                          <span>{{ dayjs(element.$createdAt).format('DD MMMM YYYY') }}</span>
                          <KanbanCardSettings @openSettings="openSettings(element.isEdit)"/>
                        </UiCardFooter>
                      </UiCard>
                    </template>
                    <template v-else>
                      <div v-if="element.isEdit.value">
                        <KanbanFormDeal :initDeal="element"
                                        @openForm="openSettings"
                        />
                      </div>
                    </template>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </div>
      </div>
      <KanbanSlideover/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ICard, ICardMutate, IColumn} from "~/components/kanban/kanban.types";
import {useKanbanQuery, useMoveDealMutation} from "~/components/kanban/useKanbanQuery";
import {convertCurrency} from "~/utils/convertCurrency";
import dayjs from "dayjs";
import type {EnumStatus} from "~/types/deals.types";
import {generateColumnStyle} from "~/components/kanban/generateGradient";
import {useDealSlideStore} from "~/store/dealSlide.store";
import draggable from "vuedraggable";
import type {Ref} from "vue";

interface ICheckMove extends DOMRect, HTMLElement {
  added: {
    element: ICard,
    newIndex: number
  },
  removed: {
    oldIndex: number
  }
  moved: {
    element: ICard,
    newIndex: number,
    oldIndex: number
  }
}

export interface ICardFormTrigger extends ICard {
  isEdit: Ref<boolean>
}

useSeoMeta({
  title: 'Home | CRM System'
})

const dragCardRef = ref<ICard | null>(null)
const targetColumnRef = ref<EnumStatus | null>(null)
const targetPlaceRef = ref<number | null>(null)
const sourcePlaceRef = ref<number | null>(null)
const {data: data, isLoading, refetch} = useKanbanQuery()
const store = useDealSlideStore()

const {mutate} = useMoveDealMutation(refetch)

const columnItems = (column: IColumn):ICardFormTrigger[] => (column.items.map(el => ({...el, isEdit: ref(false)})))

const openSettings = (el: Ref<boolean>) => (el.value = !el.value)
function checkMove(e: ICheckMove, col: IColumn) {
  if (e.added) {
    dragCardRef.value = {...e.added.element, status: col.name}
    targetPlaceRef.value = e.added.newIndex
    targetColumnRef.value = col.id

  }
  if (e.removed) {
    sourcePlaceRef.value = e.removed.oldIndex
    updateList(col.id)
  }
  if (e.moved) {
    dragCardRef.value = {...e.moved.element, status: col.name}
    targetPlaceRef.value = e.moved.newIndex
    targetColumnRef.value = col.id
    sourcePlaceRef.value = e.moved.oldIndex
    updateList(col.id)
  }
}

function updateList(initColId: EnumStatus) {
  let newData: ICardMutate[]
  const sourceColumn = data.value?.find((el) => el.id === initColId)
  if (targetColumnRef.value !== initColId) {
    const targetColumn = data.value?.find((el) => el.id === targetColumnRef.value)
    const target = targetColumn && editColumn(targetColumn, 'target')
    const source = sourceColumn && editColumn(sourceColumn, 'source')

    newData = target?.items && source?.items ? target?.items.concat(source?.items) : []
  } else {
    const list = sourceColumn && [...sourceColumn.items]
    const start = sourcePlaceRef.value !== null ? sourcePlaceRef.value : 0
    const end = targetPlaceRef.value

    if (list?.length) {
      list.splice(start, 1)
    }
    if (list?.length && end !== null && dragCardRef.value) {
      list.splice(end, 0, dragCardRef.value)
    }
    // Находим минимальный и максимальный индекс для начального и конечного
    // местоположения перемещаемого элемента
    const minInd = start >= 0 && end ? Math.min(start, end) : 0
    const maxInd = start >= 0 && end ? Math.max(start, end) : list?.length

    newData = list?.map((el, ind) => ({...el, status: sourceColumn?.id, placeInStatus: ind}))
        .filter((el, ind) => (maxInd && ind >= minInd && ind <= maxInd)) as ICardMutate[]
  }
  if (newData) {
    newData.forEach((el) => {
      mutate({docId: el.id, status: el.status, placeInStatus: el.placeInStatus})
    })
  }

}

const editColumn = (column: IColumn, source: string) => {
  let addedIndex = 0
  const newItems: ICard[] = [...column.items]
  if (column?.items) {
    if (source === 'target' && dragCardRef.value) {
      addedIndex = targetPlaceRef.value !== null ? targetPlaceRef.value : addedIndex
      newItems.splice(0, addedIndex, dragCardRef.value)
    }
    if (source === 'source' && sourcePlaceRef.value !== null) {
      addedIndex = sourcePlaceRef.value
      newItems.splice(0, addedIndex + 1)
    }
  }
  return {
    ...column,
    items: newItems.map((el, ind) => ({...el, status: column.id, placeInStatus: ind + addedIndex}))
  }
}
</script>

<style scoped>

</style>
