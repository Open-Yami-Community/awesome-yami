---
outline: deep
title: Awesome Yami
---

<script setup>
import dayjs from "dayjs"
</script>

# 标题：{{$params.title}}

作者：{{$params.author}}

发布时间：{{dayjs.unix($params.date).format('YYYY年MM月DD日 H时m分s秒')}}

<News/>
