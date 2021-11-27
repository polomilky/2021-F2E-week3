<template>
    <v-container class="section">
        <v-layout align-center justify-center>
            <div class="my-10 logoArea__sty">
                <div class="logoImgArea__sty">
                    <img class="logoImg__sty" src="../assets/Logo/BLogo.svg" alt="logo" />
                </div>
                <div class="title__sty">
                    <h1 class="title__sty">蛙蛙搭車Go</h1>
                </div>
            </div>
        </v-layout>
        <!-- 搜尋公車 -->
        <v-row no-gutters class="mx-12" v-show="show.searchBus">
            <v-col cols="12" sm="6">
                <v-text-field
                    v-model="searchBus"
                    label="請輸入欲查詢公車"
                    outlined
                    solo
                    dense
                    hide-details="auto"
                    class="input__sty input1__sty"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
                <v-select
                    :items="countryItems"
                    v-model="selectcountryItem"
                    item-text="CityName"
                    item-value="City"
                    label="縣市"
                    outlined
                    solo
                    dense
                    hide-details="auto"
                    class="input__sty input2__sty"
                    @change="getSelectCountry($event)"
                ></v-select>
            </v-col>
            <v-col cols="12" sm="2" class="text-left btnArea__sty">
                <v-btn depressed class="white--text btn__sty" @click="getSearchData">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <!-- 搜尋站牌 -->
        <v-row no-gutters class="mx-12" v-show="show.searchStop">
            <v-col cols="12" sm="6">
                <v-text-field
                    v-model="searchStop"
                    label="請輸入欲查詢站牌名"
                    outlined
                    solo
                    dense
                    hide-details="auto"
                    class="input__sty input1__sty"
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
                <v-select
                    :items="countryItems"
                    v-model="selectcountryItem"
                    item-text="CityName"
                    item-value="City"
                    label="縣市"
                    outlined
                    solo
                    dense
                    hide-details="auto"
                    class="input__sty input2__sty"
                    @change="getSelectCountry"
                ></v-select>
            </v-col>
            <v-col cols="12" sm="2" class="text-left btnArea__sty">
                <v-btn depressed class="white--text btn__sty" @click="getSearchStopData">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <!-- 搜尋地址或使用定位 -->
        <v-row justify="center" align="center" v-show="show.searchAddress">
            <v-btn depressed class="white--text btn__sty" @click="getPostion">
                <v-icon>mdi-map-marker-outline</v-icon>
            </v-btn>
        </v-row>
    </v-container>
</template>

<script>
    import jsSHA from "jssha"

    export default {
        name: 'Section',

        data: () => ({
            show: {
                searchBus: false,
                searchStop: false,
                searchAddress: false,
            },
            // 縣市
            countryItems: [
                { CityName: '臺北市', City: 'Taipei' },
                { CityName: '新北市', City: 'NewTaipei' },
                { CityName: '桃園市', City: 'Taoyuan' },
                { CityName: '新竹市', City: 'Hsinchu' },
                { CityName: '苗栗縣', City: 'MiaoliCounty' },
                { CityName: '台中市', City: 'Taichung' },
                { CityName: '嘉義市', City: 'Chiayi' },
                { CityName: '臺南市', City: 'Tainan' },
                { CityName: '高雄市', City: 'Kaohsiung' },
                { CityName: '屏東縣', City: 'PingtungCounty' },
                { CityName: '金門縣', City: 'KinmenCounty' },
            ],
            selectcountryItem: null,
            // 查詢公車
            searchBus: '',
            // 查詢站牌
            searchStop: '',
            // 查詢地址
            searchAddress: '',
            // 公車起點/終點
            busStart: '',
            busEnd: '',
            // 篩選出有在跑的公車(去程/回程)
            aliveGoBusData: [],
            aliveBackBusData: [],
            // 站點附近公車資料(去程/回程)
            stopGoData: [],
            stopBackData: [],
            // 定位取得經緯度
            center: [],
            // 定位附近公車資料
            positionData: [],
            positionDistance: [],
        }),
        methods: {
            getAuthorizationHeader() {
                //  填入自己 ID、KEY 開始
                let AppID = process.env.VUE_APP_API_ID;
                let AppKey = process.env.VUE_APP_API_KEY;
                //  填入自己 ID、KEY 結束
                let GMTString = new Date().toGMTString();
                let ShaObj = new jsSHA('SHA-1', 'TEXT');
                ShaObj.setHMACKey(AppKey, 'TEXT');
                ShaObj.update('x-date: ' + GMTString);
                let HMAC = ShaObj.getHMAC('B64');
                let Authorization = `hmac username="${AppID}",algorithm="hmac-sha1",headers="x-date",signature="${HMAC}"`
                return { 'Authorization': Authorization, 'X-Date': GMTString };
            },
            // 取得縣市api
            getAreaData() {
                this.axios.get(
                    `https://gist.motc.gov.tw/gist_api/V3/Map/Basic/City?$format=JSON`, {
                        headers: this.getAuthorizationHeader()
                    }
                )
                    .then((response) => {
                        this.countryItems = response.data;
                    })
                    .catch((error) => {
                        alert(error.data);
                    });
            },
            getSelectCountry(e) {
                this.selectcountryItem = e;
            },
            // 取得搜尋公車搜尋資料
            async getSearchData() {
                try {
                const [{ value: estimatedTimes }, { value: stops }] =
                await Promise.allSettled([
                    this.getEstimatedTimeData(),
                    this.getStopOfRoute()
                ]);
                    this.aliveGoBusData = this.getStopsStatus(0, stops, estimatedTimes) ?? [];
                    this.aliveBackBusData = this.getStopsStatus(1, stops, estimatedTimes) ?? [];
                    this.$emit('listenToChildEvent', this.aliveGoBusData, this.aliveBackBusData);
                } catch (err) {
                    alert(`錯誤: ${err}`)
                }
            },
            // 取得公車到站時間與發車狀態
            getEstimatedTimeData() {
                return new Promise((resolve, reject) => {
                    this.axios.get(
                        `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${this.selectcountryItem}/${this.searchBus}?$format=JSON`, {
                            headers: this.getAuthorizationHeader()
                        }
                    )
                        .then((response) => {
                            resolve(response.data);
                        })
                        .catch((error) => {
                            reject(error.response.data.Message);
                        });
                });
            },
            // 取得各站點
            getStopOfRoute() {
                return new Promise((resolve, reject) => {
                    this.axios.get(
                        `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${this.selectcountryItem}/${this.searchBus}?$format=JSON`, {
                            headers: this.getAuthorizationHeader()
                        }
                    )
                        .then((response) => {
                            resolve(response.data);
                        })
                        .catch((error) => {
                            reject(error.response.data.Message);
                        });
                })
            },
            // 取得鄰近公車/到站時間&公車來回站點搜尋資料
            async getSearchStopData() {
                try {
                    const stops = await this.getSearchStop();
                    this.stopGoData = [];
                    this.stopBackData = [];
                    stops.forEach((item => {
                        // [0:'去程',1:'返程',2:'迴圈',255:'未知'] 
                        if (item.Direction === 0) {
                            this.stopGoData.push({
                                stopUID: item.StopUID,
                                routeName: item.RouteName.Zh_tw,
                                direction: item.Direction,
                                estimatedSeconds: item.EstimateTime,
                                stopStatus: item.StopStatus
                            });
                        } else {
                            this.stopBackData.push({
                                stopUID: item.StopUID,
                                routeName: item.RouteName.Zh_tw,
                                direction: item.Direction,
                                estimatedSeconds: item.EstimateTime,
                                stopStatus: item.StopStatus
                            });
                        }
                    }))
                    this.$emit('listenToChildStopEvent', this.stopGoData, this.stopBackData);
                } catch (err) {
                    alert(`錯誤: ${err}`)
                }
            },
            // 取得鄰近公車/到站時間
            getSearchStop() {
                return new Promise((resolve, reject) => {
                    this.axios.get(
                        `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${this.selectcountryItem}?$filter=contains(StopName%2FZh_tw%2C'${this.searchStop}')&$format=JSON`, {
                            headers: this.getAuthorizationHeader()
                        }
                    )
                        .then((response) => {
                            resolve(response.data);
                        })
                        .catch((error) => {
                            reject(error.response.data.Message);
                        });
                });
            },
            // 取得公車來回站點
            getSearchStopName() {
                return new Promise((resolve, reject) => {
                    this.axios.get(
                        `https://ptx.transportdata.tw/MOTC/v2/Bus/Stop/City/${this.selectcountryItem}?$filter=contains(StopName%2FZh_tw%2C'${this.searchStop}')&$format=JSON`, {
                            headers: this.getAuthorizationHeader()
                        }
                    )
                        .then((response) => {
                            resolve(response.data);
                        })
                        .catch((error) => {
                            reject(error.response.data.Message);
                        });
                });
            },
            // 處理回傳資料
            getStopsStatus(direction, stops, estimatedTimes) {
                return stops
                    .find(({ Direction }) => Direction === direction)
                        ?.Stops.map((stop) => {
                            const { PlateNumb, EstimateTime, StopStatus } =
                            estimatedTimes.find(
                                ({ Direction, StopUID }) =>
                                Direction === direction && StopUID === stop.StopUID
                            ) ?? {};
                            return {
                                stopUID: stop.StopUID,
                                stopName: stop.StopName.Zh_tw,
                                stopStatus: StopStatus,
                                plateNumb: PlateNumb,
                                estimatedSeconds: EstimateTime,
                            };
                        })
                    .filter(
                        (stop, index, originalArray) =>
                            index ===
                            originalArray.findIndex(
                                (stopDuplicate) => stop.stopUID === stopDuplicate.stopUID
                            )
                    );
            },
            // 定位
            getPostion() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.showPosition, this.geoError);
                } else {
                    this.center = [25.09108, 121.5598];
                    this.$emit('listenToChildPositionEvent', this.center);
                    this.getPositionData();
                }
            },
            showPosition(position) {
                this.center = [position.coords.latitude, position.coords.longitude];
                this.$emit('listenToChildPositionEvent', this.center);
                this.getPositionData();
            },
            geoError(error) {
                if (error.code === 1) {
                    this.center = [25.09108, 121.5598];
                } else {
                    alert(`錯誤: ${error.message}`);
                }
            },
            getPositionData() {
                this.axios.get(
                        `https://ptx.transportdata.tw/MOTC/v2/Bus/Station/NearBy?$spatialFilter=nearby(${this.center[0]},${this.center[1]},500)&$format=JSON`, {
                            headers: this.getAuthorizationHeader()
                        }
                    )
                        .then((response) => {
                            this.positionData = response.data;
                            this.distance(response.data, this.center);
                            this.$emit('listenToChildPositionDataEvent', this.positionData, this.positionDistance);
                        })
                        .catch((error) => {
                            alert(error.Message);
                        });
            },
            distance(stopPos, YourPos) {
                let radlat1 = 0;
                let radlat2 = 0;
                let theta = 0;
                let radtheta = 0;
                let dist = 0;
                this.positionDistance = [];
                for (let i = 0; i < stopPos.length; i++) {
                    if ((stopPos[i].StationPosition.PositionLat == YourPos[0]) && (stopPos[i].StationPosition.PositionLon == YourPos[1])) {
                        this.positionDistance.push(0);
                    } else {
                        radlat1 = Math.PI * stopPos[i].StationPosition.PositionLat/180;
                        radlat2 = Math.PI * YourPos[0]/180;
                        theta = stopPos[i].StationPosition.PositionLon-YourPos[1];
                        radtheta = Math.PI * theta/180;
                        dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                        if (dist > 1) {
                            dist = 1;
                        }
                        dist = Math.acos(dist);
                        dist = dist * 180/Math.PI;
                        dist = dist * 60 * 1.1515;
                        dist = dist * 1.609344;
                        this.positionDistance.push(dist*1000);
                    }
                }
            },
            init() {
                const url = this.$route.fullPath;
                switch(url) {
                    case '/road':
                        this.show.searchBus = true;
                        this.show.searchStop = false;
                        this.show.searchAddress = false;
                        break;
                    case '/stops':
                        this.show.searchBus = false;
                        this.show.searchStop = true;
                        this.show.searchAddress = false;
                        break;
                    case '/position':
                        this.show.searchBus = false;
                        this.show.searchStop = false;
                        this.show.searchAddress = true;
                        break;
                    default:
                        return false;
                }
            }
        },
        mounted() {
            this.init();
            // this.getAreaData();
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
    .section
        background: $unnamed-color-d0e6a5
        height: 300px
    .logoArea__sty
        display: flex
        align-items: end
    .title__sty
        font-family: $unnamed-font-family-zen-maru-gothic
        color: $unnamed-color-1b3f25
        font-style: $unnamed-font-style-normal
        font-weight: $unnamed-font-weight-normal
        font-size: $unnamed-font-size-24
        line-height: $unnamed-line-spacing-32
        letter-spacing: $unnamed-character-spacing-0
    .logoImg__sty
        width: 91.46px
        // height: 137.19px
    .logoImgArea__sty
        display: inline-flex
        align-items: center
        justify-content: center
    .input1__sty
        width: 300px
    .input2__sty
        width: 192px
    .input3__sty
        width: 408px
    .theme--light.v-btn.v-btn--has-bg.btn__sty
        background: $unnamed-color-42bc87 0% 0% no-repeat padding-box
        border: 2px solid $unnamed-color-42bc87
        border-radius: 3px
        opacity: 1
        width: 84px
        // height: 64px
    .btn__sty .v-icon.v-icon
        font-size: 33.49px
    @media screen and (max-width: 600px)
        .v-application .logoArea__sty
            margin-top: 20px !important
            margin-bottom: 20px !important
        .v-text-field.v-text-field--enclosed.input1__sty, .v-text-field.v-text-field--enclosed.input2__sty
            margin-bottom: 10px
        .input1__sty, .input2__sty
            width: 100%
        .v-application .btnArea__sty
            text-align: center !important
</style>
