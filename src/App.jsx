import { useState } from 'react'
import './App.css'
import { ChoroplethMap } from './PanelMap'
import { SearchBox } from './SearchBox'
import province from './json/province.json'
import kabupaten from './json/kabupaten.json'

function App() {
  const [listGeoLocation, setGeoLocation] = useState(province);
  const [currentView, setCurrentView] = useState({
    viewLongLat: {
      long: '116.6951512',
      lat: '-3.1877921'
    },
    zoom: 3.5,
  })

  /**
   * 
   * @param {number} total 
   */
  const getZoomValue = (total) => {
    if (total < 5) return 9;
    if (total < 8) return 9.5;
    if (total < 10) return 8.5;
    if (total == 10) return 7.5;
    if (total > 10) return 7;
    if (total > 18) return 6.5;
    if (total > 20) return 6;

    return 6
  }

  const onSearch = (values) => {
    const provinceSelected = province.features.filter((x) => x.properties.name.toLowerCase().includes(values?.search?.toLowerCase()))
    if (provinceSelected.length === 0) return window.alert("Not Found");

    const longLatProvince = {
      lat: provinceSelected?.[0]?.geometry?.coordinates?.[0]?.[0]?.[0]?.[1],
      long: provinceSelected?.[0]?.geometry?.coordinates?.[0]?.[0]?.[0]?.[0]
    }

    const listKabupaten = kabupaten.features.filter((x) => parseInt(x.properties.province_id) == provinceSelected?.[0]?.properties?.province_id?.toFixed(0))

    setCurrentView({
      viewLongLat: {
        long: longLatProvince.long,
        lat: longLatProvince.lat,
      },
      zoom: getZoomValue(listKabupaten.length),
    })

    setGeoLocation({
      "type": "FeatureCollection",
      "name": "all_kabkota_ind",
      "crs": {
        "type": "name",
        "properties": {
          "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
      },
      "features": listKabupaten
    });
  }

  return (
    <div className="my-4 mx-4 w-full">
      <SearchBox
        onApply={onSearch}
      />

      <ChoroplethMap
        data={listGeoLocation}
        options={currentView}
        onChangeOption={(values) => {
          setCurrentView({
            viewLongLat: {
              long: values?.long,
              lat: values?.lat,
            },
            zoom: 6,
          })
        }}
      />
    </div>
  )
}

export default App