# @adviverse/angular

Angular (>=17) ad-slot component for Adviverse. Thin wrapper over `<adviverse-ad>` from `@adviverse/element`, loaded in the browser only (SSR / Angular Universal safe).

```bash
npm i @adviverse/angular
```

Standalone:

```ts
import { AdviverseAdComponent } from '@adviverse/angular';

@Component({
  standalone: true,
  imports: [AdviverseAdComponent],
  template: `<adviverse-ad-component [tag]="'tk_…'" [sizes]="'300x250'"></adviverse-ad-component>`,
})
export class Page {}
```

NgModule:

```ts
import { AdviverseAdModule } from '@adviverse/angular';
@NgModule({ imports: [AdviverseAdModule] }) export class AppModule {}
```

Built with ng-packagr as an Ivy **partial-compilation** library (FESM2022 + `.d.ts`), so it works in consumers' AOT production `ng build`. Requires `@angular/core` and `@angular/common` >=17. Build with `npm run build`; publish from `dist/` (`cd dist && npm publish`).
