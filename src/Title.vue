<template>
	<div v-if="info && isAccess" style="width: 100%">
		<div :class="styles.Title">
			{{ info.name }}（{{ info.release_date.date }}）
		</div>
		<div class="flex gap margin">
			开发者：<el-tag type="primary" v-for="item of info.developers" :hit="false" effect="plain">{{ item }}</el-tag>
		</div>
		<div class="flex gap margin">
			厂商：<el-tag type="primary" v-for="item of info.publishers" :hit="false" effect="plain">{{ item }}</el-tag>
		</div>
		<div class="flex gap margin">
			价格：{{
				info.price_overview?.final_formatted
					? info.price_overview.final_formatted
					: '未发售'
			}}
		</div>
		<div>{{ info.achievements?.highlighted && `部分成就：` }}</div>

		<div class="flex gap margin">
			<el-space direction="vertical">
				<el-space>
					<el-text line-clamp="1" tag="b" :key="index + item.name"
						v-for="(item, index) of info.achievements?.highlighted">{{ item.name }}</el-text>
				</el-space>
			</el-space>
		</div>
		<div class="flex gap margin">
			<!-- 配置 -->
			<div v-html="info.pc_requirements.minimum"></div>
			<div v-html="info.pc_requirements.recommended"></div>
		</div>

		<el-carousel indicator-position="outside">
			<el-carousel-item v-for="item in info.screenshots" :key="item.id">
				<img :src="item.path_full" alt="" />
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
		<p>
			<iframe :src="`https://store.steampowered.com/widget/${info.steam_appid}/`" frameborder="0" width="100%"
				height="190"></iframe>
		</p>
	</div>

	<el-text v-else-if="!params" size="large">可在左侧查看 yami 制作的游戏</el-text>
	<el-text v-else="!isAccess" size="large" type="danger">该游戏可能不是yami 编辑器制作或者没有加入我们</el-text>
</template>
<script setup lang="ts">
	import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
	import DataList from '../src/data';
	import accessGames from '../src/access.json';
	// @ts-expect-error
	import styles from './Title.module.less';
	import './index.css';
	import { useData } from 'vitepress';
	const { params } = useData();
	const isAccess = computed(
		() =>
			accessGames.findIndex(
				(v) =>
					params.value && params.value.id && v.id === +params.value.id
			) !== -1
	);
	const info = computed(() => {
		if (params.value && params.value.id && DataList) {
			return DataList[params.value.id];
		}
		return null;
	});
</script>
