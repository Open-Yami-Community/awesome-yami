---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Awesome Yami"
  text: "优秀的Yami游戏合集"
  tagline: 这里聚集了许多使用 Yami 引擎制作的游戏
  image:
    src: /logo.png
    alt: Awesome Yami
  actions:
    - theme: brand
      text: 合集
      link: /steam

features:
  - title: 合集📝
    details: 有数款游戏简介
  - title: 官方
    details: 由yami编辑器官方群支持
  - title: 投稿🚀
    details: 欢迎进行投稿加入我们
---

<script setup>
import accessList from "../src/access.json"
import { VPTeamMembers } from 'vitepress/theme'

const games = accessList.slice(0,6).map(v=>({
    avatar: `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${v.id}/header_schinese.jpg?t=${Date.now()}`,
    name: v.name,
    title: 'Games',
    links: [
      { icon: 'steam', link: `https://store.steampowered.com/app/${v.id}/_/` },
    ]
  }))
</script>
<p />
<el-row>
    <el-col :span="24">
      <el-statistic title="当前已收录游戏" :value="accessList.length" />
    </el-col>
</el-row>
<VPTeamMembers size="small" :members="games" />
