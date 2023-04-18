# vue-pe-library

Vue FrontEnd Library

This library will contain the main components need it to build and applications.

## Instalation
```
npm i vue-pe-library
```

## PeTable
```javascript
<PeTable/>
```

How to display data ?

```typescript
// You should provide headers and records.
// Example: 

<script setup lang="ts">
    import {PeTable} from "tripilibrary";

    // Headers should have the following structure. 
    let headers = [ { title: 'Id', name: 'id' }, { title: 'Brand', name: 'brand' } ]
    let records = [ { id: 1, brand: 'Kiat' }, { id: 2, brand: 'Chevrolet' }, { id: 3, brand: 'Toyota' } ]
</script>

<template> 
    <PeTable :headers="headers" :records="records" />
</template>
```

Table Pagination 

```typescript
// Add numRecords property to implement the pagination.
// Example: 

<script setup lang="ts">
    import {PeTable} from "tripilibrary";

    // Headers should have the following structure. 
    let headers = [ { title: 'Id', name: 'id' }, { title: 'Brand', name: 'brand' } ]
    let records = [ { id: 1, brand: 'Kia' }, { id: 2, brand: 'Chevrolet' }, { id: 3, brand: 'Toyota' }, { id: 4, brand: 'Ford' }, { id: 5, brand: 'Fiat' }, { id: 6, brand: 'Mercedes Benz' }  ]
</script>

<template> 
    <PeTable :headers="headers" :records="records" :numRecords="5"/>
</template>
```

