<template>
    <div v-html="convertToHTML(params?.contents)"> </div>
</template>
<script setup lang="ts">
    import { useData } from 'vitepress';
    import { convertToHTML } from './utils';

    const { params } = useData();
</script>