<template>
  <div class="">
    <h2 class="ctitle"><b>cube架构</b> <span>用于展示cube体系结构关系</span></h2>
    <div class="chartClass">
      <div id="myChart" :style="{width:'800px',height:'600px'}"></div>
    </div>
  </div>
</template>
<script>

export default {
  name:'charts',
	components: {},
  data () {
    return {
      myChart:''
    }
  },
  mounted(){
     // 基于准备好的dom，初始化echarts实例
    let myChart= this.$echarts.init(document.getElementById('myChart'))
    this.myChart = myChart
    var categories = [];
    for (var i = 0; i < 4; i++) {
        categories[i] = {
            name: '类目' + i
        };
    }
    this.option = {
                title: {
                    text: 'cube',
                    subtext:'关系图'
                },
                tooltip:{},//提示框组件
                legend: [{
                    data: categories.map(function (a) {
                        return a.name;
                    })
                }],
                // animationDurationUpdate: 10,//数据更新动画的时长
                // animationEasingUpdate: 'quinticInOut',//数据更新动画的缓动效果
                animationEasing: 'elasticOut',//初始动画的缓动效果
                animationDelayUpdate: function (idx) {//数据更新动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的更新动画效果
                    return idx * 1;
                },
                // grid: {//直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
                //     y: '0',
                //     y2: '0',
                //     x: '0',
                //     x2: '0'
                // },
                // xAxis: {//直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
                //     type: 'value',//坐标轴类型。value是 数值轴，适用于连续数据。
                //     position: 'top',//x 轴的位置top/bottom
                // },
                // yAxis: {
                //     inverse: true,//是否是反向坐标轴
                //     type: 'value',
                // },
                //silent: true,//图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。这个参数好像应该在series中
                series : [//系列列表。每个系列通过 type 决定自己的图表类型
                    {
                        type: 'graph',//用于展现节点以及节点之间的关系数据
                        layout: 'none',//图的布局。
                        symbolSize: 50,//节点图像尺寸
                        roam: true,//是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                        focusNodeAdjacency:true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。
                        label: {//图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
                            normal: {
                                show: true,
                                position:'top',
                                fontSize:20
                            }
                        },
                        edgeSymbol: ['circle', 'arrow'],//边两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定
                        edgeSymbolSize: [4, 10],//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定
                        edgeLabel: {
                            normal:{
                                show:false
                            },
                            emphasis: {
                                textStyle: {
                                    fontSize: 20
                                }
                            }
                        },
                        // animationDelay: function (idx) {//初始动画的延迟，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更戏剧的初始动画效果
                        //   // 越往后的数据延迟越大
                        //    return idx * 300;
                        // },
                        force: {//力引导布局相关的配置项，力引导布局是模拟弹簧电荷模型在每两个节点之间添加一个斥力，每条边的两个节点之间添加一个引力，每次迭代节点会在各个斥力和引力的作用下移动位置，多次迭代后节点会静止在一个受力平衡的位置，达到整个模型的能量最小化。
                            edgeLength: 5,
                            repulsion: 20,
                            gravity: 0.2
                        },
                        //节点信息
                        data: [
                          {
                              name: '主节点',
                              symbol: 'image://http://oow60tecr.bkt.clouddn.com/firewall.png',
                              symbolSize: [40, 40],
                              x: 600,
                              y: 300
                          }, {
                              name: '节点1',
                              symbol: 'image://http://oow60tecr.bkt.clouddn.com/firewall.png',
                              symbolSize: [40, 40],
                              x: 800,
                              y: 400
                          }, {
                              name: '节点2',
                              symbol: 'image://http://oow60tecr.bkt.clouddn.com/firewall.png',
                              symbolSize: [40, 40],
                              x: 800,
                              y: 200
                          }, {
                              name: '节点3',
                              symbol: 'image://http://oow60tecr.bkt.clouddn.com/firewall.png',
                              symbolSize: [40, 40],
                              x: 400,
                              y: 200
                          }, {
                              name: '节点4',
                              symbol: 'image://http://oow60tecr.bkt.clouddn.com/firewall.png',
                              symbolSize: [40, 40],
                              x: 400,
                              y: 400
                          },{
                            name: '节点1.1',
                            symbol: 'image://http://oow60tecr.bkt.clouddn.com/firewall.png',
                            symbolSize: [20, 20],
                            x: 850,
                            y: 350,
                            label:{
                              normal: {
                                  show: true,
                                  position:'top',
                                  fontSize:10
                              }
                            }
                          },{
                            name: '节点1.2',
                            symbol: 'image://http://oow60tecr.bkt.clouddn.com/firewall.png',
                            symbolSize: [20, 20],
                            x: 850,
                            y: 450,
                            label:{
                              normal: {
                                  show: true,
                                  position:'top',
                                  fontSize:10
                              }
                            }
                          },{
                            name: '节点2.1',
                            symbol: 'image://http://oow60tecr.bkt.clouddn.com/firewall.png',
                            symbolSize: [20, 20],
                            x: 800,
                            y: 150,
                            label:{
                              normal: {
                                  show: true,
                                  position:'top',
                                  fontSize:10
                              }
                            }
                          },{
                            name: '节点2.2',
                            symbol: 'image://http://oow60tecr.bkt.clouddn.com/firewall.png',
                            symbolSize: [20, 20],
                            x: 840,
                            y: 160,
                            label:{
                              normal: {
                                  show: true,
                                  position:'top',
                                  fontSize:10
                              }
                            }
                          },{
                            name: '节点2.3',
                            symbol: 'image://http://oow60tecr.bkt.clouddn.com/firewall.png',
                            symbolSize: [20, 20],
                            x: 870,
                            y: 190,
                            label:{
                              normal: {
                                  show: true,
                                  position:'top',
                                  fontSize:10
                              }
                            }
                          }
                        ],
                        links: [
                          {
                                source: '主节点',//边的源节点名称的字符串，也支持使用数字表示源节点的索引。
                                target: 1,
                                symbolSize: [5, 20],//边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定。
                                label: {
                                    normal: {
                                        show: true//是否显示标签。 好像就是显示从哪到哪
                                    }
                                },
                                lineStyle: {//线的样式
                                    normal: {
                                        width: 5,
                                        curveness: 0.2//边的曲度，支持从 0 到 1 的值，值越大曲度越大。
                                    }
                                }
                            }, {
                                source: '主节点',
                                target: '节点2',
                                label: {
                                    normal: {
                                        show: true
                                    }
                                },
                                lineStyle: {
                                    normal: { curveness: 0.2 }
                                }
                            }, {
                                source: '主节点',
                                target: '节点3'
                            }, {
                                source: '主节点',
                                target: '节点4'
                            }, {
                                source: '节点1',
                                target: '节点1.1'
                            }, {
                                source: '节点1',
                                target: '节点1.2'
                            }, {
                                source: '节点2',
                                target: '节点2.1'
                            }, {
                                source: '节点2',
                                target: '节点2.2'
                            }, {
                                source: '节点2',
                                target: '节点2.3'
                            }
                        ],
                        lineStyle: {//统一边样式
                            normal: {
                                show:true,
                                color: {// 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0, color: 'red'// 0% 处的颜色
                                        }
                                        ,{
                                            offset: 1, color: 'blue' // 100% 处的颜色
                                        }
                                    ],
                                    globalCoord: false
                                },
                            }
                        },
                        categories: categories,//用来在上方显示条目
                        itemStyle: {//图形样式
                            normal: {
                                borderColor: '#fff',//图形的描边颜色
                                borderWidth: 1,
                                shadowBlur: 10,//图形阴影的模糊大小
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        },
                        emphasis: {
                            lineStyle: {
                                width: 10
                            }
                        }
                    }
                ]
            };
        this.myChart.setOption(this.option);

  },
  beforeCreate(){

  },
  methods:{
    resizeEchart(){
      this.myChart.resize();
    }
  }
}
</script>
<style scoped>
.chartClass{
  width:100%;
}
#myChart{
  margin:0 auto;
  border:1px solid #000;
}
</style>
