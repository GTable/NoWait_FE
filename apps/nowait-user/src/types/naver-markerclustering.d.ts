export {};

declare global {
  interface Window {
    naver: typeof naver;
    MarkerClustering?: any;
  }

  namespace naver {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
        lat(): number;
        lng(): number;
      }

      class Marker {
        constructor(options: any);
        setMap(map: any | null): void;
      }

      class Polygon {
        constructor(options: any);
        setMap(map: any | null): void;
      }

      class MarkerClustering {
        constructor(options: any);
        setMap(map: any | null): void;
      }

      class Size {
        constructor(width: number, height: number);
      }

      class Point {
        constructor(x: number, y: number);
      }

      const Position: any;
      const ZoomControlStyle: any;
    }
  }
}