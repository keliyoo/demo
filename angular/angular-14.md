# angular-14

- 使用 TypeScript 4.6版本
- node版本需要 ≥ v14.15.0

- 升级命令
  - ng update @angular/core@14 @angular/cli@14
  - 如果使用官网组件库使用对应angular版本的版本 ng update @angular/material@14

- AbstractControl 、 FormControl 、 FormGroup 和 FormArray 可以设置泛型
- FormControl构造函数的第二参数传配置对象时 用于控制初始化时是设置为初始值还是null的配置名更改 initialValueIsDefault => nonNullable

## 更改

- FormControlOptions#initialValueIsDefault ==> FormControlOptions#nonNullable
- ErrorEvent ==> ProgressEvent
- ProgressEvent ==> getNgModuleById
- RouterModule.forRoot的额外参数 ExtraOptions 中的 relativeLinkResolution
  - 从11开始 enabled 和 enabledBlocking功能相同
  - 14开始完全舍弃 enabled

## 标记为弃用

- 14将 ComponentFactory 标记为弃用, 推荐使用 Component, 之前版本为共存状态
- 编译器 View Engine 标记为弃用， 从9开始默认编译器已经为Ivy
  - NgModuleFactory Compiler CompilerFactory 等也会被弃用
