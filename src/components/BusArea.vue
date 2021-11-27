<template>
    <div>
        <v-row>
            <v-col cols="6" sm="6" class="text-center">
                <button :class="leftBtnSty" @click="toggleGoBtn">往 {{getBackBusData[0].stopName}}</button>
            </v-col>
            <v-col cols="6" sm="6" class="text-center">
                <button :class="rightBtnSty" @click="toggleBackBtn">往 {{getGoBusData[0].stopName}}</button>
            </v-col>
        </v-row>
        <div class="areaHeight__sty">
            <div class="mb-6 pl-6 area__sty" v-for="(item) in getBackBusData" :key="item.stopUID" v-show="show.go">
                <!-- 車輛狀態備註 : [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運'] ,  -->
                <span class="px-2 label__sty ingLabel__sty" v-if="item.stopStatus === 0 && item.estimatedSeconds < 120">進站中</span>
                <span class="px-2 label__sty soonLabel__sty" v-if="item.stopStatus === 0 && item.estimatedSeconds > 120">{{Math.floor(item.estimatedSeconds/60)}}mins</span>
                <span class="px-2 label__sty noLabel__sty" v-if="item.stopStatus !== 0">
                    {{(item.stopStatus === 1) ? '未發車' : (item.stopStatus === 2) ? '交管不停靠' : (item.stopStatus === 3) ? '末班車已過' : '今日未營運'}}
                </span>
                <span class="ml-4">{{item.stopName}}</span>
            </div>
            <div class="mb-6 pl-6 area__sty" v-for="(item) in getGoBusData" :key="item.stopUID" v-show="show.back">
                <!-- 車輛狀態備註 : [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運'] ,  -->
                <span class="px-2 label__sty ingLabel__sty" v-if="item.stopStatus === 0 && item.estimatedSeconds < 120">進站中</span>
                <span class="px-2 label__sty soonLabel__sty" v-if="item.stopStatus === 0 && item.estimatedSeconds > 120">{{Math.floor(item.estimatedSeconds/60)}}mins</span>
                <span class="px-2 label__sty noLabel__sty" v-if="item.stopStatus !== 0">
                    {{(item.stopStatus === 1) ? '未發車' : (item.stopStatus === 2) ? '交管不停靠' : (item.stopStatus === 3) ? '末班車已過' : '今日未營運'}}
                </span>
                <span class="ml-4">{{item.stopName}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'BusArea',
        props: ['getGoBusData', 'getBackBusData'],

        data: () => ({
            show: {
                go: true,
                back: false
            }
        }),
        computed: {
            leftBtnSty() {
                if (this.show.go === false) {
                    return `my-4 btn__sty`
                } else {
                    return `my-4 btn__sty btnActive__sty`
                }
            },
            rightBtnSty() {
                if (this.show.back === false) {
                    return `my-4 btn__sty`
                } else {
                    return `my-4 btn__sty btnActive__sty`
                }
            }
        },
        methods: {
            toggleGoBtn() {
                this.show.go = true;
                this.show.back = false;
            },
            toggleBackBtn() {
                this.show.back = true;
                this.show.go = false;
            }
        },
        mounted() {
        },
        watch: {
            getBackBusData() {
                this.show.go = true;
                this.show.back = false;
            },
            getGoBusData() {
                this.show.go = true;
                this.show.back = false;
            },
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
    .btn__sty
        background: #fff 0% 0% no-repeat padding-box
        border: 1.5px solid $unnamed-color-3e6e41
        border-radius: 3px
        font-family: $unnamed-font-family-zen-maru-gothic
        font-style: $unnamed-font-style-normal
        font-weight: $unnamed-font-weight-medium
        font-size: $unnamed-font-size-16
        letter-spacing: $unnamed-character-spacing-0
        color: $unnamed-color-3e6e41
        width: 160px
        height: 48px
    .btnActive__sty
        background: $unnamed-color-3e6e41 0% 0% no-repeat padding-box
        color: $unnamed-color-d6e4d7
    .label__sty
        background: #fff 0% 0% no-repeat padding-box
        border: 1.5px solid $unnamed-color-3e6e41
        border-radius: 3px
        font-family: $unnamed-font-family-zen-maru-gothic
        font-style: $unnamed-font-style-normal
        font-weight: $unnamed-font-weight-normal
        font-size: $unnamed-font-size-16
        letter-spacing: 0px
        color: $unnamed-color-3e6e41
        width: 72px
        height: 32px
        text-align: center
    .ingLabel__sty
        background: $unnamed-color-3e6e41 0% 0% no-repeat padding-box
        color: $unnamed-color-f9fcf4
    .noLabel__sty
        background: $unnamed-color-d6e4d7 0% 0% no-repeat padding-box
        border: 1.5px solid $unnamed-color-d6e4d7
        color: $unnamed-color-f9fcf4
    .area__sty
        width: 100%
    .areaHeight__sty
        height: 250px
        overflow-y: auto
</style>
