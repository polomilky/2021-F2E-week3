<template>
  <v-container>
    <div class="about">
      <v-select
        :items="areaData"
        v-model="selectArea"
        item-text="CityName"
        item-value="City"
        label="選擇縣市"
        dense
        outlined
        hide-details="auto"
        return-object
        @change="getSelectArea"
      ></v-select>
      <hr />
      <v-text-field
        label="輸入公車路線"
        v-model="routeName"
        outlined
        solo
        dense
        hide-details="auto"
        append-icon="mdi-magnify"
      ></v-text-field>
      <v-btn @click="getSearchData">送出</v-btn>
      <div>
        <!-- {{aliveGoBusData}} -->
        <div v-for="(aliveGoBusData, idx) in aliveGoBusData" :key="idx">
          <span>{{aliveGoBusData.stopName}}</span>
          <!-- 車輛狀態備註 : [0:'正常',1:'尚未發車',2:'交管不停靠',3:'末班車已過',4:'今日未營運'] ,  -->
          <span v-if="aliveGoBusData.stopStatus === 0 && aliveGoBusData.estimatedSeconds < 120">進站中{{aliveGoBusData.estimatedSeconds}}秒</span>
          <span v-if="aliveGoBusData.stopStatus === 0 && aliveGoBusData.estimatedSeconds > 120">約{{Math.floor(aliveGoBusData.estimatedSeconds/60)}}分</span>
          <span v-if="aliveGoBusData.stopStatus !== 0">
            {{(aliveGoBusData.stopStatus === 1) ? '尚未發車' : (aliveGoBusData.stopStatus === 2) ? '交管不停靠' : (aliveGoBusData.stopStatus === 3) ? '末班車已過' : '今日未營運'}}
          </span>
        </div>
      </div>
      <hr />
      <!-- <div>
        {{aliveBackBusData}}
      </div> -->
    </div>
  </v-container>
</template>

<script>
  import jsSHA from "jssha"

  export default {
    name: 'About',
    props: [],
    components: {
    },

    data: () => ({
      // 選擇縣市
      selectArea: null,
      areaData: [],
      // 公車路線
      routeName: null,
      // 篩選出有在跑的公車(去程/回程)
      aliveGoBusData: [],
      aliveBackBusData: [],
    }),
    computed: {
    },
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
            this.areaData = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      // 選擇縣市
      getSelectArea(e) {
        this.selectArea = e.City;
      },
      // 取得搜尋資料
      async getSearchData() {
        try {
          const [{ value: estimatedTimes }, { value: stops }] =
          await Promise.allSettled([
            this.getEstimatedTimeData(),
            this.getStopOfRoute()
          ]);
          console.log(estimatedTimes);
          console.log(stops);
          this.aliveGoBusData = this.getStopsStatus(0, stops, estimatedTimes) ?? []; //沒有去程
          this.aliveBackBusData = this.getStopsStatus(1, stops, estimatedTimes) ?? []; //沒有返程
        } catch (err) {
          alert(`錯誤: ${err}`)
        }
      },
      // 取得公車到站時間與發車狀態
      getEstimatedTimeData() {
        return new Promise((resolve, reject) => {
          this.axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${this.selectArea}/${this.routeName}?$format=JSON`, {
              headers: this.getAuthorizationHeader()
            }
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
        });
      },
      // 取得各站點
      getStopOfRoute() {
        return new Promise((resolve, reject) => {
          this.axios.get(
            `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${this.selectArea}/${this.routeName}?$format=JSON`, {
              headers: this.getAuthorizationHeader()
            }
          )
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
        })
      },
      // 
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
      }
    },
    mounted() {
      this.getAreaData();
    },
    watch: {
    }
  }
</script>

<style lang="sass" scoped>
  // $primary-colors-Y: #F1A923
  // $primary-colors-R: #D9661F
  // $primary-colors-W: #FCECD0
  // $primary-colors-G: #9FB07A
  // $primary-colors-B: #528370
  // $primary-text: 'Noto Sans TC'
</style>
