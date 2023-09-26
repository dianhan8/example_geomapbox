// ES6
import Map, { Layer, Source } from 'react-map-gl';
import { useMemo } from 'react';

export const ChoroplethMap = ({ data = [], options, onChangeOption }) => {
  const layerStyle = {
    id: 'location',
    type: 'fill',
    paint: {
      'fill-color': 'rgba(27, 65, 168, 0.4)',
      'fill-outline-color': '#000000'
    },
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      1,
      0.5
    ]
  };

  const geoList = useMemo(() => data, [data]);

  return (
    <div className="mt-4" >
      <Map
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: 116.6951512,
          latitude: -3.1877921,
          zoom: 3.5
        }}
        latitude={options?.viewLongLat?.lat}
        longitude={options?.viewLongLat?.long}
        zoom={options?.zoom}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="access_token_mapbox"
        onClick={(e) => onChangeOption({
          long: e.lngLat.lng,
          lat: e.lngLat.lat,
        })}
        interactiveLayerIds={["location"]}
      >
        <Source id="location" type="geojson" data={geoList}>
          <Layer
            {...layerStyle}
          />
        </Source>
      </Map>
    </div >
  )
}