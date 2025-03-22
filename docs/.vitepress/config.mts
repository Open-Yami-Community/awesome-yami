import { defineConfig } from "vitepress";
import accessGames from "../../src/access.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Awesome Yami",
	description: "优秀的Yami游戏合集",
	lastUpdated: true,
	base: "/awesome-yami/",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [{ text: "合集", link: "/" }],
		footer: {
			copyright: "Copyright：❤️ Contributors and Game developers ❤️",
			message: "官方群：3992050",
		},
		sidebar: [
			{
				text: "合集",
				items: [
					...new Array(accessGames.length).fill("0").map(v => ({
						text: accessGames[v].name,
						link: `/steam.html?id=${accessGames[v].id}`,
					})),
					{
						text: "加入我们",
						link: "/join us",
					},
				],
			},
		],

		socialLinks: [
			{ icon: "github", link: "https://github.com/vuejs/vitepress" },
		],
	},
});
