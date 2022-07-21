# my-monorepo

- monorepo
  - 单体代码库: 版本控制系统的单个代码库里包含了许多项目的代码
  - 项目虽然有可能是相关的，但通常在逻辑上是独立的
- 优点
  - 可见性：每个人都可以看到其他人的代码
  - 更简单的依赖关系管理：共享库可以不需要在发布后使用
  - 唯一依赖源：共享库只会有一个版本
  - 一致性：放在同一个仓库中可以更方便的执行代码质量标准和统一的风格
  - 共享时间线：可以立即知道共享库的变化
  - 原子提交：可以在修改共享库的同时在使用的地方同时修改，防止版本不统一
  - 统一构建以及统一的CI/CD
- 缺点
  - 所有权：配置项目修改权限时会比较麻烦
  - 大量的数据：提交中包含了所有项目可能会有很多
  - 性能问题：多个项目放在一起可能会导致编辑器卡顿，需要配置排除掉不需要关心的部分

## lerna

[命令](https://lerna.js.org/docs/api-reference/commands)

- 版本控制策略
  - 默认为固定模式
    - 每次默认会发布更新会改变所有包的版本号为同一版本
    - 可以通过命令配置忽略一些包
  - 可选为 独立模式, 可在项目初始化时设置, 也可以通过修改lerna.json设置 `"version": "independent"`

## 使用流程

> 初始化
> npx lerna@latest init
> yarn add nx -D

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

### 更新版本

> lerna version [语义化版本|自定义版本] [配置]
> 语义化版本 [major | minor | patch | premajor | preminor | prepatch | prerelease]

- lerna version
  - 先回检查和之前版本有没有变动, 无变动不执行操作
  - 有变动会转到选择的新版本版本号的列表 几种语义化版本/自定义版本
  - 确认后会自动更改包的版本号, 并打上tag

### 运行package中的命令

> lerna run packages命令 [--scope=packages名] [配置]

- 未指定scope会在所有的packages中执行这个命令
- 默认是按照依赖的按照先后顺序执行命令
- --no-sort允许以任何顺序执行, 一般用于测试中使用

## nx

> 启用nx构建 `yarn add nx -D`
> 在lerna.json中启用 nx `"useNx": true`
> 项目可视化 `npx nx graph`

```json
{
  "extends": "nx/presets/npm.json",
  // 设置 run 缓存任务结果
  "tasksRunnerOptions": {
    "default": {
      "runner": "nx/tasks-runners/default",
      "options": {
        // 配置哪个命令需要缓存结果
        "cacheableOperations": ["build"],
        // 同时执行的脚本的进程数，默认为3
        "parallel": 5
      }
    }
  }
}
```

## 相关资料

- [What is monorepo](https://semaphoreci.com/blog/what-is-monorepo)
- [What is monorepo译文](https://www.jianshu.com/p/c10d0b8c5581)
- [Lerna命令](https://lerna.js.org/docs/api-reference/commands)
- [nx文档](https://nx.dev/getting-started/intro)
