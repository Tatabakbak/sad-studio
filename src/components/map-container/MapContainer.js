import React, {Component, createRef} from 'react';

export default class MapContainer extends Component {

    office = {
        lat: 59.9470600,
        lng: 30.264250
    };

    mapRef = createRef();

    componentDidMount() {
         if (!window.google) {
             const googleMapScript = document.createElement(`script`);
             googleMapScript.src =
                 `https://maps.googleapis.com/maps/api/js?key=` +
                 process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
             window.document.body.appendChild(googleMapScript);
             googleMapScript.addEventListener('load', this.initMap);
         } else {
             this.initMap();
         }
    };

    initMap = () => {
        this.googleMap = this.createMap();
        this.addMapStyles();
        this.infoWindow = this.createInfoWindow();
        this.marker = this.createMarker();
        this.marker.addListener('click', () => {
            this.infoWindow.open(this.googleMap, this.marker);
        });
        this.infoWindow.open(this.googleMap, this.marker);
    };

    createMap = () => {
        return new  window.google.maps.Map(this.mapRef.current,
            {
                center: this.office,
                zoom: 14,
                gestureHandling: 'greedy',
                disableDefaultUI: true
            });
    };

    addMapStyles = () => {
        let styledMapType = new window.google.maps.StyledMapType(
            [
                {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
                {
                    featureType: 'landscape.man_made',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#ac8435'}]
                },
                {
                    "featureType": "poi.business",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#93817c'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry.fill',
                    stylers: [{color: '#a5b076'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#447530'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#f5f1e6'}]
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'geometry',
                    stylers: [{color: '#fdfcf8'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#f8c967'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#e9bc62'}]
                },
                {
                    featureType: 'road.highway.controlled_access',
                    elementType: 'geometry',
                    stylers: [{color: '#e98d58'}]
                },
                {
                    featureType: 'road.highway.controlled_access',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#db8555'}]
                },
                {
                    featureType: 'road.local',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#806b63'}]
                },
                {
                    featureType: 'transit.line',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry.fill',
                    stylers: [{color: '#b9d3c2'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#92998d'}]
                }
            ],
            {name: 'Styled Map'});
        this.googleMap.mapTypes.set('styled_map', styledMapType);
        this.googleMap.setMapTypeId('styled_map');
    };

    createInfoWindow = () => {
        let contentString =
            '<div id="content">' +
            '<h3 id="firstHeading" class="firstHeading">САД Михаила Добровольского</h3>' +
            '<div id="bodyContent">' +
            '<p> г. Санкт-Петербург, 12-я линия В.О., дом 55</p>' +
            '</div>' +
            '</div>';

        return new window.google.maps.InfoWindow({
            content: contentString
        });
    };

    createMarker = () => {
        return new window.google.maps.Marker({
            position: this.office,
            map: this.googleMap,
        })
    };

    render() {
        return (
            <div
                id="map"
                ref={this.mapRef}
                style={{width: '500px', height: '400px'}}
            />
        );
    }
}