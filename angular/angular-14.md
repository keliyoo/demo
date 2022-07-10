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
- --configuration 不能与 ng run 一起使用
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

### 新特性 [独立组件](https://angular.cn/guide/standalone-components#lazy-loading-a-standalone-component)

- 设置standalone: true启用独立组件
- 独立组件直接使用imports指定它们的依赖项，而不是通过 NgModule 获取它们
- 可以使用loadComponent异步加载独立组件
- 可以像导入 NgModule 一样导入独立组件
- 使用独立组件引导应用程序

```js
// 独立组件直接使用imports指定它们的依赖项
import { MatButtonModule } from '@angular/material/button';
@Component({
    standalone: true,
    selector: 'app-standalone-demo',
    templateUrl: './standalone-demo.component.html',
    styleUrls: ['./standalone-demo.component.scss'],
    imports: [MatButtonModule]
  })
  export class StandaloneDemoComponent implements OnInit  {
    ngOnInit(): void {
  }
}

// 可以使用loadComponent异步加载独立组件
{
  path: 'standalone',
  loadComponent: () => import('./standalone-demo/standalone-demo.component').then((mod) => mod.StandaloneDemoComponent),
},

// 像导入 NgModule 一样导入独立组件
import { StandaloneDemoComponent } from './standalone-demo/standalone-demo.component';
@NgModule({
  imports: [
    StandaloneDemoComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// 使用独立组件引导应用程序
// index.html添加入口
<app-standalone-demo></app-standalone-demo>
// main.ts设置引导
import { bootstrapApplication } from '@angular/platform-browser';
import { StandaloneDemoComponent } from './app/standalone-demo/standalone-demo.component';
bootstrapApplication(StandaloneDemoComponent);
```

## 标记为弃用

- 14将 ComponentFactory 标记为弃用, 推荐使用 Component, 之前版本为共存状态
- 13版本已经将编译器 View Engine 标记为弃用， 从9开始默认编译器已经为Ivy
  - NgModuleFactory Compiler CompilerFactory 等也被标记为弃用

## 示例

[13](https://keliyoo.github.io/demo/angular/angular-13/demo/dist/demo/)
[14](https://keliyoo.github.io/demo/angular/angular-14/demo/dist/demo/)
