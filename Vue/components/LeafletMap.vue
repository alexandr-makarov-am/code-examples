<template>
    <div id="map"></div>
</template>
<script>
    import L from 'leaflet';
    import polyline from 'polyline';
    export default {
        name: "LeafletMap",
        methods: {
            initMap() {
                this.map = L.map('map');
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1
                }).addTo(this.map);
                this.markerLayout = new L.LayerGroup();
                this.markerLayout.addTo(this.map);
                this.map.on('load', () => {
                    this.renderPoints(this.points);
                });
                this.map.setView([51.505, -0.09], 13);
            },
            renderPoints(el) {
                this.markerLayout.clearLayers();
                let bounds = [];
                el.map((coords) => {
                    if (coords !== undefined && coords[0] !== undefined && coords[1] !== undefined) {
                        const data = [coords[0], coords[1]];
                        L.marker(data).addTo(this.markerLayout);
                        bounds.push(data);
                    }
                });

                if (this.route) {
                    L.polyline(this.route, {color: 'red'}).addTo(this.markerLayout);
                }

                if (bounds.length > 0) {
                    this.map.fitBounds(bounds);
                }
            }
        },
        computed: {
            points: function () {
                let data = [];
                if (this.markers) {
                    data = JSON.parse(this.markers).map((point) => {
                        if (point.lat && point.lon) {
                            return [point.lat, point.lon];
                        }
                    });
                }
                return data;
            },
            route: function () {
                let data = [];
                if (this.geometry) {
                    data = polyline.decode(this.geometry);
                }
                return data;
            }
        },
        watch: {
            points: {
                handler: function (el) {
                   if (el.length > 0) {
                       this.renderPoints(el);
                   }
                }
            }
        },
        props: {
            markers: String,
            geometry: String
        },
        mounted() {
            /* This code is needed to properly load the images in the Leaflet CSS */
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
                iconUrl: require('leaflet/dist/images/marker-icon.png'),
                shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
            });
            this.initMap();
        },
        data() {
            return {
                map: null,
                markerLayout: null,
            }
        }
    }
</script>
<style scoped>
    #map {
        min-height: 420px;
    }
</style>