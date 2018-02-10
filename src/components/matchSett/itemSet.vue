<template>
  <div class="itemSet">
    <p class="title">核对球员姓名、号码，以确保数据准确性！</p>
    <div class="sexSett">
      <span class="tit">队服颜色</span>
      <div class="sexList">
        <radio :currentIndex ="radio" :itemType="itemType"
          :radioList="radioList" @select="changeRadio"></radio>
      </div>
    </div>
    <ul v-if="Players.length">
      <li class="Player clearfix"
          v-for="(item,index) in Players"
          @click="selectItem(item,index)"
          :key="index">
        <span class="exist floatL" :class="{red: item.exist}"
        @click="changeExit(item)"
        >{{item.exist?'到场':'未到场'}}</span>
        <span class="lineUp floatL"
              @click="changeLineUp(item)"
              :class="{red: item.exist&&item.lineUp}">首发</span>
        <p class="floatL">
          <input type="text floatL" @input="inputChange(item,'name','input_name',index)"
                 ref="input_name" :value="item.name" class="name" :readonly="item.exist?false:true">
          <input type="text floatL" @input="inputChange(item,'num','input_num',index)"
                 ref="input_num" :value="item.num" class="num" :readonly="item.exist?false:true">
        </p>
        <i class="showDel floatR"
          @click="delePlayer(item)"
        >移除</i>
      </li>
    </ul>
    <div class="addPlayer">
      <p @click="addPlayer">+ 添加球员</p>
    </div>
    <div class="waiver">
      <p @click="waiverFn">弃权</p>
    </div>
    <p class="Notes">注：弃权比分默认20：0，弃权积0分</p>
    <el-layer ref="layer" @confirm="configAdd" :text="confirmText" confirmBtnText="确定">
      <p class="layerSlot">
        <input type="text" ref="name" placeholder="名称">
        <input type="number" ref="playerNum" placeholder="球员号码">
      </p>
    </el-layer>
  </div>
</template>

<script>
  import Radio from '../../base/radio/radio.vue'
  import ElLayer from '../../base/elLayer/elLayer.vue'
  import {itemColor} from '../../common/js/config'
  export default{
    data () {
      return {
        radioList:itemColor,
        confirmText:'',
        timer:null
      };
    },
    props: {
      Players:{
        type:Array,
        default:[]
      },
      itemType:{
        type:Number,
        default:1
      },
      radio:{
        type:Number,
        default:0
      }
    },
    methods: {
      addPlayer(){
        this.$refs.layer.show();
      },
      changeRadio(item,index,itemType){
        this.$emit('changeRadio',item,index,itemType)
      },
      inputChange(item,type,el,index){
        var val = this.$refs[el][index].value;
        if (this.timer) {clearTimeout(this.timer)}
        this.timer = setTimeout(() => {
          this.$emit('inputChange',item,type,val,this.itemType)
        }, 300)
      },
      configAdd(){
        var name = this.$refs.name.value;
        var playerNum = this.$refs.playerNum.value+'';
        if(name&&playerNum){
          this.$refs.layer.hide();
          this.$refs.name.value ='';
          this.$refs.playerNum.value = ''
          this.$emit('addPlayer',name,playerNum,this.itemType)
        }
      },
      changeExit(item){
        this.$emit('changeExit',item,this.itemType);
      },
      delePlayer(item){
        this.$emit('delePlayer',item,this.itemType);
      },
      changeLineUp(item){
        this.$emit('changeLineUp',item,this.itemType);
      },
      selectItem(item, index) {
        this.$emit('select', item, index,this.itemType)
      },
      waiverFn(){
        this.$emit('waiverFn',this.itemType)
      }
    },
    components:{
      ElLayer,
      Radio
    }
  }
</script>

<style scoped >
  .layerSlot{
    display: flex;
    text-align: center;
    justify-content:space-between;
    width:100%; margin:0 auto;
  }
  .layerSlot input{
    width: 50%;
    box-sizing: border-box;
    margin:6px 5px;
    padding:0 8px;
    border:1px solid #ccc;
    line-height:29px;
  }
  .addPlayer p{
    width:1.75rem;
    line-height:30px;
    text-align: center;
    background:#ff8201;
    color:#fff;
    margin:5px auto 35px;
    box-sizing: border-box;
  }
  .waiver p{
    width:6.7rem;
    line-height:37px;
    text-align: center;
    color:#fff;
    background:#2764bf;
    margin: auto;
  }
  .Notes{
    width:6.7rem;
    margin:0 auto 18px;
    text-align: left;
    line-height: 32px;
    color:#999;
  }
  .Player{
    text-align: center;
    margin-bottom: 15px;
  }
  .Player span{
    height:32px; width:1rem;
    line-height: 32px; margin-right: 0.2rem;
    background:#cecece; color:#fff;
  }
  .Player .red{
    background:red;
  }
  .Player input{
    border:none;
    width:1.48rem;
    box-sizing: border-box;
    line-height: 30px;
    text-align: center;
  }
  .Player input.num{
    border-left:1px solid #e6e6e6;
  }
  .showDel{
    width:0.7rem;
    line-height: 32px;
    text-align: center;
    color:#ff8001;
  }
  .Player p{
    border:1px solid #e6e6e6;
    margin:0 0 0 0.2rem;
  }
  .itemSet{
    margin:0 15px;
  }
  .itemSet .title {
  text-align: center;
  line-height:53px;
  color:#5d5d5d;
  font-size: 12px;
}
.sexSett{
  display: flex;
  background:#fff8e5;
  border:1px solid #ffb900;
  line-height:46px;
  margin-bottom: 20px;
}
.sexSett  .tit {
  color:#333333;
  margin:0 12px 0 10px;
}
.sexList{
  flex:1
}
</style>
