<template>
    <div class="map__sty" id="map"></div>
</template>

<script>

export default {
    name: "Map",
    props: ['getCenter'],

    data: () => ({
        map: null,
        MapUrl: `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX}`,
    }),
    methods: {
        init() {
            this.map = this.$utils.map.createMap("map");
            // 地圖中心位置
            this.map.setView(this.getCenter, 17);
            // 加入圖層
            this.$utils.map.createTileLayer(this.map, this.MapUrl, {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 24,
                id: 'mapbox/streets-v11',
                titleSize: 512,
                // zoomOffset: -1
            });
            this.$utils.map.createMakerByXY(this.map, [this.getCenter[0], this.getCenter[1]]);
        }
    },
    mounted() {
        this.init();
    }
};
</script>
<style lang="sass">
    .map__sty
        width: 100%
        height: 250px
</style>
