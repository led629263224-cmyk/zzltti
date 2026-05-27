# WTTI

站点首页在根目录 `index.html`，用于进入两个板块：

- `tools/`：工具板块列表页
- `tools/personality-test/`：战雷人格测试工具
- `games/`：小游戏板块列表页
- `games/funankuaipao-main/`：阜南快跑小游戏

根目录保留站点入口、公共说明和部署配置文件。

首页作者留言保存在根目录 `messages.txt`。格式示例：

```text
[2026-05-27]
这里写一条留言。
这里写第二条留言。
```

页面会按日期分组展示留言。

本地预览建议运行：

```bash
python -m http.server 8000
```

然后访问 `http://127.0.0.1:8000/`。如果直接在浏览器里打开 `C:\Users\62926\Desktop\wtti` 文件夹，会看到目录索引；请打开根目录下的 `index.html`，或使用上面的本地服务地址。
