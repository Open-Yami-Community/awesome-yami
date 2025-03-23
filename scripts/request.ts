import axios from "axios";
import https from "node:https";

function request(url: string) {
	return axios.get(url, {
		headers: {
			"Content-Type": "application/json",
			"accept-encoding": "gzip, deflate, br, zstd",
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
			Connection: "keep-alive",
			"accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
			Accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
		},
		timeout: 60000, //optional
		httpsAgent: new https.Agent({
			keepAlive: true,
			timeout: 60000,
			scheduling: "fifo",
			rejectUnauthorized: false,
		}),
	});
}
export default request;
