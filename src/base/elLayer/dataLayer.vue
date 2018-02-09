<template>
  <div class="playDataDet selectItem" v-if="selectItem"
       :style="{top:`${selectTop}px`,left:`${selectLeft}px`}">
    <b class="b1">{{selectItem.name}}:</b>
    <b class="b"><i>{{initPlayData(player_data[selectItem.id],'score')}}</i>分</b>
    <b class="b"><i>{{initPlayData(player_data[selectItem.id],'offensive_rebounds')+initPlayData(player_data[selectItem.id],'defensive_rebounds')}}</i>板</b>
    <b class="b"><i>{{initPlayData(player_data[selectItem.id],'assists')}}</i>助</b>
    <b class="b"><i>{{initPlayData(player_data[selectItem.id],'steals')}}</i>断</b>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
    data() {
      return {
        selectItem:null,
        selectTop:0,
        selectLeft:0,
        timer:null
      }
    },
    computed:{
      ...mapGetters([
        'player_data',
      ])
    },
    methods: {
      initPlayData(playerData,key){
        return (playerData&&playerData[key])?playerData[key]:0;
      },
      show(s,ev) {
        this.selectItem=s.it;
        var type=s.index.split('-')[0]
        var htmlWidth = document.body.offsetWidth;
        this.selectTop=ev.changedTouches[0].pageY+10;
        this.selectLeft=type==1?100:htmlWidth-350;
        clearTimeout(this.timer);
        this.timer=setTimeout(()=>{
         this.hide();
        },2000)
      },
      hide(){
        this.selectItem = null ;
        clearTimeout(this.timer);
      }
    }
  }
</script>

<style scoped>
  .playDataDet {
    position: absolute;
    width:200px;
    bottom:-10px; left: 100px;
    border-radius: 3px;
    background: #e7e7e7;
    display: none;
    line-height: 30px;
    height:30px;
    padding:0 20px;
    color:#666;
  }
  /*.playDataDet.playDataDet_left{
    left:-200px;
  }*/
  .selectItem{
    display: flex;
    z-index: 200;
  }
  .changeScr .selectItem{
    top: 50%!important;left:50%!important;
    margin-left:-100px;
    margin-top:-15px;
  }
  .playDataDet.show{
    display: flex;
    z-index: 200;
  }
  .playDataDet b{
    font-weight: 400;
  }
  .playDataDet .b1{
    width:50px;
  }
  .playDataDet .b{
    flex: 1;
  }
  .playDataDet .b i{
    color:red; padding:0 3px;
  }

</style>
