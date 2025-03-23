// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Title from "../../../src/Title.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style.css";

export default {
	extends: DefaultTheme,
	enhanceApp({ app, router, siteData }) {
		app.use(ElementPlus);
		app.use(d => {
			d.component("Title", Title);
		});
		// ...
	},
} satisfies Theme;
