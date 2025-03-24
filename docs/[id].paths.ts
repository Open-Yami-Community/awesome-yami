import accessList from '../src/access.json';
export default {
	paths() {
		return accessList.map((_, v) => ({
			params: accessList[v]
		}));
	}
};
