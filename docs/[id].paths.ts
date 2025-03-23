import accessList from "../src/access.json";
export default {
	paths() {
		return new Array(accessList.length).fill("0").map((_, v) => ({
			params: accessList[v],
		}));
	},
};
