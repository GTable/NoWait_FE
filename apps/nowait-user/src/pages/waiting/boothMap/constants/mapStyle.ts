export const mapStyle = [
  {
    "stylers": [
      { "hue": "#ff1a01" },
      { "invert_lightness": true },
      { "saturation": -100 },
      { "lightness": 28 },
      { "gamma": 0.5 }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "color": "#242f3e" }
    ]
  },
  // 라벨 제거
  {
    "featureType": "all",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  }
]
