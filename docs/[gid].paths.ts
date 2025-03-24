import newsList from '../src/news.json';
export default {
	paths() {
		return newsList.newsitems.map((_, v) => ({
			params: newsList.newsitems[v]
		}));
	}
};
