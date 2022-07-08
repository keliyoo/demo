# angular-14

- TypeScript ≥ 4.6版本
- node版本需要 ≥ v14.15.0
- 13版本已经移除了对于ie的支持 [浏览器支持](https://angular.cn/guide/browser-support)

## 升级

- [更新信息](https://angular.cn/guide/update-to-latest-version)
- [升级指南](https://update.angular.io/)
- ng update @angular/core@14 @angular/cli@14
- 其他相应的跟随angular版本的包也需要升级
  - @nguniversal/builders@14  @angular-eslint/builder@14 @angular-eslint/schematics@14 @nguniversal/express-engine@14 ngx-cookie-service@14等等
- 如果使用官网组件库使用对应angular版本的版本 ng update @angular/material@14

## 主要更改

- AbstractControl 、 FormControl 、 FormGroup 和 FormArray 可以设置泛型
- FormControl构造函数的第二参数传配置对象时 用于控制初始化时是设置为初始值还是null的配置名更改 initialValueIsDefault => nonNullable
- RouterModule.forRoot的额外参数 ExtraOptions 中的 relativeLinkResolution
  - 从11开始 enabled 和 enabledBlocking功能相同
  - 初始导航在创建根组件之前开始。引导程序将被阻止，直到完成初始导航为止。该值是让服务器渲染正常工作所必需的
  - 14开始完全舍弃 enabled
- --configuration不能与ng run一起使用
  - `ng run project:server --configuration test => ng run project:server:test`

```js

this.openForm = this.fb.group({
    firstName: new FormControl<string>('Nancy'),
    lastName: new FormControl('Nancy', { nonNullable: true }),
    address: this.fb.group<{ [key in string]: string[] }>({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
    }),
    aliases: this.fb.array<AbstractControl<string | null>>([
        this.fb.control(''),
    ]),
});

RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })

```

## 标记为弃用

- 14将 ComponentFactory 标记为弃用, 推荐使用 Component, 之前版本为共存状态
- 13版本已经将编译器 View Engine 标记为弃用， 从9开始默认编译器已经为Ivy
  - NgModuleFactory Compiler CompilerFactory 等也被标记为弃用

## 示例

[13](https://keliyoo.github.io/demo/angular/angular-13/demo/dist/demo/)
[14](https://keliyoo.github.io/demo/angular/angular-14/demo/dist/demo/)
