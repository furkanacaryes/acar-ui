import { OnInit, TemplateRef } from '@angular/core';
export declare class CarouselComponent implements OnInit {
    isLoading: any;
    isMobile: any;
    isFullScreen: any;
    lastIndex: any;
    iterable: any;
    loopable: boolean;
    positions: any;
    autoPosition: any;
    selectedSlideItem: any;
    infinite: any;
    interval: number;
    fivePoint: any;
    slides: any[];
    custom: TemplateRef<any>;
    constructor();
    ngOnInit(): void;
    init3Point(): void;
    init5Point(): void;
    slideClick(slideItem: any): void;
    startInterval(): void;
    readonly canGoForward: boolean;
    readonly canGoBackward: boolean;
    next(): void;
    prev(): void;
    setPosition(i: number): {
        'deepPrev': boolean;
        'prev': boolean;
        'current': boolean;
        'next': boolean;
        'deepNext': boolean;
    };
    readonly sliderButtonsHidden: any;
    readonly isDefault: boolean;
    readonly isReady: boolean;
}
