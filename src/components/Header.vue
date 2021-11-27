<template>
  <div class="mt-3 header">
    <div class="buttonArea__sty">
      <button :class="{active__sty: show.searchBus}" @click="toRoad">找路線</button>
      <button :class="{active__sty: show.searchStop}" @click="toStops">找站牌</button>
      <button :class="{active__sty: show.searchAddress}" @click="toPosition">附近車站</button>
      <button @click="toHome">回首頁</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',

    data: () => ({
      show: {
        searchBus: false,
        searchStop: false,
        searchAddress: false
      },
    }),
    computed: {
    },
    methods: {
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
      },
      toRoad() {
        this.$router.push('/road');
      },
      toStops() {
        this.$router.push('/stops');
      },
      toPosition() {
        this.$router.push('/position');
      },
      toHome() {
        this.$router.push('/');
      }
    },
    mounted() {
      this.init();
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
  .buttonArea__sty
    justify-content: space-between
    display: flex
  button
    font-family: $unnamed-font-family-zen-maru-gothic
    font-style: $unnamed-font-style-normal
    font-weight: $unnamed-font-weight-medium
    font-size: $unnamed-font-size-24
    line-height: $unnamed-line-spacing-40
    letter-spacing: $unnamed-character-spacing-3-84
    color: $unnamed-color-3e6e41
    background: $unnamed-color-d6e4d7
    border-radius: 5px 5px 0 0
    padding: 5px 45px
  .active__sty
    background: $unnamed-color-d0e6a5
  @media screen and (max-width: 600px)
    button
      font-size: 16px
      letter-spacing: 0px
      padding: 5px 10px
</style>
