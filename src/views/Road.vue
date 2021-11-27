<template>
    <v-container class="road">
        <Header />
        <Section @listenToChildEvent="getDatafromChild" />
        <BusArea
            :getGoBusData = "goBusData"
            :getBackBusData = "backBusData"
            v-if="goBusData.length !== 0 || this.backBusData.length !== 0"
        />
        <NoResult
            v-show="show.noResult"
        />
    </v-container>
</template>

<script>
    import Header from '../components/Header'
    import Section from '../components/Section'
    import BusArea from '../components/BusArea'
    import NoResult from '../components/noResult'

    export default {
        name: 'Road',

        components: {
            Header,
            Section,
            BusArea,
            NoResult
        },
        data: () => ({
            goBusData: [],
            backBusData: [],
            show: {
                noResult: false
            }
        }),
        methods: {
            getDatafromChild(goItem, backItem) {
                this.goBusData = goItem;
                this.backBusData = backItem;
                if (goItem.length === 0 && backItem.length === 0) {
                    this.show.noResult = true;
                } else {
                    this.show.noResult = false;
                }
            }
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
    .road
        background: $unnamed-color-f9fcf4
</style>
