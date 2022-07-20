# my-monorepo

## lerna

[命令](https://lerna.js.org/docs/api-reference/commands)

## 使用流程

- 初始化项目 `npx lerna@latest init`
- 安装nx `yarn add nx -D`

- 使用lerna创建packages

### 使用workspace

> 自 Lerna 创建以来，所有主要的包管理器（npm、yarn 和 pnpm）都添加了在同一存储库和重复数据删除节点模块中交叉链接包的功能

- lerna提升命令
  - lerna bootstrap --hoist
  - 默认使用npm安装
  - 无法在lerna.json中npmClient设置为yarn, 会报错

- 配置yarn工作区
  - lerna.json中设置包管理器为yarn `"npmClient": "yarn"`
  - lerna.json中启用工作区功能
  - 将lerna.json中packages的值设置到package.json `"workspaces": [**]`

### 创建packages

- 可以通过lerna创建
  - lerna create name [loc]
  - loc默认为packages第一项
- 也可以直接创建
  - yarn create vite my-react-package --template react-ts
- 也可以复制已有的项目

### 查看

> lerna ls [配置|筛选器]

- 常用
  - lerna ls 只显示非私有包的列表
  - lerna ll 等同于 lerna ls -l 会显示版本和位置信息
  - lerna la 等同于 lerna ls -la 会显示所有的包且包含显示版本和位置信息

### 项目中添加依赖

- 使用lerna添加
  - lerna add 包名 [--scope=packages名] [--dev|--peer]
  - 不指定scope会直接添加到所有的包中
- 配置yarn工作区后可以直接package文件夹中使用yarn安装, 会自动获得提升

## nx

> 启用nx构建 `yarn add nx -D`
> 在lerna.json中启用 nx `"useNx": true`
> 项目可视化 `npx nx graph`
