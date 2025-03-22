<template>
    <div :class="styles.Title">{{ info.name }}（{{ info.release_date.date }}）</div>
    <div class="flex gap margin">
        开发者：<el-tag type="primary" v-for="item of info.developers">{{ item }}</el-tag>
    </div>
    <div class="flex gap margin">
        厂商：<el-tag type="primary" v-for="item of info.publishers">{{ item }}</el-tag>
    </div>
    <div class="flex gap margin">
        价格：{{ info.price_overview.final_formatted }}
    </div>
    <div>部分成就：</div>
    <div class="flex gap margin">
        <el-space direction="vertical">
            <el-space>
                <el-text line-clamp="1" tag="b" :key="index + item.name"
                    v-for="item, index of info.achievements.highlighted">{{ item.name
                    }}</el-text>
            </el-space>
        </el-space>
    </div>

    <!-- <div :class="styles.Thumbnail"><img :src="info && info.header_image" /></div> -->
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
</template>
<script setup lang="ts">
    import styles from "./Title.module.less"
    import "./index.css"
    interface TitleProps {
        info: any
    }
    const { info } = defineProps<TitleProps>()
    console.log(info)
</script>