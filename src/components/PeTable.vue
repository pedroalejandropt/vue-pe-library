<template>
    <div class="table-header">
        <div class="left" v-if="multipleViews">
            <button @click="changeView()">
                {{ isTable ? 'Grid' : 'Table' }}
            </button>
        </div>

        <div class="right" v-if="filter">
            <input placeholder="search" v-model="filterText">
            <button @click="search()">
                Search
            </button>
            <button @click="clear()">
                Clear
            </button>
        </div>
    </div>

    <template v-if="isTable">
        <table>
            <thead>
                <tr>
                    <th @click="orderBy(header)" v-for="header of headers" :key="header.name">{{ header.title }}</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="record, i of data" :key="i">
                    <td v-for="header, j of headers" :key="j">{{ record[header.name] }}</td>
                </tr>
            </tbody>
        </table>
    </template>

    <template v-else>
        <div class="cards">
            <div class="card" v-for="record, i of data" :key="i">
                <p v-for="header, j of headers" :key="j">
                    {{ record[header.name] }}
                </p>
            </div>
        </div>
    </template>

    <template v-if="numRecords">
        <div class="table-footer">
            <div class="left">
                Number of items: {{ numRecords }}
            </div>
            <div class="right">
                <button class="arrow" @click="back()" :disabled="validPage('back')">
                    {{ "<" }} </button>
                        {{ page }}
                        <button class="arrow" @click="next()" :disabled="validPage('next')">
                            {{ ">" }}
                        </button>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">

import { defineProps, ref } from 'vue';
import { ITableHeader } from "../interfaces/ITable";

interface Props {
    headers: ITableHeader[]
    records?: any[]
    order?: boolean,
    numRecords?: number
    multipleViews?: boolean
    filter?: boolean
}

const props = defineProps<Props>();
const isTable = ref(true);
const data = ref(props.records?.slice(0, props.numRecords));

// order functionality
const nameOrder = ref('');
const boolOrder = ref(false);

// filter functionality
const filterText = ref('');

// page functionality
const page = ref(1);


const orderBy = (header: ITableHeader) => {
    boolOrder.value =
        (nameOrder.value == '') ? true :
            ((nameOrder.value == header.name) && (boolOrder.value)) ? false
                : true;
    (boolOrder.value) ?
        data.value = data?.value?.sort((a, b) => (a[header.name] > b[header.name]) ? 1 : -1) :
        data.value = data?.value?.sort((a, b) => (b[header.name] > a[header.name]) ? 1 : -1);
    nameOrder.value = header.name;
}

const changeView = () => {
    isTable.value = !isTable.value;
}

const search = () => {
    let list: any[] = []
    props.records?.forEach(r => {
        props.headers.forEach(h => {
            if (String(r[h.name]).toLowerCase().includes(String(filterText.value).toLowerCase())) list.push(r)
        });
    })
    data.value = list.slice(0, props.numRecords);
}

const clear = () => {
    filterText.value = ''
    data.value = props.records?.slice(0, props.numRecords)
}

const validPage = (direction: string) => {
    if (direction == 'next' && props.numRecords && props.records) return (page.value * props.numRecords >= props.records.length);
    if (direction == 'back') return (page.value == 1);
    return true;
}

const next = async () => {
    page.value = page.value + 1
    if (props.numRecords) {
        let from = (page.value - 1) * props.numRecords
        data.value = props.records?.slice(from, props.numRecords * page.value)
    }
}

const back = async () => {
    page.value = page.value - 1
    if (props.numRecords) {
        let from = (page.value - 1) * props.numRecords
        data.value = props.records?.slice(from, props.numRecords * page.value)
    }
}

</script>

<style scoped src="../assets/css/styles.css"></style>