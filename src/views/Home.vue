<template>
  <v-container fill-height grid-list-md text-xs-center class="home">
    <v-layout row wrap align-center>
      <v-flex class="mobileArea__sty">
        <div class="logoArea__sty">
          <div>
            <h1 class="title__sty">蛙蛙搭車Go</h1>
            <h2 class="subTitle__sty">Where can I take the bus?</h2>
          </div>
          <div class="logoImgArea__sty">
            <img class="logoImg__sty" src="../assets/Logo/logo.svg" alt="logo" />
          </div>
        </div>
        <button class="outerBtn__sty" @click="toRoad">
          <div class="innerBtn__sty"><span>找路線</span></div>
        </button>
        <button class="outerBtn__sty" @click="toStops">
          <div class="innerBtn__sty"><span>找站牌</span></div>
        </button>
        <button class="outerBtn__sty" @click="toPosition">
          <div class="innerBtn__sty"><span>附近車站</span></div>
        </button>
        <button class="outerBtn__sty mobile__sty"></button>
        <!-- <p class="mb-0 text-right footer__sty">Ⓒ By Yu Tsai-Heng ◆ Line id : world_is_chess</p> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: 'Home',

    components: {
    },
    methods: {
      toRoad() {
        this.$router.push('/road');
      },
      toStops() {
        this.$router.push('/stops');
      },
      toPosition() {
        this.$router.push('/position');
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
  .home
    color: $unnamed-color-1b3f25
  .title__sty
    font-family: $unnamed-font-family-zen-maru-gothic
    font-style: $unnamed-font-style-normal
    font-weight: $unnamed-font-weight-medium
    font-size: $unnamed-font-size-26
    line-height: $unnamed-line-spacing-40
    letter-spacing: $unnamed-character-spacing-3-9
    color: $unnamed-color-94c85c
  .subTitle__sty
    font-family: $unnamed-font-family-zen-maru-gothic
    font-style: $unnamed-font-style-normal
    font-weight: $unnamed-font-weight-medium
    font-size: $unnamed-font-size-13
    line-height: $unnamed-line-spacing-20
    letter-spacing: $unnamed-character-spacing-0-26
    color: $unnamed-color-77b441
  .innerBtn__sty
    font-family: $unnamed-font-family-zen-maru-gothic
    font-style: $unnamed-font-style-normal
    font-weight: $unnamed-font-weight-normal
    font-size: $unnamed-font-size-24
    line-height: $unnamed-line-spacing-35
    letter-spacing: $unnamed-character-spacing-0
    color: $unnamed-color-3e6e41
    width: 144px
    height: 144px
    background: $unnamed-color-d0e6a5 0% 0% no-repeat padding-box
    border-radius: 80px
    opacity: 1
    margin-left: auto
    margin-right: auto
  .innerBtn__sty span
    display: inline-block
    margin: 50% 0
    transform: translateY(-50%)
  .outerBtn__sty
    width: 170px
    height: 170px
    border: 6px solid $unnamed-color-d0e6a5
    border-radius: 50%
    opacity: 1
    margin-right: 5%
  .logoImg__sty
    width: 125px
    height: 198px
  .logoArea__sty
    display: flex
    align-items: center
  .logoImgArea__sty
    display: inline-flex
    align-items: center
    justify-content: center
  .footer__sty
    margin-top: 13vh
    color: $unnamed-color-94c85c
    font-family: $unnamed-font-family-zen-maru-gothic
    font-style: $unnamed-font-style-normal
    font-weight: $unnamed-font-weight-normal
    font-size: $unnamed-font-size-13
    line-height: 19px
    letter-spacing: 0.65px
    color: $unnamed-color-94c85c
    opacity: 1
  .mobile__sty
    display: none
  @media screen and (max-width: 600px)
    .outerBtn__sty
      margin-right: 0
    .mobile__sty
      display: inline
      visibility: hidden
      height: unset
  @media screen and (max-width: 600px)
    .mobileArea__sty
      text-align: center
</style>
