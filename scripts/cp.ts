import { ObjectLiteralExpression, Project } from "ts-morph";
import axios from "axios";
import { readFileSync, writeFileSync } from "fs";
import https from "node:https";
console.log("Aawesome yami --Creator tool 1.0");

const project = new Project();
project.addSourceFilesAtPaths("./src/data/*.ts");
const sourceFile = project.getSourceFiles()[0];

const ID = parseInt(process.argv[2]);

if (!ID) {
	throw new Error("请输入ID");
}

if (sourceFile) {
	// 写入
	const accessList = JSON.parse(readFileSync(`src/access.json`).toString()) as {
		id: number;
		name: string;
	}[];
	console.log("————————————网络获取数据中————————————");
	axios
		.get(`https://store.steampowered.com/api/appdetails/?appids=${ID}`, {
			headers: {
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
		})
		.then(d => {
			const res = d.data;
			if (res) {
				const data = res[`${ID}`].data;
				if (data) {
					const v = accessList.find(v => v.id === ID);
					if (v) {
						console.warn("已存在ID，正在更新数据");
					} else {
						console.log("————————————添加新数据————————————");
						let imports = sourceFile.getImportDeclarations();
						const lastImport = imports[imports.length - 1];
						if (lastImport) {
							sourceFile.insertImportDeclaration(
								lastImport.getChildIndex() + 1,
								{
									moduleSpecifier: `./${ID}.json`,
									defaultImport: `Data${ID}`,
								}
							);
						} else {
							sourceFile.addImportDeclaration({
								moduleSpecifier: `./${ID}.json`,
								defaultImport: `Data${ID}`,
							});
						}
						const exportsMap = sourceFile.getExportedDeclarations();
						const defaultExpress = exportsMap.get("default")?.[0];
						if (
							defaultExpress &&
							defaultExpress instanceof ObjectLiteralExpression
						) {
							defaultExpress
								.addProperty("xuran")
								.replaceWithText(`${ID}: Data${ID},`);
						}

						sourceFile.saveSync();
						accessList.push({
							id: ID,
							name: data.name,
						});
					}
					writeFileSync(`src/data/${ID}.json`, JSON.stringify(data));
					writeFileSync(`src/access.json`, JSON.stringify(accessList));
					console.log(`————————————更新：${data.name}完成！————————————`);
				} else {
					throw new Error("未找到该游戏！请检查ID");
				}
			} else {
				throw new Error("获取接口异常！");
			}
		});
}
