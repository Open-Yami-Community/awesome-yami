import { writeFileSync } from 'fs';
import request from './request';

request(
	`https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=1964480&langugae=all&lang_list=6_0`
).then((d) => {
	const res = d.data;
	if (res) {
		writeFileSync(`src/news.json`, JSON.stringify(res.appnews));
	} else {
		throw new Error('获取接口异常！');
	}
});
