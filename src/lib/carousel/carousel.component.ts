import { Component, OnInit, Input, TemplateRef, ViewEncapsulation, HostBinding } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'acar-ui-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {

  isLoading;
  isMobile;
  isFullScreen;
  lastIndex;
  iterable;
  loopable = true;
  positions;
  autoPosition;
  selectedSlideItem: any;

  @Input() infinite;

  @Input() interval = 4000;

  @Input() fivePoint;

  @Input() slides: any[] = [];

  @Input() custom: TemplateRef<any>;


  constructor() {}

  
  ngOnInit() {
    this.lastIndex = this.slides.length;

    if(this.fivePoint)
      this.init5Point()
    else
      this.init3Point()

    // TODO : ImagesLoaded
    setTimeout(() => this.isLoading = false, 300)
  }


  init3Point() {
    this.iterable = this.lastIndex > 1;
    this.positions = {
      'prev'   : this.lastIndex,
      'current': 1,
      'next'   : 2
    }
  }


  init5Point() {
    this.loopable = this.lastIndex >= 5;
    this.iterable = this.lastIndex > 3;
    this.positions = {
      'deepPrev' : this.loopable ? this.lastIndex : 0,
      'prev'     : 1,
      'current'  : 2,
      'next'     : 3,
      'deepNext' : this.iterable ? 4 : null
    }
  }


  slideClick(slideItem) {
    this.selectedSlideItem = slideItem;
  }


  startInterval() {
    clearInterval(this.autoPosition);

    this.autoPosition = setInterval(() => {
      this.next()
    }, this.interval)
  }


  // Decides if it is possible to iterate forward. More readable.
  get canGoForward() {
    if(this.fivePoint)
      return this.positions.next < this.lastIndex
        || this.infinite && this.loopable
    else 
      return this.positions.current !== this.lastIndex
        || this.infinite && this.loopable
  }


  // Decides if it is possible to iterate backward. Shorter.
  get canGoBackward() {
    return (this.fivePoint ?
      this.positions.prev > 1 :
      this.positions.current !== 1)
        || this.infinite && this.loopable
  }


  next() {
    if(this.canGoForward)
      for(let pos in this.positions)
        this.positions[pos] = this.positions[pos] < this.lastIndex ? this.positions[pos] + 1 : 1

    // this.startInterval();
  }


  prev() {
    if(this.canGoBackward)
      for(let pos in this.positions)
        this.positions[pos] = this.positions[pos] > 1 ? this.positions[pos] - 1 : this.lastIndex

    // this.startInterval();
  }


  setPosition(i: number) {
    return {
      'deepPrev':  i === this.positions.deepPrev,
      'prev':      i === this.positions.prev,
      'current':   i === this.positions.current,
      'next':      i === this.positions.next,
      'deepNext':  i === this.positions.deepNext
    }
  }


  get sliderButtonsHidden() {
    return !this.iterable && (!this.isMobile || this.isFullScreen)
  }

  @HostBinding('class.default')
  get isDefault() { return !this.custom }

  @HostBinding('class.ready')
  get isReady() { return !this.isLoading }
}
