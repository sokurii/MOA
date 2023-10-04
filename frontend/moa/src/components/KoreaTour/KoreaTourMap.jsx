import React from "react";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useState, useEffect, useRef } from "react";
import KoreaTourCarousel from "./KoreaTourCarousel";
import styles from '../../styles/KoreaTour/KoreaTourMap.module.css';
import { style } from "d3-selection";

function KoreaTourMap({mediaName, mediaPlaceList }) {
  const [selectedPlace, setSelectedPlace] = useState();
  const [visible, setVisible] = useState(true);
  const mapRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // 현재 선택된 마크가 존재하는지

  const { kakao } = window;

  const handleMapClick = (e) => {
    setVisible(false);
    if (mapRef.current) {
      mapRef.current.relayout();
    }
  }

  const handleMarkerClick = (e, place) => {
    setVisible(true);
    if (mapRef.current) {
      mapRef.current.relayout();
    }
    setSelectedPlace(place);
    setIsOpen(true);
  };

  const changeCenterByCarousel = (smIndex) => {
    setSelectedPlace(mediaPlaceList[smIndex]);
  };

  useEffect(() => {
    if (mediaPlaceList.length > 0) {
      setIsOpen(true);
      setSelectedPlace(mediaPlaceList[0]);
    }
  }, [mediaPlaceList]);

  useEffect(() => {
    if (mapRef.current) {
      const newCenter = new kakao.maps.LatLng(selectedPlace.latitude, selectedPlace.longitude);
      mapRef.current.panTo(newCenter);
    }
  }, [selectedPlace]);

  return (
    <div className={styles.container}>
      <div className={styles.searchName}>'{mediaName}' 검색 결과</div>
      <div className={(visible ? styles.mapActive : styles.map)}>
      <Map
        className={(visible ? styles.mapActive : styles.map)}
        center={mediaPlaceList.length>0? { lat: mediaPlaceList[0].latitude, lng: mediaPlaceList[0].longitude} : { lat: 37.644825, lng: 127.681114 }}
        level={3}
        ref={mapRef}
        draggable={true}
        onClick={(e) => handleMapClick(e)}
      >
        {mediaPlaceList.map((place) => (
          <>
            <MapMarker
              key={`${place.latitude}-${place.longitude}`}
              position={{ lat: `${place.latitude}`, lng: `${place.longitude}` }}
              image={{
                src:
                  place.placeTy === "cafe"
                    ? process.env.PUBLIC_URL+`/assets/KoreaTour/cafe.png`
                    : place.placeTy === "playground"
                    ? process.env.PUBLIC_URL+"/assets/KoreaTour/playground.png"
                    : place.placeTy === "restaurant"
                    ? process.env.PUBLIC_URL+"/assets/KoreaTour/restaurant.png"
                    : place.placeTy === "stay"
                    ? process.env.PUBLIC_URL+"/assets/KoreaTour/stay.png"
                    : place.placeTy === "station"
                    ? process.env.PUBLIC_URL+"/assets/KoreaTour/station.png"
                    : place.placeTy === "store"
                    ? process.env.PUBLIC_URL+"/assets/KoreaTour/store.png"
                    : "https://user-images.githubusercontent.com/91959791/169664489-10a08071-905f-4a44-9a14-ae065704ced5.png",
                size: { width: 35, height: 35 },
                options: {
                  offset: {
                    x: 10,
                    y: -10,
                  },
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              }}
              title={place.placeNm}
              onClick={(e) => handleMarkerClick(e, place)}
            />
            {isOpen &&
              selectedPlace.id == place.id && ( // 현재 선택된 마크만 오버레이 보이게 설정
                <CustomOverlayMap
                  position={{ lat: `${place.latitude}`, lng: `${place.longitude}` }}
                  yAnchor={1}
                >
                  <div
                    className="customoverlay"
                    style={{
                      padding: "9px",
                      backgroundColor: "#fff",
                      color: "#000",
                      border: "2px solid green",
                      borderTopLeftRadius: "50% 100px",
                      borderTopRightRadius: "50% 100px",
                      borderBottomLeftRadius: "50% 100px",
                      borderBottomRightRadius: "50% 100px",
                    }}
                  >
                    {place.placeNm}
                  </div>
                </CustomOverlayMap>
              )}
          </>
        ))}
        </Map>
        </div>
      {visible &&
        <KoreaTourCarousel
        mediaPlaceList={mediaPlaceList}
        selectedPlace={selectedPlace}
        changeCenterByCarousel={changeCenterByCarousel}
      />
      }
    </div>
  );
}

export default KoreaTourMap;
