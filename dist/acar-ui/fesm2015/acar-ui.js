import { Component, Input, ViewEncapsulation, HostBinding, NgModule, Injectable, defineInjectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AcarUiComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
AcarUiComponent.decorators = [
    { type: Component, args: [{
                selector: 'acar-ui-test',
                template: `
    <p>
      Show me what you've got!
    </p>
  `,
                styles: []
            },] },
];
/** @nocollapse */
AcarUiComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class CarouselComponent {
    constructor() {
        this.loopable = true;
        this.interval = 4000;
        this.slides = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.lastIndex = this.slides.length;
        if (this.fivePoint)
            this.init5Point();
        else
            this.init3Point();
        // TODO : ImagesLoaded
        setTimeout(() => this.isLoading = false, 300);
    }
    /**
     * @return {?}
     */
    init3Point() {
        this.iterable = this.lastIndex > 1;
        this.positions = {
            'prev': this.lastIndex,
            'current': 1,
            'next': 2
        };
    }
    /**
     * @return {?}
     */
    init5Point() {
        this.loopable = this.lastIndex >= 5;
        this.iterable = this.lastIndex > 3;
        this.positions = {
            'deepPrev': this.loopable ? this.lastIndex : 0,
            'prev': 1,
            'current': 2,
            'next': 3,
            'deepNext': this.iterable ? 4 : null
        };
    }
    /**
     * @param {?} slideItem
     * @return {?}
     */
    slideClick(slideItem) {
        this.selectedSlideItem = slideItem;
    }
    /**
     * @return {?}
     */
    startInterval() {
        clearInterval(this.autoPosition);
        this.autoPosition = setInterval(() => {
            this.next();
        }, this.interval);
    }
    /**
     * @return {?}
     */
    get canGoForward() {
        if (this.fivePoint)
            return this.positions.next < this.lastIndex
                || this.infinite && this.loopable;
        else
            return this.positions.current !== this.lastIndex
                || this.infinite && this.loopable;
    }
    /**
     * @return {?}
     */
    get canGoBackward() {
        return (this.fivePoint ?
            this.positions.prev > 1 :
            this.positions.current !== 1)
            || this.infinite && this.loopable;
    }
    /**
     * @return {?}
     */
    next() {
        if (this.canGoForward)
            for (let pos in this.positions)
                this.positions[pos] = this.positions[pos] < this.lastIndex ? this.positions[pos] + 1 : 1;
        // this.startInterval();
    }
    /**
     * @return {?}
     */
    prev() {
        if (this.canGoBackward)
            for (let pos in this.positions)
                this.positions[pos] = this.positions[pos] > 1 ? this.positions[pos] - 1 : this.lastIndex;
        // this.startInterval();
    }
    /**
     * @param {?} i
     * @return {?}
     */
    setPosition(i) {
        return {
            'deepPrev': i === this.positions.deepPrev,
            'prev': i === this.positions.prev,
            'current': i === this.positions.current,
            'next': i === this.positions.next,
            'deepNext': i === this.positions.deepNext
        };
    }
    /**
     * @return {?}
     */
    get sliderButtonsHidden() {
        return !this.iterable && (!this.isMobile || this.isFullScreen);
    }
    /**
     * @return {?}
     */
    get isDefault() { return !this.custom; }
    /**
     * @return {?}
     */
    get isReady() { return !this.isLoading; }
}
CarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'acar-ui-carousel',
                template: `

<!-- Slides Wrapper
Wrapper for slide-items. Could be useful for styling in some cases. -->

<!-- <section class="slides"> -->


  <!-- Individual Slide Item
  (i + 1) for 1 indexed position due to jumpTo(position) -->

  <div
    *ngFor="let slide of slides; let i=index"
    class="slide-item"
    [ngClass]="setPosition(i+1)">


    <!-- Customizable Slide Inner

    This should be as extensible as possible.
    Provides iterable UI element. Custom or not.
    [ NOTICE ] => styles are not encapsulated! Use BEM naming conventions -->

    <ng-container
      *ngTemplateOutlet="custom ? custom : default; context:{$implicit: slide}">
    </ng-container>

    <ng-template #default>
      <img [src]="slide.img"/>
      <div class="slide-item__overlay"></div>
      <div class="slide-item__captions">
        <h1>{{slide.heading}}</h1>
        <p>{{slide.predesc}}</p>
      </div>
    </ng-template>

  </div>
<!-- </section> -->


<!-- Slider Buttons

prev and next buttons should be acar-ui-icon
icon is bound to mask-url and easily customizable with global styles. -->

<section class="slider__buttons" [hidden]="sliderButtonsHidden">
  <div class="slider__button slider__button--prev" (click)="prev()"></div>
  <div class="slider__button slider__button--next" (click)="next()"></div>
</section>`,
                styles: [`acar-ui-carousel{position:relative;width:100%;height:100%;overflow:hidden;display:block;background-color:#222}acar-ui-carousel .button{cursor:pointer;font-weight:700}acar-ui-carousel.default{-webkit-perspective:800px;perspective:800px;-webkit-perspective-origin:bottom;perspective-origin:bottom;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}acar-ui-carousel.default.ready .current img{-webkit-transform:scale(1.15);transform:scale(1.15)}acar-ui-carousel.default .slide-item{position:absolute;width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden;opacity:0;transition:.6s;-webkit-transform-origin:bottom;transform-origin:bottom}acar-ui-carousel.default .slide-item img{width:100%;transition:transform 4s linear .8s;transition:transform 4s linear .8s,-webkit-transform 4s linear .8s}acar-ui-carousel.default .prev{-webkit-transform:translate3d(0,50%,100px) rotateX(-10deg);transform:translate3d(0,50%,100px) rotateX(-10deg)}acar-ui-carousel.default .prev .slide-item__captions{-webkit-transform:translate3d(0,100px,0);transform:translate3d(0,100px,0)}acar-ui-carousel.default .current{-webkit-transform:translate3d(0,0,0) rotateX(0);transform:translate3d(0,0,0) rotateX(0);transition-delay:.3s;opacity:1}acar-ui-carousel.default .current .slide-item__captions{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}acar-ui-carousel.default .next{-webkit-transform:translate3d(0,10%,-100px) rotateX(20deg);transform:translate3d(0,10%,-100px) rotateX(20deg)}acar-ui-carousel.default .next .slide-item__captions{-webkit-transform:translate3d(0,-100px,0);transform:translate3d(0,-100px,0)}acar-ui-carousel.default .slide-item__captions{position:absolute;bottom:64px;left:64px;color:#fff;font-weight:700;text-shadow:15px 20px 60px #222;transition:transform 1s .3s;transition:transform 1s .3s,-webkit-transform 1s .3s}acar-ui-carousel.default .slide-item__captions *{margin:0}acar-ui-carousel.default .slide-item__captions h1{font-size:4em}acar-ui-carousel.default .slide-item__captions p{font-size:1.5em}acar-ui-carousel.default .slide-item__overlay{width:100%;height:100%;background-color:rgba(0,0,0,.4);position:absolute;top:0}acar-ui-carousel.default .slider__buttons{position:absolute;bottom:64px;right:64px;z-index:1}acar-ui-carousel.default .slider__button{background-color:#fff;opacity:.6;padding:16px;color:#fff;display:inline-block;transition:opacity .3s}acar-ui-carousel.default .slider__button:hover{opacity:1}`],
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
CarouselComponent.ctorParameters = () => [];
CarouselComponent.propDecorators = {
    infinite: [{ type: Input }],
    interval: [{ type: Input }],
    fivePoint: [{ type: Input }],
    slides: [{ type: Input }],
    custom: [{ type: Input }],
    isDefault: [{ type: HostBinding, args: ['class.default',] }],
    isReady: [{ type: HostBinding, args: ['class.ready',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AcarUiModule {
}
AcarUiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BrowserModule
                ],
                declarations: [
                    AcarUiComponent,
                    CarouselComponent
                ],
                exports: [
                    AcarUiComponent,
                    CarouselComponent
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class AcarUiService {
    constructor() { }
}
AcarUiService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
AcarUiService.ctorParameters = () => [];
/** @nocollapse */ AcarUiService.ngInjectableDef = defineInjectable({ factory: function AcarUiService_Factory() { return new AcarUiService(); }, token: AcarUiService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { AcarUiModule, AcarUiService, AcarUiComponent, CarouselComponent };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNhci11aS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYWNhci11aS9saWIvYWNhci11aS5jb21wb25lbnQudHMiLCJuZzovL2FjYXItdWkvbGliL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIm5nOi8vYWNhci11aS9saWIvYWNhci11aS5tb2R1bGUudHMiLCJuZzovL2FjYXItdWkvbGliL2FjYXItdWkuc2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhY2FyLXVpLXRlc3QnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgU2hvdyBtZSB3aGF0IHlvdSd2ZSBnb3QhXG4gICAgPC9wPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFjYXJVaUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FjYXItdWktY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZTogYFxuXG48IS0tIFNsaWRlcyBXcmFwcGVyXG5XcmFwcGVyIGZvciBzbGlkZS1pdGVtcy4gQ291bGQgYmUgdXNlZnVsIGZvciBzdHlsaW5nIGluIHNvbWUgY2FzZXMuIC0tPlxuXG48IS0tIDxzZWN0aW9uIGNsYXNzPVwic2xpZGVzXCI+IC0tPlxuXG5cbiAgPCEtLSBJbmRpdmlkdWFsIFNsaWRlIEl0ZW1cbiAgKGkgKyAxKSBmb3IgMSBpbmRleGVkIHBvc2l0aW9uIGR1ZSB0byBqdW1wVG8ocG9zaXRpb24pIC0tPlxuXG4gIDxkaXZcbiAgICAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzOyBsZXQgaT1pbmRleFwiXG4gICAgY2xhc3M9XCJzbGlkZS1pdGVtXCJcbiAgICBbbmdDbGFzc109XCJzZXRQb3NpdGlvbihpKzEpXCI+XG5cblxuICAgIDwhLS0gQ3VzdG9taXphYmxlIFNsaWRlIElubmVyXG5cbiAgICBUaGlzIHNob3VsZCBiZSBhcyBleHRlbnNpYmxlIGFzIHBvc3NpYmxlLlxuICAgIFByb3ZpZGVzIGl0ZXJhYmxlIFVJIGVsZW1lbnQuIEN1c3RvbSBvciBub3QuXG4gICAgWyBOT1RJQ0UgXSA9PiBzdHlsZXMgYXJlIG5vdCBlbmNhcHN1bGF0ZWQhIFVzZSBCRU0gbmFtaW5nIGNvbnZlbnRpb25zIC0tPlxuXG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjdXN0b20gPyBjdXN0b20gOiBkZWZhdWx0OyBjb250ZXh0OnskaW1wbGljaXQ6IHNsaWRlfVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0PlxuICAgICAgPGltZyBbc3JjXT1cInNsaWRlLmltZ1wiLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzbGlkZS1pdGVtX19vdmVybGF5XCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2xpZGUtaXRlbV9fY2FwdGlvbnNcIj5cbiAgICAgICAgPGgxPnt7c2xpZGUuaGVhZGluZ319PC9oMT5cbiAgICAgICAgPHA+e3tzbGlkZS5wcmVkZXNjfX08L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gIDwvZGl2PlxuPCEtLSA8L3NlY3Rpb24+IC0tPlxuXG5cbjwhLS0gU2xpZGVyIEJ1dHRvbnNcblxucHJldiBhbmQgbmV4dCBidXR0b25zIHNob3VsZCBiZSBhY2FyLXVpLWljb25cbmljb24gaXMgYm91bmQgdG8gbWFzay11cmwgYW5kIGVhc2lseSBjdXN0b21pemFibGUgd2l0aCBnbG9iYWwgc3R5bGVzLiAtLT5cblxuPHNlY3Rpb24gY2xhc3M9XCJzbGlkZXJfX2J1dHRvbnNcIiBbaGlkZGVuXT1cInNsaWRlckJ1dHRvbnNIaWRkZW5cIj5cbiAgPGRpdiBjbGFzcz1cInNsaWRlcl9fYnV0dG9uIHNsaWRlcl9fYnV0dG9uLS1wcmV2XCIgKGNsaWNrKT1cInByZXYoKVwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic2xpZGVyX19idXR0b24gc2xpZGVyX19idXR0b24tLW5leHRcIiAoY2xpY2spPVwibmV4dCgpXCI+PC9kaXY+XG48L3NlY3Rpb24+YCxcbiAgc3R5bGVzOiBbYGFjYXItdWktY2Fyb3VzZWx7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTpibG9jaztiYWNrZ3JvdW5kLWNvbG9yOiMyMjJ9YWNhci11aS1jYXJvdXNlbCAuYnV0dG9ue2N1cnNvcjpwb2ludGVyO2ZvbnQtd2VpZ2h0OjcwMH1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHR7LXdlYmtpdC1wZXJzcGVjdGl2ZTo4MDBweDtwZXJzcGVjdGl2ZTo4MDBweDstd2Via2l0LXBlcnNwZWN0aXZlLW9yaWdpbjpib3R0b207cGVyc3BlY3RpdmUtb3JpZ2luOmJvdHRvbTstd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDt0cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2R9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0LnJlYWR5IC5jdXJyZW50IGltZ3std2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjE1KTt0cmFuc2Zvcm06c2NhbGUoMS4xNSl9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVte3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO292ZXJmbG93OmhpZGRlbjtvcGFjaXR5OjA7dHJhbnNpdGlvbjouNnM7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOmJvdHRvbTt0cmFuc2Zvcm0tb3JpZ2luOmJvdHRvbX1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLnNsaWRlLWl0ZW0gaW1ne3dpZHRoOjEwMCU7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gNHMgbGluZWFyIC44czt0cmFuc2l0aW9uOnRyYW5zZm9ybSA0cyBsaW5lYXIgLjhzLC13ZWJraXQtdHJhbnNmb3JtIDRzIGxpbmVhciAuOHN9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5wcmV2ey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsNTAlLDEwMHB4KSByb3RhdGVYKC0xMGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsNTAlLDEwMHB4KSByb3RhdGVYKC0xMGRlZyl9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5wcmV2IC5zbGlkZS1pdGVtX19jYXB0aW9uc3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMHB4LDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMHB4LDApfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuY3VycmVudHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCkgcm90YXRlWCgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApIHJvdGF0ZVgoMCk7dHJhbnNpdGlvbi1kZWxheTouM3M7b3BhY2l0eToxfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuY3VycmVudCAuc2xpZGUtaXRlbV9fY2FwdGlvbnN7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCl9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5uZXh0ey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAlLC0xMDBweCkgcm90YXRlWCgyMGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAlLC0xMDBweCkgcm90YXRlWCgyMGRlZyl9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5uZXh0IC5zbGlkZS1pdGVtX19jYXB0aW9uc3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLC0xMDBweCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwtMTAwcHgsMCl9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVtX19jYXB0aW9uc3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206NjRweDtsZWZ0OjY0cHg7Y29sb3I6I2ZmZjtmb250LXdlaWdodDo3MDA7dGV4dC1zaGFkb3c6MTVweCAyMHB4IDYwcHggIzIyMjt0cmFuc2l0aW9uOnRyYW5zZm9ybSAxcyAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gMXMgLjNzLC13ZWJraXQtdHJhbnNmb3JtIDFzIC4zc31hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLnNsaWRlLWl0ZW1fX2NhcHRpb25zICp7bWFyZ2luOjB9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVtX19jYXB0aW9ucyBoMXtmb250LXNpemU6NGVtfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGUtaXRlbV9fY2FwdGlvbnMgcHtmb250LXNpemU6MS41ZW19YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVtX19vdmVybGF5e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC40KTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MH1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLnNsaWRlcl9fYnV0dG9uc3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206NjRweDtyaWdodDo2NHB4O3otaW5kZXg6MX1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLnNsaWRlcl9fYnV0dG9ue2JhY2tncm91bmQtY29sb3I6I2ZmZjtvcGFjaXR5Oi42O3BhZGRpbmc6MTZweDtjb2xvcjojZmZmO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3RyYW5zaXRpb246b3BhY2l0eSAuM3N9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZXJfX2J1dHRvbjpob3ZlcntvcGFjaXR5OjF9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGlzTG9hZGluZztcbiAgaXNNb2JpbGU7XG4gIGlzRnVsbFNjcmVlbjtcbiAgbGFzdEluZGV4O1xuICBpdGVyYWJsZTtcbiAgbG9vcGFibGUgPSB0cnVlO1xuICBwb3NpdGlvbnM7XG4gIGF1dG9Qb3NpdGlvbjtcbiAgc2VsZWN0ZWRTbGlkZUl0ZW06IGFueTtcblxuICBASW5wdXQoKSBpbmZpbml0ZTtcblxuICBASW5wdXQoKSBpbnRlcnZhbCA9IDQwMDA7XG5cbiAgQElucHV0KCkgZml2ZVBvaW50O1xuXG4gIEBJbnB1dCgpIHNsaWRlczogYW55W10gPSBbXTtcblxuICBASW5wdXQoKSBjdXN0b206IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubGFzdEluZGV4ID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuXG4gICAgaWYodGhpcy5maXZlUG9pbnQpXG4gICAgICB0aGlzLmluaXQ1UG9pbnQoKVxuICAgIGVsc2VcbiAgICAgIHRoaXMuaW5pdDNQb2ludCgpXG5cbiAgICAvLyBUT0RPIDogSW1hZ2VzTG9hZGVkXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmlzTG9hZGluZyA9IGZhbHNlLCAzMDApXG4gIH1cblxuXG4gIGluaXQzUG9pbnQoKSB7XG4gICAgdGhpcy5pdGVyYWJsZSA9IHRoaXMubGFzdEluZGV4ID4gMTtcbiAgICB0aGlzLnBvc2l0aW9ucyA9IHtcbiAgICAgICdwcmV2JyAgIDogdGhpcy5sYXN0SW5kZXgsXG4gICAgICAnY3VycmVudCc6IDEsXG4gICAgICAnbmV4dCcgICA6IDJcbiAgICB9XG4gIH1cblxuXG4gIGluaXQ1UG9pbnQoKSB7XG4gICAgdGhpcy5sb29wYWJsZSA9IHRoaXMubGFzdEluZGV4ID49IDU7XG4gICAgdGhpcy5pdGVyYWJsZSA9IHRoaXMubGFzdEluZGV4ID4gMztcbiAgICB0aGlzLnBvc2l0aW9ucyA9IHtcbiAgICAgICdkZWVwUHJldicgOiB0aGlzLmxvb3BhYmxlID8gdGhpcy5sYXN0SW5kZXggOiAwLFxuICAgICAgJ3ByZXYnICAgICA6IDEsXG4gICAgICAnY3VycmVudCcgIDogMixcbiAgICAgICduZXh0JyAgICAgOiAzLFxuICAgICAgJ2RlZXBOZXh0JyA6IHRoaXMuaXRlcmFibGUgPyA0IDogbnVsbFxuICAgIH1cbiAgfVxuXG5cbiAgc2xpZGVDbGljayhzbGlkZUl0ZW0pIHtcbiAgICB0aGlzLnNlbGVjdGVkU2xpZGVJdGVtID0gc2xpZGVJdGVtO1xuICB9XG5cblxuICBzdGFydEludGVydmFsKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUG9zaXRpb24pO1xuXG4gICAgdGhpcy5hdXRvUG9zaXRpb24gPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLm5leHQoKVxuICAgIH0sIHRoaXMuaW50ZXJ2YWwpXG4gIH1cblxuXG4gIC8vIERlY2lkZXMgaWYgaXQgaXMgcG9zc2libGUgdG8gaXRlcmF0ZSBmb3J3YXJkLiBNb3JlIHJlYWRhYmxlLlxuICBnZXQgY2FuR29Gb3J3YXJkKCkge1xuICAgIGlmKHRoaXMuZml2ZVBvaW50KVxuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb25zLm5leHQgPCB0aGlzLmxhc3RJbmRleFxuICAgICAgICB8fCB0aGlzLmluZmluaXRlICYmIHRoaXMubG9vcGFibGVcbiAgICBlbHNlIFxuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb25zLmN1cnJlbnQgIT09IHRoaXMubGFzdEluZGV4XG4gICAgICAgIHx8IHRoaXMuaW5maW5pdGUgJiYgdGhpcy5sb29wYWJsZVxuICB9XG5cblxuICAvLyBEZWNpZGVzIGlmIGl0IGlzIHBvc3NpYmxlIHRvIGl0ZXJhdGUgYmFja3dhcmQuIFNob3J0ZXIuXG4gIGdldCBjYW5Hb0JhY2t3YXJkKCkge1xuICAgIHJldHVybiAodGhpcy5maXZlUG9pbnQgP1xuICAgICAgdGhpcy5wb3NpdGlvbnMucHJldiA+IDEgOlxuICAgICAgdGhpcy5wb3NpdGlvbnMuY3VycmVudCAhPT0gMSlcbiAgICAgICAgfHwgdGhpcy5pbmZpbml0ZSAmJiB0aGlzLmxvb3BhYmxlXG4gIH1cblxuXG4gIG5leHQoKSB7XG4gICAgaWYodGhpcy5jYW5Hb0ZvcndhcmQpXG4gICAgICBmb3IobGV0IHBvcyBpbiB0aGlzLnBvc2l0aW9ucylcbiAgICAgICAgdGhpcy5wb3NpdGlvbnNbcG9zXSA9IHRoaXMucG9zaXRpb25zW3Bvc10gPCB0aGlzLmxhc3RJbmRleCA/IHRoaXMucG9zaXRpb25zW3Bvc10gKyAxIDogMVxuXG4gICAgLy8gdGhpcy5zdGFydEludGVydmFsKCk7XG4gIH1cblxuXG4gIHByZXYoKSB7XG4gICAgaWYodGhpcy5jYW5Hb0JhY2t3YXJkKVxuICAgICAgZm9yKGxldCBwb3MgaW4gdGhpcy5wb3NpdGlvbnMpXG4gICAgICAgIHRoaXMucG9zaXRpb25zW3Bvc10gPSB0aGlzLnBvc2l0aW9uc1twb3NdID4gMSA/IHRoaXMucG9zaXRpb25zW3Bvc10gLSAxIDogdGhpcy5sYXN0SW5kZXhcblxuICAgIC8vIHRoaXMuc3RhcnRJbnRlcnZhbCgpO1xuICB9XG5cblxuICBzZXRQb3NpdGlvbihpOiBudW1iZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RlZXBQcmV2JzogIGkgPT09IHRoaXMucG9zaXRpb25zLmRlZXBQcmV2LFxuICAgICAgJ3ByZXYnOiAgICAgIGkgPT09IHRoaXMucG9zaXRpb25zLnByZXYsXG4gICAgICAnY3VycmVudCc6ICAgaSA9PT0gdGhpcy5wb3NpdGlvbnMuY3VycmVudCxcbiAgICAgICduZXh0JzogICAgICBpID09PSB0aGlzLnBvc2l0aW9ucy5uZXh0LFxuICAgICAgJ2RlZXBOZXh0JzogIGkgPT09IHRoaXMucG9zaXRpb25zLmRlZXBOZXh0XG4gICAgfVxuICB9XG5cblxuICBnZXQgc2xpZGVyQnV0dG9uc0hpZGRlbigpIHtcbiAgICByZXR1cm4gIXRoaXMuaXRlcmFibGUgJiYgKCF0aGlzLmlzTW9iaWxlIHx8IHRoaXMuaXNGdWxsU2NyZWVuKVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kZWZhdWx0JylcbiAgZ2V0IGlzRGVmYXVsdCgpIHsgcmV0dXJuICF0aGlzLmN1c3RvbSB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5yZWFkeScpXG4gIGdldCBpc1JlYWR5KCkgeyByZXR1cm4gIXRoaXMuaXNMb2FkaW5nIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IEFjYXJVaUNvbXBvbmVudCB9IGZyb20gJy4vYWNhci11aS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBCcm93c2VyTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFjYXJVaUNvbXBvbmVudCxcbiAgICBDYXJvdXNlbENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWNhclVpQ29tcG9uZW50LFxuICAgIENhcm91c2VsQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQWNhclVpTW9kdWxlIHsgfVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBY2FyVWlTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtJQWFFLGlCQUFpQjs7OztJQUVqQixRQUFRO0tBQ1A7OztZQWRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsUUFBUSxFQUFFOzs7O0dBSVQ7Z0JBQ0QsTUFBTSxFQUFFLEVBQUU7YUFDWDs7Ozs7Ozs7O0FDVkQ7SUFnRkU7d0JBaEJXLElBQUk7d0JBT0ssSUFBSTtzQkFJQyxFQUFFO0tBS1g7Ozs7SUFHaEIsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFcEMsSUFBRyxJQUFJLENBQUMsU0FBUztZQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTs7WUFFakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBOztRQUduQixVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQTtLQUM5Qzs7OztJQUdELFVBQVU7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDZixNQUFNLEVBQUssSUFBSSxDQUFDLFNBQVM7WUFDekIsU0FBUyxFQUFFLENBQUM7WUFDWixNQUFNLEVBQUssQ0FBQztTQUNiLENBQUE7S0FDRjs7OztJQUdELFVBQVU7UUFDUixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLFVBQVUsRUFBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQztZ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