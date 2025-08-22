// src/shade/carousel/CarouselItem.js
import Plane from '../carousel/Plane';

export default class CarouselItem {
  constructor({ texture, width, height, scene }) {
    this.plane = new Plane({ texture, width, height, scene });
    this.active = false;
  }

  setActive(state, viewport) {
    this.active = state;
    this.plane.setActive(state, viewport);
  }

  setPosition(x, y, z) {
    this.plane.setPosition(x, y, z);
  }
}
