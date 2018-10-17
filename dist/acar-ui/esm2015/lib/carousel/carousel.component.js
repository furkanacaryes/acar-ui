/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, ViewEncapsulation, HostBinding } from '@angular/core';
export class CarouselComponent {
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
if (false) {
    /** @type {?} */
    CarouselComponent.prototype.isLoading;
    /** @type {?} */
    CarouselComponent.prototype.isMobile;
    /** @type {?} */
    CarouselComponent.prototype.isFullScreen;
    /** @type {?} */
    CarouselComponent.prototype.lastIndex;
    /** @type {?} */
    CarouselComponent.prototype.iterable;
    /** @type {?} */
    CarouselComponent.prototype.loopable;
    /** @type {?} */
    CarouselComponent.prototype.positions;
    /** @type {?} */
    CarouselComponent.prototype.autoPosition;
    /** @type {?} */
    CarouselComponent.prototype.selectedSlideItem;
    /** @type {?} */
    CarouselComponent.prototype.infinite;
    /** @type {?} */
    CarouselComponent.prototype.interval;
    /** @type {?} */
    CarouselComponent.prototype.fivePoint;
    /** @type {?} */
    CarouselComponent.prototype.slides;
    /** @type {?} */
    CarouselComponent.prototype.custom;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYWNhci11aS8iLCJzb3VyY2VzIjpbImxpYi9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUF5RHRHLE1BQU07SUF1Qko7d0JBaEJXLElBQUk7d0JBT0ssSUFBSTtzQkFJQyxFQUFFO0tBS1g7Ozs7SUFHaEIsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFcEMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbkIsSUFBSTtZQUNGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTs7UUFHbkIsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0tBQzlDOzs7O0lBR0QsVUFBVTtRQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLE1BQU0sRUFBSyxJQUFJLENBQUMsU0FBUztZQUN6QixTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBSyxDQUFDO1NBQ2IsQ0FBQTtLQUNGOzs7O0lBR0QsVUFBVTtRQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2YsVUFBVSxFQUFHLElB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LENBQUMsU0FBUyxDQUFDLFFBQVE7U0FDM0MsQ0FBQTtLQUNGOzs7O0lBR0QsSUFBSSxtQkFBbUI7UUFDckIsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7S0FDL0Q7Ozs7SUFFRCxJQUNJLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFBLEVBQUU7Ozs7SUFFdkMsSUFDSSxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQSxFQUFFOzs7WUEzTHpDLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWdERDtnQkFDVCxNQUFNLEVBQUUsQ0FBQyxxN0VBQXE3RSxDQUFDO2dCQUMvN0UsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7Ozs7O3VCQWFFLEtBQUs7dUJBRUwsS0FBSzt3QkFFTCxLQUFLO3FCQUVMLEtBQUs7cUJBRUwsS0FBSzt3QkE2R0wsV0FBVyxTQUFDLGVBQWU7c0JBRzNCLFdBQVcsU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24sIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhY2FyLXVpLWNhcm91c2VsJyxcbiAgdGVtcGxhdGU6IGBcblxuPCEtLSBTbGlkZXMgV3JhcHBlclxuV3JhcHBlciBmb3Igc2xpZGUtaXRlbXMuIENvdWxkIGJlIHVzZWZ1bCBmb3Igc3R5bGluZyBpbiBzb21lIGNhc2VzLiAtLT5cblxuPCEtLSA8c2VjdGlvbiBjbGFzcz1cInNsaWRlc1wiPiAtLT5cblxuXG4gIDwhLS0gSW5kaXZpZHVhbCBTbGlkZSBJdGVtXG4gIChpICsgMSkgZm9yIDEgaW5kZXhlZCBwb3NpdGlvbiBkdWUgdG8ganVtcFRvKHBvc2l0aW9uKSAtLT5cblxuICA8ZGl2XG4gICAgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlczsgbGV0IGk9aW5kZXhcIlxuICAgIGNsYXNzPVwic2xpZGUtaXRlbVwiXG4gICAgW25nQ2xhc3NdPVwic2V0UG9zaXRpb24oaSsxKVwiPlxuXG5cbiAgICA8IS0tIEN1c3RvbWl6YWJsZSBTbGlkZSBJbm5lclxuXG4gICAgVGhpcyBzaG91bGQgYmUgYXMgZXh0ZW5zaWJsZSBhcyBwb3NzaWJsZS5cbiAgICBQcm92aWRlcyBpdGVyYWJsZSBVSSBlbGVtZW50LiBDdXN0b20gb3Igbm90LlxuICAgIFsgTk9USUNFIF0gPT4gc3R5bGVzIGFyZSBub3QgZW5jYXBzdWxhdGVkISBVc2UgQkVNIG5hbWluZyBjb252ZW50aW9ucyAtLT5cblxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiY3VzdG9tID8gY3VzdG9tIDogZGVmYXVsdDsgY29udGV4dDp7JGltcGxpY2l0OiBzbGlkZX1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdD5cbiAgICAgIDxpbWcgW3NyY109XCJzbGlkZS5pbWdcIi8+XG4gICAgICA8ZGl2IGNsYXNzPVwic2xpZGUtaXRlbV9fb3ZlcmxheVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNsaWRlLWl0ZW1fX2NhcHRpb25zXCI+XG4gICAgICAgIDxoMT57e3NsaWRlLmhlYWRpbmd9fTwvaDE+XG4gICAgICAgIDxwPnt7c2xpZGUucHJlZGVzY319PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICA8L2Rpdj5cbjwhLS0gPC9zZWN0aW9uPiAtLT5cblxuXG48IS0tIFNsaWRlciBCdXR0b25zXG5cbnByZXYgYW5kIG5leHQgYnV0dG9ucyBzaG91bGQgYmUgYWNhci11aS1pY29uXG5pY29uIGlzIGJvdW5kIHRvIG1hc2stdXJsIGFuZCBlYXNpbHkgY3VzdG9taXphYmxlIHdpdGggZ2xvYmFsIHN0eWxlcy4gLS0+XG5cbjxzZWN0aW9uIGNsYXNzPVwic2xpZGVyX19idXR0b25zXCIgW2hpZGRlbl09XCJzbGlkZXJCdXR0b25zSGlkZGVuXCI+XG4gIDxkaXYgY2xhc3M9XCJzbGlkZXJfX2J1dHRvbiBzbGlkZXJfX2J1dHRvbi0tcHJldlwiIChjbGljayk9XCJwcmV2KClcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNsaWRlcl9fYnV0dG9uIHNsaWRlcl9fYnV0dG9uLS1uZXh0XCIgKGNsaWNrKT1cIm5leHQoKVwiPjwvZGl2PlxuPC9zZWN0aW9uPmAsXG4gIHN0eWxlczogW2BhY2FyLXVpLWNhcm91c2Vse3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZC1jb2xvcjojMjIyfWFjYXItdWktY2Fyb3VzZWwgLmJ1dHRvbntjdXJzb3I6cG9pbnRlcjtmb250LXdlaWdodDo3MDB9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0ey13ZWJraXQtcGVyc3BlY3RpdmU6ODAwcHg7cGVyc3BlY3RpdmU6ODAwcHg7LXdlYmtpdC1wZXJzcGVjdGl2ZS1vcmlnaW46Ym90dG9tO3BlcnNwZWN0aXZlLW9yaWdpbjpib3R0b207LXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7dHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdC5yZWFkeSAuY3VycmVudCBpbWd7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMS4xNSk7dHJhbnNmb3JtOnNjYWxlKDEuMTUpfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGUtaXRlbXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtvdmVyZmxvdzpoaWRkZW47b3BhY2l0eTowO3RyYW5zaXRpb246LjZzOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjpib3R0b207dHJhbnNmb3JtLW9yaWdpbjpib3R0b219YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVtIGltZ3t3aWR0aDoxMDAlO3RyYW5zaXRpb246dHJhbnNmb3JtIDRzIGxpbmVhciAuOHM7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gNHMgbGluZWFyIC44cywtd2Via2l0LXRyYW5zZm9ybSA0cyBsaW5lYXIgLjhzfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAucHJldnstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDUwJSwxMDBweCkgcm90YXRlWCgtMTBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDUwJSwxMDBweCkgcm90YXRlWCgtMTBkZWcpfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAucHJldiAuc2xpZGUtaXRlbV9fY2FwdGlvbnN7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDBweCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDBweCwwKX1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLmN1cnJlbnR7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApIHJvdGF0ZVgoMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKSByb3RhdGVYKDApO3RyYW5zaXRpb24tZGVsYXk6LjNzO29wYWNpdHk6MX1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLmN1cnJlbnQgLnNsaWRlLWl0ZW1fX2NhcHRpb25zey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAubmV4dHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwJSwtMTAwcHgpIHJvdGF0ZVgoMjBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwJSwtMTAwcHgpIHJvdGF0ZVgoMjBkZWcpfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAubmV4dCAuc2xpZGUtaXRlbV9fY2FwdGlvbnN7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwtMTAwcHgsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsLTEwMHB4LDApfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGUtaXRlbV9fY2FwdGlvbnN7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjY0cHg7bGVmdDo2NHB4O2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO3RleHQtc2hhZG93OjE1cHggMjBweCA2MHB4ICMyMjI7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gMXMgLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIDFzIC4zcywtd2Via2l0LXRyYW5zZm9ybSAxcyAuM3N9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVtX19jYXB0aW9ucyAqe21hcmdpbjowfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGUtaXRlbV9fY2FwdGlvbnMgaDF7Zm9udC1zaXplOjRlbX1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLnNsaWRlLWl0ZW1fX2NhcHRpb25zIHB7Zm9udC1zaXplOjEuNWVtfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGUtaXRlbV9fb3ZlcmxheXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNCk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjB9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZXJfX2J1dHRvbnN7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjY0cHg7cmlnaHQ6NjRweDt6LWluZGV4OjF9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZXJfX2J1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7b3BhY2l0eTouNjtwYWRkaW5nOjE2cHg7Y29sb3I6I2ZmZjtkaXNwbGF5OmlubGluZS1ibG9jazt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGVyX19idXR0b246aG92ZXJ7b3BhY2l0eToxfWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBpc0xvYWRpbmc7XG4gIGlzTW9iaWxlO1xuICBpc0Z1bGxTY3JlZW47XG4gIGxhc3RJbmRleDtcbiAgaXRlcmFibGU7XG4gIGxvb3BhYmxlID0gdHJ1ZTtcbiAgcG9zaXRpb25zO1xuICBhdXRvUG9zaXRpb247XG4gIHNlbGVjdGVkU2xpZGVJdGVtOiBhbnk7XG5cbiAgQElucHV0KCkgaW5maW5pdGU7XG5cbiAgQElucHV0KCkgaW50ZXJ2YWwgPSA0MDAwO1xuXG4gIEBJbnB1dCgpIGZpdmVQb2ludDtcblxuICBASW5wdXQoKSBzbGlkZXM6IGFueVtdID0gW107XG5cbiAgQElucHV0KCkgY3VzdG9tOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIFxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxhc3RJbmRleCA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcblxuICAgIGlmKHRoaXMuZml2ZVBvaW50KVxuICAgICAgdGhpcy5pbml0NVBvaW50KClcbiAgICBlbHNlXG4gICAgICB0aGlzLmluaXQzUG9pbnQoKVxuXG4gICAgLy8gVE9ETyA6IEltYWdlc0xvYWRlZFxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc0xvYWRpbmcgPSBmYWxzZSwgMzAwKVxuICB9XG5cblxuICBpbml0M1BvaW50KCkge1xuICAgIHRoaXMuaXRlcmFibGUgPSB0aGlzLmxhc3RJbmRleCA+IDE7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSB7XG4gICAgICAncHJldicgICA6IHRoaXMubGFzdEluZGV4LFxuICAgICAgJ2N1cnJlbnQnOiAxLFxuICAgICAgJ25leHQnICAgOiAyXG4gICAgfVxuICB9XG5cblxuICBpbml0NVBvaW50KCkge1xuICAgIHRoaXMubG9vcGFibGUgPSB0aGlzLmxhc3RJbmRleCA+PSA1O1xuICAgIHRoaXMuaXRlcmFibGUgPSB0aGlzLmxhc3RJbmRleCA+IDM7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSB7XG4gICAgICAnZGVlcFByZXYnIDogdGhpcy5sb29wYWJsZSA/IHRoaXMubGFzdEluZGV4IDogMCxcbiAgICAgICdwcmV2JyAgICAgOiAxLFxuICAgICAgJ2N1cnJlbnQnICA6IDIsXG4gICAgICAnbmV4dCcgICAgIDogMyxcbiAgICAgICdkZWVwTmV4dCcgOiB0aGlzLml0ZXJhYmxlID8gNCA6IG51bGxcbiAgICB9XG4gIH1cblxuXG4gIHNsaWRlQ2xpY2soc2xpZGVJdGVtKSB7XG4gICAgdGhpcy5zZWxlY3RlZFNsaWRlSXRlbSA9IHNsaWRlSXRlbTtcbiAgfVxuXG5cbiAgc3RhcnRJbnRlcnZhbCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b1Bvc2l0aW9uKTtcblxuICAgIHRoaXMuYXV0b1Bvc2l0aW9uID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5uZXh0KClcbiAgICB9LCB0aGlzLmludGVydmFsKVxuICB9XG5cblxuICAvLyBEZWNpZGVzIGlmIGl0IGlzIHBvc3NpYmxlIHRvIGl0ZXJhdGUgZm9yd2FyZC4gTW9yZSByZWFkYWJsZS5cbiAgZ2V0IGNhbkdvRm9yd2FyZCgpIHtcbiAgICBpZih0aGlzLmZpdmVQb2ludClcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9ucy5uZXh0IDwgdGhpcy5sYXN0SW5kZXhcbiAgICAgICAgfHwgdGhpcy5pbmZpbml0ZSAmJiB0aGlzLmxvb3BhYmxlXG4gICAgZWxzZSBcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9ucy5jdXJyZW50ICE9PSB0aGlzLmxhc3RJbmRleFxuICAgICAgICB8fCB0aGlzLmluZmluaXRlICYmIHRoaXMubG9vcGFibGVcbiAgfVxuXG5cbiAgLy8gRGVjaWRlcyBpZiBpdCBpcyBwb3NzaWJsZSB0byBpdGVyYXRlIGJhY2t3YXJkLiBTaG9ydGVyLlxuICBnZXQgY2FuR29CYWNrd2FyZCgpIHtcbiAgICByZXR1cm4gKHRoaXMuZml2ZVBvaW50ID9cbiAgICAgIHRoaXMucG9zaXRpb25zLnByZXYgPiAxIDpcbiAgICAgIHRoaXMucG9zaXRpb25zLmN1cnJlbnQgIT09IDEpXG4gICAgICAgIHx8IHRoaXMuaW5maW5pdGUgJiYgdGhpcy5sb29wYWJsZVxuICB9XG5cblxuICBuZXh0KCkge1xuICAgIGlmKHRoaXMuY2FuR29Gb3J3YXJkKVxuICAgICAgZm9yKGxldCBwb3MgaW4gdGhpcy5wb3NpdGlvbnMpXG4gICAgICAgIHRoaXMucG9zaXRpb25zW3Bvc10gPSB0aGlzLnBvc2l0aW9uc1twb3NdIDwgdGhpcy5sYXN0SW5kZXggPyB0aGlzLnBvc2l0aW9uc1twb3NdICsgMSA6IDFcblxuICAgIC8vIHRoaXMuc3RhcnRJbnRlcnZhbCgpO1xuICB9XG5cblxuICBwcmV2KCkge1xuICAgIGlmKHRoaXMuY2FuR29CYWNrd2FyZClcbiAgICAgIGZvcihsZXQgcG9zIGluIHRoaXMucG9zaXRpb25zKVxuICAgICAgICB0aGlzLnBvc2l0aW9uc1twb3NdID0gdGhpcy5wb3NpdGlvbnNbcG9zXSA+IDEgPyB0aGlzLnBvc2l0aW9uc1twb3NdIC0gMSA6IHRoaXMubGFzdEluZGV4XG5cbiAgICAvLyB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcbiAgfVxuXG5cbiAgc2V0UG9zaXRpb24oaTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkZWVwUHJldic6ICBpID09PSB0aGlzLnBvc2l0aW9ucy5kZWVwUHJldixcbiAgICAgICdwcmV2JzogICAgICBpID09PSB0aGlzLnBvc2l0aW9ucy5wcmV2LFxuICAgICAgJ2N1cnJlbnQnOiAgIGkgPT09IHRoaXMucG9zaXRpb25zLmN1cnJlbnQsXG4gICAgICAnbmV4dCc6ICAgICAgaSA9PT0gdGhpcy5wb3NpdGlvbnMubmV4dCxcbiAgICAgICdkZWVwTmV4dCc6ICBpID09PSB0aGlzLnBvc2l0aW9ucy5kZWVwTmV4dFxuICAgIH1cbiAgfVxuXG5cbiAgZ2V0IHNsaWRlckJ1dHRvbnNIaWRkZW4oKSB7XG4gICAgcmV0dXJuICF0aGlzLml0ZXJhYmxlICYmICghdGhpcy5pc01vYmlsZSB8fCB0aGlzLmlzRnVsbFNjcmVlbilcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGVmYXVsdCcpXG4gIGdldCBpc0RlZmF1bHQoKSB7IHJldHVybiAhdGhpcy5jdXN0b20gfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucmVhZHknKVxuICBnZXQgaXNSZWFkeSgpIHsgcmV0dXJuICF0aGlzLmlzTG9hZGluZyB9XG59XG4iXX0=