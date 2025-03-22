---
outline: deep
title: Awesome Yami
---

<script setup>
import {ref} from "vue"
import { useData } from 'vitepress'
import alova from '../src/alova.ts'
import accessGames from "../src/access.json";
const info = ref(null)
const id =  new URLSearchParams(location.search).get('id')
alova.Get(`/stm/api/appdetails/?appids=${id}`).then(d=>{
    const data = d[id]
    if(data && data.success){
        info.value= data.data
    }
}).catch(()=>{})
</script>

<Title v-if="!~accessGames.findIndex(v=>v.id === id) && info" :info="info" />
<h1 v-else-if="id">该游戏可能不是yami 编辑器制作或者没有加入我们</h1>

<h1 v-if="!id">可在左侧查看 yami 制作的游戏</h1>
