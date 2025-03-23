import { writeFileSync } from "fs";
import request from "./request";

request(
	`https://api.github.com/repos/xiaoxustudio/awesome-yami/contributors`
).then(d => {
	const res = d.data;
	if (res) {
		writeFileSync(`src/contributors.json`, JSON.stringify(res));
	} else {
		throw new Error("获取接口异常！");
	}
});
