(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('acar-ui', ['exports', '@angular/core', '@angular/platform-browser'], factory) :
    (factory((global['acar-ui'] = {}),global.ng.core,global.ng.platformBrowser));
}(this, (function (exports,i0,platformBrowser) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AcarUiComponent = (function () {
        function AcarUiComponent() {
        }
        /**
         * @return {?}
         */
        AcarUiComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        AcarUiComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'acar-ui-test',
                        template: "\n    <p>\n      Show me what you've got!\n    </p>\n  ",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        AcarUiComponent.ctorParameters = function () { return []; };
        return AcarUiComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var CarouselComponent = (function () {
        function CarouselComponent() {
            this.loopable = true;
            this.interval = 4000;
            this.slides = [];
        }
        /**
         * @return {?}
         */
        CarouselComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.lastIndex = this.slides.length;
                if (this.fivePoint)
                    this.init5Point();
                else
                    this.init3Point();
                // TODO : ImagesLoaded
                setTimeout(function () { return _this.isLoading = false; }, 300);
            };
        /**
         * @return {?}
         */
        CarouselComponent.prototype.init3Point = /**
         * @return {?}
         */
            function () {
                this.iterable = this.lastIndex > 1;
                this.positions = {
                    'prev': this.lastIndex,
                    'current': 1,
                    'next': 2
                };
            };
        /**
         * @return {?}
         */
        CarouselComponent.prototype.init5Point = /**
         * @return {?}
         */
            function () {
                this.loopable = this.lastIndex >= 5;
                this.iterable = this.lastIndex > 3;
                this.positions = {
                    'deepPrev': this.loopable ? this.lastIndex : 0,
                    'prev': 1,
                    'current': 2,
                    'next': 3,
                    'deepNext': this.iterable ? 4 : null
                };
            };
        /**
         * @param {?} slideItem
         * @return {?}
         */
        CarouselComponent.prototype.slideClick = /**
         * @param {?} slideItem
         * @return {?}
         */
            function (slideItem) {
                this.selectedSlideItem = slideItem;
            };
        /**
         * @return {?}
         */
        CarouselComponent.prototype.startInterval = /**
         * @return {?}
         */
            function () {
                var _this = this;
                clearInterval(this.autoPosition);
                this.autoPosition = setInterval(function () {
                    _this.next();
                }, this.interval);
            };
        Object.defineProperty(CarouselComponent.prototype, "canGoForward", {
            // Decides if it is possible to iterate forward. More readable.
            get: /**
             * @return {?}
             */ function () {
                if (this.fivePoint)
                    return this.positions.next < this.lastIndex
                        || this.infinite && this.loopable;
                else
                    return this.positions.current !== this.lastIndex
                        || this.infinite && this.loopable;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CarouselComponent.prototype, "canGoBackward", {
            // Decides if it is possible to iterate backward. Shorter.
            get: /**
             * @return {?}
             */ function () {
                return (this.fivePoint ?
                    this.positions.prev > 1 :
                    this.positions.current !== 1)
                    || this.infinite && this.loopable;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        CarouselComponent.prototype.next = /**
         * @return {?}
         */
            function () {
                if (this.canGoForward)
                    for (var pos in this.positions)
                        this.positions[pos] = this.positions[pos] < this.lastIndex ? this.positions[pos] + 1 : 1;
                // this.startInterval();
            };
        /**
         * @return {?}
         */
        CarouselComponent.prototype.prev = /**
         * @return {?}
         */
            function () {
                if (this.canGoBackward)
                    for (var pos in this.positions)
                        this.positions[pos] = this.positions[pos] > 1 ? this.positions[pos] - 1 : this.lastIndex;
                // this.startInterval();
            };
        /**
         * @param {?} i
         * @return {?}
         */
        CarouselComponent.prototype.setPosition = /**
         * @param {?} i
         * @return {?}
         */
            function (i) {
                return {
                    'deepPrev': i === this.positions.deepPrev,
                    'prev': i === this.positions.prev,
                    'current': i === this.positions.current,
                    'next': i === this.positions.next,
                    'deepNext': i === this.positions.deepNext
                };
            };
        Object.defineProperty(CarouselComponent.prototype, "sliderButtonsHidden", {
            get: /**
             * @return {?}
             */ function () {
                return !this.iterable && (!this.isMobile || this.isFullScreen);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CarouselComponent.prototype, "isDefault", {
            get: /**
             * @return {?}
             */ function () { return !this.custom; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CarouselComponent.prototype, "isReady", {
            get: /**
             * @return {?}
             */ function () { return !this.isLoading; },
            enumerable: true,
            configurable: true
        });
        CarouselComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'acar-ui-carousel',
                        template: "\n\n<!-- Slides Wrapper\nWrapper for slide-items. Could be useful for styling in some cases. -->\n\n<!-- <section class=\"slides\"> -->\n\n\n  <!-- Individual Slide Item\n  (i + 1) for 1 indexed position due to jumpTo(position) -->\n\n  <div\n    *ngFor=\"let slide of slides; let i=index\"\n    class=\"slide-item\"\n    [ngClass]=\"setPosition(i+1)\">\n\n\n    <!-- Customizable Slide Inner\n\n    This should be as extensible as possible.\n    Provides iterable UI element. Custom or not.\n    [ NOTICE ] => styles are not encapsulated! Use BEM naming conventions -->\n\n    <ng-container\n      *ngTemplateOutlet=\"custom ? custom : default; context:{$implicit: slide}\">\n    </ng-container>\n\n    <ng-template #default>\n      <img [src]=\"slide.img\"/>\n      <div class=\"slide-item__overlay\"></div>\n      <div class=\"slide-item__captions\">\n        <h1>{{slide.heading}}</h1>\n        <p>{{slide.predesc}}</p>\n      </div>\n    </ng-template>\n\n  </div>\n<!-- </section> -->\n\n\n<!-- Slider Buttons\n\nprev and next buttons should be acar-ui-icon\nicon is bound to mask-url and easily customizable with global styles. -->\n\n<section class=\"slider__buttons\" [hidden]=\"sliderButtonsHidden\">\n  <div class=\"slider__button slider__button--prev\" (click)=\"prev()\"></div>\n  <div class=\"slider__button slider__button--next\" (click)=\"next()\"></div>\n</section>",
                        styles: ["acar-ui-carousel{position:relative;width:100%;height:100%;overflow:hidden;display:block;background-color:#222}acar-ui-carousel .button{cursor:pointer;font-weight:700}acar-ui-carousel.default{-webkit-perspective:800px;perspective:800px;-webkit-perspective-origin:bottom;perspective-origin:bottom;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}acar-ui-carousel.default.ready .current img{-webkit-transform:scale(1.15);transform:scale(1.15)}acar-ui-carousel.default .slide-item{position:absolute;width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden;opacity:0;transition:.6s;-webkit-transform-origin:bottom;transform-origin:bottom}acar-ui-carousel.default .slide-item img{width:100%;transition:transform 4s linear .8s;transition:transform 4s linear .8s,-webkit-transform 4s linear .8s}acar-ui-carousel.default .prev{-webkit-transform:translate3d(0,50%,100px) rotateX(-10deg);transform:translate3d(0,50%,100px) rotateX(-10deg)}acar-ui-carousel.default .prev .slide-item__captions{-webkit-transform:translate3d(0,100px,0);transform:translate3d(0,100px,0)}acar-ui-carousel.default .current{-webkit-transform:translate3d(0,0,0) rotateX(0);transform:translate3d(0,0,0) rotateX(0);transition-delay:.3s;opacity:1}acar-ui-carousel.default .current .slide-item__captions{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}acar-ui-carousel.default .next{-webkit-transform:translate3d(0,10%,-100px) rotateX(20deg);transform:translate3d(0,10%,-100px) rotateX(20deg)}acar-ui-carousel.default .next .slide-item__captions{-webkit-transform:translate3d(0,-100px,0);transform:translate3d(0,-100px,0)}acar-ui-carousel.default .slide-item__captions{position:absolute;bottom:64px;left:64px;color:#fff;font-weight:700;text-shadow:15px 20px 60px #222;transition:transform 1s .3s;transition:transform 1s .3s,-webkit-transform 1s .3s}acar-ui-carousel.default .slide-item__captions *{margin:0}acar-ui-carousel.default .slide-item__captions h1{font-size:4em}acar-ui-carousel.default .slide-item__captions p{font-size:1.5em}acar-ui-carousel.default .slide-item__overlay{width:100%;height:100%;background-color:rgba(0,0,0,.4);position:absolute;top:0}acar-ui-carousel.default .slider__buttons{position:absolute;bottom:64px;right:64px;z-index:1}acar-ui-carousel.default .slider__button{background-color:#fff;opacity:.6;padding:16px;color:#fff;display:inline-block;transition:opacity .3s}acar-ui-carousel.default .slider__button:hover{opacity:1}"],
                        encapsulation: i0.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        CarouselComponent.ctorParameters = function () { return []; };
        CarouselComponent.propDecorators = {
            infinite: [{ type: i0.Input }],
            interval: [{ type: i0.Input }],
            fivePoint: [{ type: i0.Input }],
            slides: [{ type: i0.Input }],
            custom: [{ type: i0.Input }],
            isDefault: [{ type: i0.HostBinding, args: ['class.default',] }],
            isReady: [{ type: i0.HostBinding, args: ['class.ready',] }]
        };
        return CarouselComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AcarUiModule = (function () {
        function AcarUiModule() {
        }
        AcarUiModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            platformBrowser.BrowserModule
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
        return AcarUiModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AcarUiService = (function () {
        function AcarUiService() {
        }
        AcarUiService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        AcarUiService.ctorParameters = function () { return []; };
        /** @nocollapse */ AcarUiService.ngInjectableDef = i0.defineInjectable({ factory: function AcarUiService_Factory() { return new AcarUiService(); }, token: AcarUiService, providedIn: "root" });
        return AcarUiService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.AcarUiModule = AcarUiModule;
    exports.AcarUiService = AcarUiService;
    exports.AcarUiComponent = AcarUiComponent;
    exports.CarouselComponent = CarouselComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNhci11aS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FjYXItdWkvbGliL2FjYXItdWkuY29tcG9uZW50LnRzIiwibmc6Ly9hY2FyLXVpL2xpYi9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQudHMiLCJuZzovL2FjYXItdWkvbGliL2FjYXItdWkubW9kdWxlLnRzIiwibmc6Ly9hY2FyLXVpL2xpYi9hY2FyLXVpLnNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWNhci11aS10ZXN0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8cD5cbiAgICAgIFNob3cgbWUgd2hhdCB5b3UndmUgZ290IVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBY2FyVWlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24sIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpbnRlcnZhbCB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhY2FyLXVpLWNhcm91c2VsJyxcbiAgdGVtcGxhdGU6IGBcblxuPCEtLSBTbGlkZXMgV3JhcHBlclxuV3JhcHBlciBmb3Igc2xpZGUtaXRlbXMuIENvdWxkIGJlIHVzZWZ1bCBmb3Igc3R5bGluZyBpbiBzb21lIGNhc2VzLiAtLT5cblxuPCEtLSA8c2VjdGlvbiBjbGFzcz1cInNsaWRlc1wiPiAtLT5cblxuXG4gIDwhLS0gSW5kaXZpZHVhbCBTbGlkZSBJdGVtXG4gIChpICsgMSkgZm9yIDEgaW5kZXhlZCBwb3NpdGlvbiBkdWUgdG8ganVtcFRvKHBvc2l0aW9uKSAtLT5cblxuICA8ZGl2XG4gICAgKm5nRm9yPVwibGV0IHNsaWRlIG9mIHNsaWRlczsgbGV0IGk9aW5kZXhcIlxuICAgIGNsYXNzPVwic2xpZGUtaXRlbVwiXG4gICAgW25nQ2xhc3NdPVwic2V0UG9zaXRpb24oaSsxKVwiPlxuXG5cbiAgICA8IS0tIEN1c3RvbWl6YWJsZSBTbGlkZSBJbm5lclxuXG4gICAgVGhpcyBzaG91bGQgYmUgYXMgZXh0ZW5zaWJsZSBhcyBwb3NzaWJsZS5cbiAgICBQcm92aWRlcyBpdGVyYWJsZSBVSSBlbGVtZW50LiBDdXN0b20gb3Igbm90LlxuICAgIFsgTk9USUNFIF0gPT4gc3R5bGVzIGFyZSBub3QgZW5jYXBzdWxhdGVkISBVc2UgQkVNIG5hbWluZyBjb252ZW50aW9ucyAtLT5cblxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiY3VzdG9tID8gY3VzdG9tIDogZGVmYXVsdDsgY29udGV4dDp7JGltcGxpY2l0OiBzbGlkZX1cIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdD5cbiAgICAgIDxpbWcgW3NyY109XCJzbGlkZS5pbWdcIi8+XG4gICAgICA8ZGl2IGNsYXNzPVwic2xpZGUtaXRlbV9fb3ZlcmxheVwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInNsaWRlLWl0ZW1fX2NhcHRpb25zXCI+XG4gICAgICAgIDxoMT57e3NsaWRlLmhlYWRpbmd9fTwvaDE+XG4gICAgICAgIDxwPnt7c2xpZGUucHJlZGVzY319PC9wPlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICA8L2Rpdj5cbjwhLS0gPC9zZWN0aW9uPiAtLT5cblxuXG48IS0tIFNsaWRlciBCdXR0b25zXG5cbnByZXYgYW5kIG5leHQgYnV0dG9ucyBzaG91bGQgYmUgYWNhci11aS1pY29uXG5pY29uIGlzIGJvdW5kIHRvIG1hc2stdXJsIGFuZCBlYXNpbHkgY3VzdG9taXphYmxlIHdpdGggZ2xvYmFsIHN0eWxlcy4gLS0+XG5cbjxzZWN0aW9uIGNsYXNzPVwic2xpZGVyX19idXR0b25zXCIgW2hpZGRlbl09XCJzbGlkZXJCdXR0b25zSGlkZGVuXCI+XG4gIDxkaXYgY2xhc3M9XCJzbGlkZXJfX2J1dHRvbiBzbGlkZXJfX2J1dHRvbi0tcHJldlwiIChjbGljayk9XCJwcmV2KClcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInNsaWRlcl9fYnV0dG9uIHNsaWRlcl9fYnV0dG9uLS1uZXh0XCIgKGNsaWNrKT1cIm5leHQoKVwiPjwvZGl2PlxuPC9zZWN0aW9uPmAsXG4gIHN0eWxlczogW2BhY2FyLXVpLWNhcm91c2Vse3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7b3ZlcmZsb3c6aGlkZGVuO2Rpc3BsYXk6YmxvY2s7YmFja2dyb3VuZC1jb2xvcjojMjIyfWFjYXItdWktY2Fyb3VzZWwgLmJ1dHRvbntjdXJzb3I6cG9pbnRlcjtmb250LXdlaWdodDo3MDB9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0ey13ZWJraXQtcGVyc3BlY3RpdmU6ODAwcHg7cGVyc3BlY3RpdmU6ODAwcHg7LXdlYmtpdC1wZXJzcGVjdGl2ZS1vcmlnaW46Ym90dG9tO3BlcnNwZWN0aXZlLW9yaWdpbjpib3R0b207LXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7dHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdC5yZWFkeSAuY3VycmVudCBpbWd7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMS4xNSk7dHJhbnNmb3JtOnNjYWxlKDEuMTUpfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGUtaXRlbXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtvdmVyZmxvdzpoaWRkZW47b3BhY2l0eTowO3RyYW5zaXRpb246LjZzOy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjpib3R0b207dHJhbnNmb3JtLW9yaWdpbjpib3R0b219YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVtIGltZ3t3aWR0aDoxMDAlO3RyYW5zaXRpb246dHJhbnNmb3JtIDRzIGxpbmVhciAuOHM7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gNHMgbGluZWFyIC44cywtd2Via2l0LXRyYW5zZm9ybSA0cyBsaW5lYXIgLjhzfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAucHJldnstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDUwJSwxMDBweCkgcm90YXRlWCgtMTBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDUwJSwxMDBweCkgcm90YXRlWCgtMTBkZWcpfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAucHJldiAuc2xpZGUtaXRlbV9fY2FwdGlvbnN7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDBweCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwxMDBweCwwKX1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLmN1cnJlbnR7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApIHJvdGF0ZVgoMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKSByb3RhdGVYKDApO3RyYW5zaXRpb24tZGVsYXk6LjNzO29wYWNpdHk6MX1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLmN1cnJlbnQgLnNsaWRlLWl0ZW1fX2NhcHRpb25zey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAubmV4dHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwJSwtMTAwcHgpIHJvdGF0ZVgoMjBkZWcpO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwJSwtMTAwcHgpIHJvdGF0ZVgoMjBkZWcpfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAubmV4dCAuc2xpZGUtaXRlbV9fY2FwdGlvbnN7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwtMTAwcHgsMCk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsLTEwMHB4LDApfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGUtaXRlbV9fY2FwdGlvbnN7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjY0cHg7bGVmdDo2NHB4O2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO3RleHQtc2hhZG93OjE1cHggMjBweCA2MHB4ICMyMjI7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gMXMgLjNzO3RyYW5zaXRpb246dHJhbnNmb3JtIDFzIC4zcywtd2Via2l0LXRyYW5zZm9ybSAxcyAuM3N9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVtX19jYXB0aW9ucyAqe21hcmdpbjowfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGUtaXRlbV9fY2FwdGlvbnMgaDF7Zm9udC1zaXplOjRlbX1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLnNsaWRlLWl0ZW1fX2NhcHRpb25zIHB7Zm9udC1zaXplOjEuNWVtfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGUtaXRlbV9fb3ZlcmxheXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuNCk7cG9zaXRpb246YWJzb2x1dGU7dG9wOjB9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZXJfX2J1dHRvbnN7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOjY0cHg7cmlnaHQ6NjRweDt6LWluZGV4OjF9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZXJfX2J1dHRvbntiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7b3BhY2l0eTouNjtwYWRkaW5nOjE2cHg7Y29sb3I6I2ZmZjtkaXNwbGF5OmlubGluZS1ibG9jazt0cmFuc2l0aW9uOm9wYWNpdHkgLjNzfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGVyX19idXR0b246aG92ZXJ7b3BhY2l0eToxfWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBpc0xvYWRpbmc7XG4gIGlzTW9iaWxlO1xuICBpc0Z1bGxTY3JlZW47XG4gIGxhc3RJbmRleDtcbiAgaXRlcmFibGU7XG4gIGxvb3BhYmxlID0gdHJ1ZTtcbiAgcG9zaXRpb25zO1xuICBhdXRvUG9zaXRpb247XG4gIHNlbGVjdGVkU2xpZGVJdGVtOiBhbnk7XG5cbiAgQElucHV0KCkgaW5maW5pdGU7XG5cbiAgQElucHV0KCkgaW50ZXJ2YWwgPSA0MDAwO1xuXG4gIEBJbnB1dCgpIGZpdmVQb2ludDtcblxuICBASW5wdXQoKSBzbGlkZXM6IGFueVtdID0gW107XG5cbiAgQElucHV0KCkgY3VzdG9tOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIFxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxhc3RJbmRleCA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcblxuICAgIGlmKHRoaXMuZml2ZVBvaW50KVxuICAgICAgdGhpcy5pbml0NVBvaW50KClcbiAgICBlbHNlXG4gICAgICB0aGlzLmluaXQzUG9pbnQoKVxuXG4gICAgLy8gVE9ETyA6IEltYWdlc0xvYWRlZFxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5pc0xvYWRpbmcgPSBmYWxzZSwgMzAwKVxuICB9XG5cblxuICBpbml0M1BvaW50KCkge1xuICAgIHRoaXMuaXRlcmFibGUgPSB0aGlzLmxhc3RJbmRleCA+IDE7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSB7XG4gICAgICAncHJldicgICA6IHRoaXMubGFzdEluZGV4LFxuICAgICAgJ2N1cnJlbnQnOiAxLFxuICAgICAgJ25leHQnICAgOiAyXG4gICAgfVxuICB9XG5cblxuICBpbml0NVBvaW50KCkge1xuICAgIHRoaXMubG9vcGFibGUgPSB0aGlzLmxhc3RJbmRleCA+PSA1O1xuICAgIHRoaXMuaXRlcmFibGUgPSB0aGlzLmxhc3RJbmRleCA+IDM7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSB7XG4gICAgICAnZGVlcFByZXYnIDogdGhpcy5sb29wYWJsZSA/IHRoaXMubGFzdEluZGV4IDogMCxcbiAgICAgICdwcmV2JyAgICAgOiAxLFxuICAgICAgJ2N1cnJlbnQnICA6IDIsXG4gICAgICAnbmV4dCcgICAgIDogMyxcbiAgICAgICdkZWVwTmV4dCcgOiB0aGlzLml0ZXJhYmxlID8gNCA6IG51bGxcbiAgICB9XG4gIH1cblxuXG4gIHNsaWRlQ2xpY2soc2xpZGVJdGVtKSB7XG4gICAgdGhpcy5zZWxlY3RlZFNsaWRlSXRlbSA9IHNsaWRlSXRlbTtcbiAgfVxuXG5cbiAgc3RhcnRJbnRlcnZhbCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b1Bvc2l0aW9uKTtcblxuICAgIHRoaXMuYXV0b1Bvc2l0aW9uID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgdGhpcy5uZXh0KClcbiAgICB9LCB0aGlzLmludGVydmFsKVxuICB9XG5cblxuICAvLyBEZWNpZGVzIGlmIGl0IGlzIHBvc3NpYmxlIHRvIGl0ZXJhdGUgZm9yd2FyZC4gTW9yZSByZWFkYWJsZS5cbiAgZ2V0IGNhbkdvRm9yd2FyZCgpIHtcbiAgICBpZih0aGlzLmZpdmVQb2ludClcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9ucy5uZXh0IDwgdGhpcy5sYXN0SW5kZXhcbiAgICAgICAgfHwgdGhpcy5pbmZpbml0ZSAmJiB0aGlzLmxvb3BhYmxlXG4gICAgZWxzZSBcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aW9ucy5jdXJyZW50ICE9PSB0aGlzLmxhc3RJbmRleFxuICAgICAgICB8fCB0aGlzLmluZmluaXRlICYmIHRoaXMubG9vcGFibGVcbiAgfVxuXG5cbiAgLy8gRGVjaWRlcyBpZiBpdCBpcyBwb3NzaWJsZSB0byBpdGVyYXRlIGJhY2t3YXJkLiBTaG9ydGVyLlxuICBnZXQgY2FuR29CYWNrd2FyZCgpIHtcbiAgICByZXR1cm4gKHRoaXMuZml2ZVBvaW50ID9cbiAgICAgIHRoaXMucG9zaXRpb25zLnByZXYgPiAxIDpcbiAgICAgIHRoaXMucG9zaXRpb25zLmN1cnJlbnQgIT09IDEpXG4gICAgICAgIHx8IHRoaXMuaW5maW5pdGUgJiYgdGhpcy5sb29wYWJsZVxuICB9XG5cblxuICBuZXh0KCkge1xuICAgIGlmKHRoaXMuY2FuR29Gb3J3YXJkKVxuICAgICAgZm9yKGxldCBwb3MgaW4gdGhpcy5wb3NpdGlvbnMpXG4gICAgICAgIHRoaXMucG9zaXRpb25zW3Bvc10gPSB0aGlzLnBvc2l0aW9uc1twb3NdIDwgdGhpcy5sYXN0SW5kZXggPyB0aGlzLnBvc2l0aW9uc1twb3NdICsgMSA6IDFcblxuICAgIC8vIHRoaXMuc3RhcnRJbnRlcnZhbCgpO1xuICB9XG5cblxuICBwcmV2KCkge1xuICAgIGlmKHRoaXMuY2FuR29CYWNrd2FyZClcbiAgICAgIGZvcihsZXQgcG9zIGluIHRoaXMucG9zaXRpb25zKVxuICAgICAgICB0aGlzLnBvc2l0aW9uc1twb3NdID0gdGhpcy5wb3NpdGlvbnNbcG9zXSA+IDEgPyB0aGlzLnBvc2l0aW9uc1twb3NdIC0gMSA6IHRoaXMubGFzdEluZGV4XG5cbiAgICAvLyB0aGlzLnN0YXJ0SW50ZXJ2YWwoKTtcbiAgfVxuXG5cbiAgc2V0UG9zaXRpb24oaTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdkZWVwUHJldic6ICBpID09PSB0aGlzLnBvc2l0aW9ucy5kZWVwUHJldixcbiAgICAgICdwcmV2JzogICAgICBpID09PSB0aGlzLnBvc2l0aW9ucy5wcmV2LFxuICAgICAgJ2N1cnJlbnQnOiAgIGkgPT09IHRoaXMucG9zaXRpb25zLmN1cnJlbnQsXG4gICAgICAnbmV4dCc6ICAgICAgaSA9PT0gdGhpcy5wb3NpdGlvbnMubmV4dCxcbiAgICAgICdkZWVwTmV4dCc6ICBpID09PSB0aGlzLnBvc2l0aW9ucy5kZWVwTmV4dFxuICAgIH1cbiAgfVxuXG5cbiAgZ2V0IHNsaWRlckJ1dHRvbnNIaWRkZW4oKSB7XG4gICAgcmV0dXJuICF0aGlzLml0ZXJhYmxlICYmICghdGhpcy5pc01vYmlsZSB8fCB0aGlzLmlzRnVsbFNjcmVlbilcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZGVmYXVsdCcpXG4gIGdldCBpc0RlZmF1bHQoKSB7IHJldHVybiAhdGhpcy5jdXN0b20gfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucmVhZHknKVxuICBnZXQgaXNSZWFkeSgpIHsgcmV0dXJuICF0aGlzLmlzTG9hZGluZyB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBBY2FyVWlDb21wb25lbnQgfSBmcm9tICcuL2FjYXItdWkuY29tcG9uZW50JztcbmltcG9ydCB7IENhcm91c2VsQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQnJvd3Nlck1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBY2FyVWlDb21wb25lbnQsXG4gICAgQ2Fyb3VzZWxDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFjYXJVaUNvbXBvbmVudCxcbiAgICBDYXJvdXNlbENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFjYXJVaU1vZHVsZSB7IH1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWNhclVpU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJWaWV3RW5jYXBzdWxhdGlvbiIsIklucHV0IiwiSG9zdEJpbmRpbmciLCJOZ01vZHVsZSIsIkJyb3dzZXJNb2R1bGUiLCJJbmplY3RhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFhRTtTQUFpQjs7OztRQUVqQixrQ0FBUTs7O1lBQVI7YUFDQzs7b0JBZEZBLFlBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsY0FBYzt3QkFDeEIsUUFBUSxFQUFFLHlEQUlUO3dCQUNELE1BQU0sRUFBRSxFQUFFO3FCQUNYOzs7OzhCQVZEOzs7Ozs7O0FDQUE7UUFnRkU7NEJBaEJXLElBQUk7NEJBT0ssSUFBSTswQkFJQyxFQUFFO1NBS1g7Ozs7UUFHaEIsb0NBQVE7OztZQUFSO2dCQUFBLGlCQVVDO2dCQVRDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBRXBDLElBQUcsSUFBSSxDQUFDLFNBQVM7b0JBQ2YsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBOztvQkFFakIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBOztnQkFHbkIsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBQSxFQUFFLEdBQUcsQ0FBQyxDQUFBO2FBQzlDOzs7O1FBR0Qsc0NBQVU7OztZQUFWO2dCQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUc7b0JBQ2YsTUFBTSxFQUFLLElBQUksQ0FBQyxTQUFTO29CQUN6QixTQUFTLEVBQUUsQ0FBQztvQkFDWixNQUFNLEVBQUssQ0FBQztpQkFDYixDQUFBO2FBQ0Y7Ozs7UUFHRCxzQ0FBVTs7O1lBQVY7Z0JBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRztvQkFDZixVQUFVLEVBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUM7b0JBQy9DLE1BQU0sRUFBTyxDQUFDO29CQUNkLFNBQVMsRUFBSSxDQUFDO29CQUNkLE1BQU0sRUFBTyxDQUFDO29CQUNkLFVBQVUsRUFBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJO2lCQUN0QyxDQUFBO2FBQ0Y7Ozs7O1FBR0Qsc0NBQVU7Ozs7WUFBVixVQUFXLFNBQVM7Z0JBQ2xCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUM7YUFDcEM7Ozs7UUFHRCx5Q0FBYTs7O1lBQWI7Z0JBQUEsaUJBTUM7Z0JBTEMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFFakMsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7b0JBQzlCLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtpQkFDWixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTthQUNsQjtRQUlELHNCQUFJLDJDQUFZOzs7O2dCQUFoQjtnQkFDRSxJQUFHLElBQUksQ0FBQyxTQUFTO29CQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVM7MkJBQ3RDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQTs7b0JBRW5DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLFNBQVM7MkJBQzNDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQTthQUN0Qzs7O1dBQUE7UUFJRCxzQkFBSSw0Q0FBYTs7OztnQkFBakI7Z0JBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTO29CQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDO29CQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sS0FBSyxDQUFDO3VCQUN2QixJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUE7YUFDdEM7OztXQUFBOzs7O1FBR0QsZ0NBQUk7OztZQUFKO2dCQUNFLElBQUcsSUFBSSxDQUFDLFlBQVk7b0JBQ2xCLEtBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVM7d0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTs7YUFHN0Y7Ozs7UUFHRCxnQ0FBSTs7O1lBQUo7Z0JBQ0UsSUFBRyxJQUFJLENBQUMsYUFBYTtvQkFDbkIsS0FBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUzt3QkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFBOzthQUc3Rjs7Ozs7UUFHRCx1Q0FBVzs7OztZQUFYLFVBQVksQ0FBUztnQkFDbkIsT0FBTztvQkFDTCxVQUFVLEVBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUTtvQkFDMUMsTUFBTSxFQUFPLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7b0JBQ3RDLFNBQVMsRUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPO29CQUN6QyxNQUFNLEVBQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtvQkFDdEMsVUFBVSxFQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVE7aUJBQzNDLENBQUE7YUFDRjtRQUdELHNCQUFJLGtEQUFtQjs7O2dCQUF2QjtnQkFDRSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO2FBQy9EOzs7V0FBQTtRQUVELHNCQUNJLHdDQUFTOzs7Z0JBRGIsY0FDa0IsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUEsRUFBRTs7O1dBQUE7UUFFdkMsc0JBQ0ksc0NBQU87OztnQkFEWCxjQUNnQixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQSxFQUFFOzs7V0FBQTs7b0JBM0x6Q0EsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxrQkFBa0I7d0JBQzVCLFFBQVEsRUFBRSx3MkNBZ0REO3dCQUNULE1BQU0sRUFBRSxDQUFDLHE3RUFBcTdFLENBQUM7d0JBQy83RSxhQUFhLEVBQUVDLG9CQUFpQixDQUFDLElBQUk7cUJBQ3RDOzs7OzsrQkFhRUMsUUFBSzsrQkFFTEEsUUFBSztnQ0FFTEEsUUFBSzs2QkFFTEEsUUFBSzs2QkFFTEEsUUFBSztnQ0E2R0xDLGNBQVcsU0FBQyxlQUFlOzhCQUczQkEsY0FBVyxTQUFDLGFBQWE7O2dDQTdMNUI7Ozs7Ozs7QUNBQTs7OztvQkFNQ0MsV0FBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsNkJBQWE7eUJBQ2Q7d0JBQ0QsWUFBWSxFQUFFOzRCQUNaLGVBQWU7NEJBQ2YsaUJBQWlCO3lCQUNsQjt3QkFDRCxPQUFPLEVBQUU7NEJBQ1AsZUFBZTs0QkFDZixpQkFBaUI7eUJBQ2xCO3FCQUNGOzsyQkFsQkQ7Ozs7Ozs7QUNBQTtRQU9FO1NBQWlCOztvQkFMbEJDLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7OzRCQUpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==