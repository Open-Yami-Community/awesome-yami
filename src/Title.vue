<template>
    <div v-if="info && isAccess" style="width: 100%;">
        <div :class="styles.Title">{{ info.name }}（{{ info.release_date.date }}）</div>
        <div class="flex gap margin">
            开发者：<el-tag type="primary" v-for="item of info.developers">{{ item }}</el-tag>
        </div>
        <div class="flex gap margin">
            厂商：<el-tag type="primary" v-for="item of info.publishers">{{ item }}</el-tag>
        </div>
        <div class="flex gap margin">
            价格：{{ info.price_overview?.final_formatted ? info.price_overview.final_formatted : '未发售' }}
        </div>
        <div>{{ info.achievements?.highlighted && `部分成就：` }}</div>
        <div class="flex gap margin">
            <el-space direction="vertical">
                <el-space>
                    <el-text line-clamp="1" tag="b" :key="index + item.name"
                        v-for="item, index of info.achievements?.highlighted">{{ item.name
                        }}</el-text>
                </el-space>
            </el-space>
        </div>

        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in info.screenshots" :key="item.id">
                <img :src="item.path_full" alt="">
            </el-carousel-item>
        </el-carousel>

        <div :class="styles.Title">描述</div>
        <p>{{ info.short_description }}</p>


        <!-- 关于 -->
        <el-space direction="vertical">
            <div v-html="info.about_the_game"></div>
        </el-space>

        <!-- steam查看 -->
        <div :class="styles.Title">查看</div>
        <p><iframe :src="`https://store.steampowered.com/widget/${info.steam_appid}/`" frameborder="0" width="646"
                height="190"></iframe>
        </p>
    </div>

    <el-text v-else-if="!id" size="large">可在左侧查看 yami 制作的游戏</el-text>
    <el-text v-else="!isAccess" size="large" type="danger">该游戏可能不是yami 编辑器制作或者没有加入我们</el-text>
</template>
<script setup lang="ts">
    import { computed, onMounted, onUnmounted, ref, watch } from "vue"
    import DataList from "../src/data";
    import accessGames from "../src/access.json";
    // @ts-expect-error
    import styles from "./Title.module.less"
    import "./index.css"
    import { useRoute } from "vitepress";
    const route = useRoute()
    const loc = typeof location !== 'undefined' ? location : '' // ssr
    const id = ref(new URLSearchParams(loc?.search.toString() || "").get('id') || -1)
    const _cache = ref(0)
    const isAccess = computed(() => accessGames.findIndex(v => id.value && v.id === +id.value) !== -1)
    const info = computed(() => {
        if (id && DataList) {
            return DataList[id.value]
        }
        return null
    })

    watch(_cache, () => {
        id.value = new URLSearchParams(loc?.search.toString() || "").get('id') || -1
    }, { immediate: true })

    onMounted(() => {
        const history = window.history
        const pushState = history.pushState;
        history.pushState = function (state, title, url) {
            // @ts-ignore
            if (typeof history.onpushstate == "function") {
                // @ts-ignore
                history.onpushstate({ state: state, title: title, url: url });
            }
            _cache.value = _cache.value + 1
            return pushState.apply(history, arguments);
        };

        const replaceState = history.replaceState;
        history.replaceState = function (state, title, url) {
            // @ts-ignore
            if (typeof history.onreplacestate == "function") {
                // @ts-ignore
                history.onreplacestate({ state: state, title: title, url: url });
            }
            _cache.value = _cache.value + 1
            return replaceState.apply(history, arguments);
        }
        onUnmounted(() => {
            history.pushState = pushState
            history.replaceState = replaceState
        })
    })

</script>
