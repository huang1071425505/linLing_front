<template>
  <div>
    <h2>申报项目统计(按领域)</h2>
  <div :id="'main'+idnum" style="width: 600px;height: 400px;"></div>

  </div>
  <!--为echarts准备一个具备大小的容器dom-->
</template>
<script>
  import fetch from '@/utils/fetch'
  import { Message } from 'element-ui';
  import echarts from 'echarts'
  require("echarts/theme/vintage"); // echarts 主题
    export default {
        name: '',
        data () {
            return {
                idnum:0,
                charts: '',
                opinion:[],
                opinionData:[]
            }
        },
         //调用
        mounted(){
          let num = this.getRandomInt(100000, 999999);
          this.idnum = num;
          this.getFieldClassification();
        },
        methods:{
          getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          },
          getFieldClassification(){
            fetch.get("api/xmProject/fieldClassification").then(res=>{
                if(res.code=="0"){
                  this.opinionData=[];
                  this.opinion=[];
                  for(var index in res.data){
                    this.opinion.push(res.data[index].dic_name)
                    this.opinionData.push({
                      value:res.data[index].num,
                      name:res.data[index].dic_name
                    })
                  }
                  this.drawPie()
                }
            })
          },
          drawPie(){
              this.charts = echarts.init(document.getElementById('main'+this.idnum))
              this.charts.setOption({
                tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                  orient: 'vertical',
                  left: 10,
                  data:this.opinion
                },
                series: [
                  {
                    name:'领域',
                    type:'pie',
                    radius:['50%','70%'],
                    avoidLabelOverlap: false,
                    label: {
                      normal: {
                        show: false,
                        position: 'center'
                      },
                      emphasis: {
                        show: true,
                        textStyle: {
                          fontSize: '30',
                          fontWeight: 'blod'
                        }
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data:this.opinionData
                  }
                ]
              })
          }
        },
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>