declare namespace kakao {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
    }
    class Map {
      constructor(container: HTMLElement, options: object);
    }
    class Marker {
      constructor(options: object);
    }
    class InfoWindow {
      constructor(options: object);
    }
  }
}