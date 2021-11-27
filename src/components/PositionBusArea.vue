<template>
    <div class="positionBusArea__sty">
        <div class="mb-4" v-for="(item, idx) in getPositionData" :key="item.stopUID">
            <v-icon>mdi-map-marker</v-icon>
            <span class="ml-2 d-inline-block labelTitle__sty labelTitle1__sty">
                {{item.Stops[0].RouteName.Zh_tw}}: <font>{{item.StationAddress}}</font>
            </span>
            <span class="ml-2 d-inline-block labelTitle__sty">
                <font>- 距離{{Math.round(getDistanceData[idx])}}m</font>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PositionBusArea',
        props: ['getPositionData', 'getDistanceData'],

        data: () => ({
        }),
        computed: {
        },
        methods: {
        },
        mounted() {
        }
    }
</script>

<style lang="sass" scoped>
    // color
    $unnamed-color-f9fcf4: #F9FCF4
    $unnamed-color-d6e4d7: #D6E4D7
    $unnamed-color-d0e6a5: #D0E6A5
    $unnamed-color-77b441: #77B441
    $unnamed-color-3e6e41: #3E6E41
    $unnamed-color-1b3f25: #1B3F25
    $unnamed-color-42bc87: #42BC87
    $unnamed-color-94c85c: #94C85C
    // text
    $unnamed-font-family-zen-maru-gothic: Zen Maru Gothic
    $unnamed-font-family-microsoft-jhenghei: Microsoft JhengHei
    $unnamed-font-style-normal: normal
    $unnamed-font-weight-medium: medium
    $unnamed-font-weight-normal: normal
    $unnamed-font-size-13: 13px
    $unnamed-font-size-16: 16px
    $unnamed-font-size-24: 24px
    $unnamed-font-size-26: 26px
    $unnamed-font-size-32: 32px
    $unnamed-character-spacing-0: 0px
    $unnamed-character-spacing-0-26: 0.26px
    $unnamed-character-spacing-3-9: 3.9px
    $unnamed-character-spacing-3-84: 3.84px
    $unnamed-line-spacing-20: 20px
    $unnamed-line-spacing-24: 24px
    $unnamed-line-spacing-32: 32px
    $unnamed-line-spacing-35: 35px
    $unnamed-line-spacing-40: 40px
    .positionBusArea__sty
        height: 250px
        overflow-y: auto
    i.v-icon.v-icon
        color: $unnamed-color-3e6e41
    .labelTitle__sty
        font-family: $unnamed-font-family-microsoft-jhenghei
        font-style: $unnamed-font-style-normal
        font-weight: bold
        font-size: 20px
        letter-spacing: $unnamed-character-spacing-0
        color: $unnamed-color-3e6e41
    .labelTitle1__sty font
        word-break: word
        font-size: $unnamed-font-size-16
    .label__sty
        font-family: $unnamed-font-family-microsoft-jhenghei
        font-style: $unnamed-font-style-normal
        font-size: $unnamed-font-size-16
        font-weight: bold
        letter-spacing: $unnamed-character-spacing-0
        color: $unnamed-color-3e6e41
        letter-spacing: $unnamed-character-spacing-0
</style>
