import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, Input, NgModule, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/** <adviverse-ad-component [tag]="'tk_…'" [sizes]="'300x250'"> — renders an <adviverse-ad> custom element. */
@Component({
  selector: 'adviverse-ad-component',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `<adviverse-ad [attr.tag]="tag" [attr.sizes]="sizes"></adviverse-ad>`,
})
export class AdviverseAdComponent implements OnInit {
  @Input() tag!: string;
  @Input() sizes?: string;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    // Client only: never touch the DOM (or import the element) during Angular Universal SSR.
    if (isPlatformBrowser(this.platformId)) void import('@adviverse/element');
  }
}

/** For non-standalone consumers. */
@NgModule({ imports: [AdviverseAdComponent], exports: [AdviverseAdComponent] })
export class AdviverseAdModule {}
