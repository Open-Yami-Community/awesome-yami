---
outline: deep
title: Awesome Yami
---

# 加入我们

在官方仓库提交 PR 即可，待合并后，您提交的内容将会在此站点可见

# 游戏贡献

1. 打开`https://store.steampowered.com/api/appdetails/?appids=你游戏的steam_appid`网址，将数据复制到`src\data\你游戏的steam_appid.json`

2. 修改`src\data\index.ts`中将你的 json 数据文件导出，导出命名规范为`Data+你游戏的steam_appid`，最后导出的写法按照其他的一样写法就行

3. 修改`src\access.json`后提交 pr 即可
