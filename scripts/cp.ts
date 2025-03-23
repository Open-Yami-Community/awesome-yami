import { ObjectLiteralExpression, Project } from "ts-morph";
import { readFileSync, writeFileSync } from "fs";
import request from "./request";
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
	request(`https://store.steampowered.com/api/appdetails/?appids=${ID}`).then(
		d => {
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
		}
	);
}
