<template>
  <div class="container">
    <h2 class="ctitle"><b>cube类型选择</b> <span>选择cueb中的类型及其对应子类型</span></h2>
    <div style="margin-left:40px;margin-top:20px;">
      <div>
        <span>
          <input type="text" class="input_text" required="required" placeholder="ip地址" id="addr_id" v-model="netaddr">
        </span>
      </div>
      <div>
        <span>
          <input type="text" class="input_text" required="required" placeholder="端口号" id="port_id" v-model="netport">
        </span>
      </div>
      <button class="button" @click="login()">确定</button>
    </div>

    <button @click="getAllType" class="getType button button-3d button-primary button-rounded">获取类型</button>
    <button @click="addNewType" class="getType button button-3d button-primary button-rounded">新建类型</button>
    <button @click="linkCube" class="getType button button-3d button-primary button-rounded">连接cube</button>

    <div class="typeAll"  v-show="cubeAllType!=''">
      <div class="typediv">
        <p>请选择类型</p><p>{{selectedType}}</p>
        <ul class="typeul">
        <!--    <li v-for="(type,index) in cubeAllType" class="typeli">
              <button :name="type.type" @click="selectType(index,$event)" v-bind:class="{highLightBlue:index==highType}" class="typebutton button button-glow button-rounded button-royal">{{type.type}}</button>
            </li> -->
            <li v-for="(type,index) in typeListFromCube" class="typeli">
              <button :name="type" @click="selectType(index,$event)" v-bind:class="{highLightBlue:index==highType}" class="typebutton button button-glow button-rounded button-royal">{{type}}</button>
            </li>
        </ul>
      </div>
      <div class="typediv" v-show="selectedType!=''">
        <p>请选择子类型</p><p>{{selectedSubType}}</p>
        <ul class="subul">
            <!-- <li v-for="(subtype,index) in currentSubTypeArray" class="typeli">
              <button :name="subtype" @click="selectSubType(index,$event)" v-bind:class="{highLightOrange:index==highSubType}" class="typebutton button button-glow button-rounded button-highlight">{{subtype.name}}</button>
            </li> -->
            <li v-for="(subtype,index) in subTypeListFromCube" class="typeli">
              <button :name="subtype" @click="selectSubType(index,$event)" v-bind:class="{selectHighPink:pinkSubType.indexOf(index)!=-1,highLightOrange:index==highSubType}" class="typebutton button button-glow button-rounded button-highlight">{{subtype}}</button>
            </li>
        </ul>
      </div>
      <div v-show="(selectedType!='')&&(selectedSubType!='')" class="typeresult">
    <!--    <p>类型：{{selectedType}}</p>
        <p>子类型：{{selectedSubType}}</p> -->
        <p> uuid:</p>
        <p>name:</p>
        <!--<p>{{selectedTypeStructs}}</p> -->
        <table>
          <tr>
            <th v-for="item in dataName">{{item}}</th>
          </tr>
          <tr v-for="nowdata in nowDetailsData">
            <td v-for="data in nowdata">
                {{data}}
            </td>
          </tr>
        </table>
        <button v-show="(selectedType!='')&&(selectedSubType!='')" @click="" class="button button-3d button-primary button-rounded">确定</button>
      </div>
    </div>
<!--    <div class="addType">
      <div></div>
      <div><div class="words">类  型：</div><input type="text" name="setType" class=""/></div>
      <div><div class="words">子类型：</div><input type="text" name="setSubType" class=""/></div>
      <div class="">设置属性数据</div>
      <div>
        <div class="words">key：</div><input type="text" name="setSubType" class="wordsInput"/>
        <div class="words">value：</div><input type="text" name="setSubType" class="wordsInput"/>
        <img id="addsmallAtt" src="../../assets/images/jiahao.jpg" style="width:30px;height:30px;cursor:pointer;" @click="addAttribute"/>
      </div>
    </div>-->
  </div>
</template>
<script>
//import cubeData from '@/cubeData.json'
export default {
	components: {},
  data () {
    return {
      netaddr:'192.168.18.130',
      netport:'13888',
      selectedType:"",//被选中的type的编号
      selectedSubType:"",//被选中的subtype的编号
      selectedTypeStructs:"",//没用了
      currentSubTypeArray:[],//没用了
      highType:"-1",//要高亮的type编号
      highSubType:"-1",//要高亮的subtype编号
      pinkSubType:[],//预备要高亮的sub编号
      wsock:'',//连接cube
      detailsData:[
                    // {"name":"uuid","type":"UUID"},
            				// {"name":"org","type":"ESTRING"},
            				// {"name":"user_id","type":"STRING","size":32},
            				// {"name":"user_name","type":"ESTRING"},
            				// {"name":"role","type":"ESTRING"}
                  ],
      dataName:[],//得到detailsData所有不重复Key
      nowDetailsData:[],//将detailsData修改成按key顺序的值
      newType:"",//新建类型子类型时使用
      newSubType:"",
      addAllAttributeData:[],//设置新类型的属性数据
      cubeAllType:[
        {
          "type":"TESI_AIK_STRUCT",
          "subtype":[
            {
              "name":"USER_INFO",
              "struct_desc":{
                 "elem_desc":
              		 [
              				{"name":"uuid","type":"UUID"},
              				{"name":"org","type":"ESTRING"},
              				{"name":"user_id","type":"STRING","size":32},
              				{"name":"user_name","type":"ESTRING"},
              				{"name":"role","type":"ESTRING"}
              		 ]
               }
            },
            {
              "name":"CERT_INFO",
          		"struct_desc":
          		{
          			"elem_desc":
          			[
          				{"name":"machine_uuid","type":"UUID"},
          				{"name":"aik_user_info","type":"SUBSTRUCT","ref_name":"aik_user_info"},
          				{"name":"pubkey_uuid","type":"UUID"}
          			]
          		}
            },
            {
              "name":"CA_CERT",
          		"struct_desc":
          		{
          			"elem_desc":
          			[
          				{"name":"reqinfo","type":"SUBSTRUCT","ref_name":"aik_cert_info"},
          				{"name":"AIPubKey_uuid","type":"UUID"}
          			]
          		}

            },
            {
              "name":"AIK_INFO",
          		"struct_desc":
          		{
          			"elem_desc":
          			[
          				{"name":"machine_uuid","type":"UUID"},
          				{"name":"user_name","type":"ESTRING","size":32},
          				{"name":"aik_pub_uuid","type":"UUID"},
          				{"name":"aik_pri_uuid","type":"UUID"},
          				{"name":"aik_cert_uuid","type":"UUID"},
          			]
          		}
            }
          ]
        },
        {
          "type":"FILE_TRANS",
          "subtype":[
            {
              "name":"FILE_INFO",
          		"struct_desc":
          		{
          			"elem_desc":
          			[
          				{"name":"uuid","type":"UUID"},
          				{"name":"type","type":"TYPE"},
          				{"name":"subtype","type":"SUBTYPE","def":"type"},
          				{"name":"creater","type":"ESTRING","size":64},
          				{"name":"creater_uuid","type":"UUID"},
          				{"name":"file_path","type":"ESTRING","size":128},
          				{"name":"file_uuid","type":"UUID"},
          				{"name":"file_describe","type":"ESTRING","size":512}
          			]
          		}
            },
            {
              "name":"FILE_DATA",
          		"struct_desc":
          		{
          			"elem_desc":
          			[
          				{"name":"uuid","type":"UUID"},
          				{"name":"filename","type":"ESTRING"},
          				{"name":"total_size","type":"INT"},
          				{"name":"record_no","type":"INT"},
          				{"name":"offset","type":"INT"},
          				{"name":"data_size","type":"INT"},
          				{"name":"policy_data","type":"DEFINE","def":"data_size"}
          			]
          		}

            },
            {
              "name":"FILE_STORE",
          		"struct_desc":
          		{
          			"elem_desc":
          			[
          				{"name":"uuid","type":"UUID"},
          				{"name":"filename","type":"ESTRING"},
          				{"name":"file_size","type":"INT"},
          				{"name":"block_size","type":"INT"},
          				{"name":"block_num","type":"INT"},
          				{"name":"mark_len","type":"INT"},
          				{"name":"marks","type":"DEFINE","def":"mark_len"}
          			]
          		}
            },
            {
              "name":"REQUEST",
          		"struct_desc":
          		{
          			"elem_desc":
          			[
          				{"name":"uuid","type":"UUID"},
          				{"name":"filename","type":"ESTRING"},
          				{"name":"requestor","type":"ESTRING"}
          			]
          		}
            },
            {
              "name":"NOTICE",
          		"struct_desc":
          		{
          			"elem_desc":
          			[
          				{"name":"uuid","type":"UUID"},
          				{"name":"filename","type":"ESTRING"},
          				{"name":"result","type":"INT"}
          			]
          		}
            }
          ]
        }
      ],
      typeListFromCube:[],
      subTypeListFromCube:[]
     }
  },
  mounted(){
    var reg = new RegExp('"',"g");
    if(localStorage.getItem('netaddr')!=''&&localStorage.getItem('netaddr')!=null){
      this.netaddr = localStorage.getItem('netaddr').replace(reg, "");
    }
    if((localStorage.getItem('netport')!="")&&(localStorage.getItem('netport'))!=null){
      this.netport = localStorage.getItem('netport').replace(reg, "");
    }
  },
  beforeCreate(){
    console.log(this.cubeAllType);
  },
  methods:{
    login(){
      let netaddr = document.getElementById("addr_id");
      let netport = document.getElementById("port_id");
      this.netaddr = netaddr.value;
      this.netport = netport.value;
      localStorage.setItem('netaddr', netaddr.value);
      localStorage.setItem('netport', netport.value);
    },
    selectType(index,event){
      this.highType = index;
      this.selectedType = event.target.name;
      this.selectedSubType="";
      this.highSubType="-1";
      this.pinkSubType=[];
      // for(var i in this.cubeAllType){
      //   if(this.cubeAllType[i].type == this.selectedType){
      //     this.currentSubTypeArray = this.cubeAllType[i].subtype
      //   }
      // }
      this.subTypeListFromCube= [];
      this.detailsData = [];
      this.setGetSubType(this.selectedType);
      this.CubeReturn();
    },
    selectSubType(index,$event){
      //this.highSubType = index  //本身是直接修改颜色，现在变成先改成一个色，如果有websocket有回复，则变成另一个色
      //this.pinkSubType = index
      this.pinkSubType.push(index)
      this.selectedSubType = $event.target.name
      // this.getStructs();
      this.detailsData = [];
      this.setGetEle(this.selectedType,this.selectedSubType);
      this.CubeReturn();
      this.afreshSetStructs();
    },
    getAllType(){
      const self = this
      self.$axiosApi.get('/cubeAllType',null,null,r=>{
        console.log(JSON.stringify(r))
        self.cubeAllType = r.cubeAllType
      })
    },
    getStructs(){//用来根据类型，子类型获取该子类型的数据，目前没用了
      for(var subtyI in this.currentSubTypeArray){
        if(this.selectedSubType == this.currentSubTypeArray[subtyI].name){
          this.selectedTypeStructs =JSON.stringify(this.currentSubTypeArray[subtyI].struct_desc)
        }
      }
    },
    afreshSetStructs(){//修正数据，方便显示
      this.dataName = [];
      this.nowDetailsData = [];
      for(var details in this.detailsData){
        for(var allData in this.detailsData[details]){
          if(this.dataName.indexOf(allData) == -1){//表示this.dataName没有allData这个名
            this.dataName.push(allData);
          }
        }
      }
      for(var details in this.detailsData){
        var nowde = [];
        for(var dataName in this.dataName){
          if(this.detailsData[details][this.dataName[dataName]]!=null){
            nowde.push(this.detailsData[details][this.dataName[dataName]]);
          }else{
            nowde.push(" ");//没有数据的时候
          }
        }
        this.nowDetailsData.push(nowde);
      }
      //alert(this.selectedTypeStructs["elem_desc"]);
    },
    addNewType(){

    },
    addAttribute(){
      var newhtml = '<div class="words"  style="width:60px;display:inline-block;">key：</div><input type="text" name="setSubType" class="wordsInput" style="width:100px;"/><div class="words" style="width:60px;display:inline-block;">value：</div><input type="text" name="setSubType" class="wordsInput" style="width:100px;"/>'
      $('#addsmallAtt').before(newhtml);
    },
















////////以下是连接cube的内容
    linkCube(){
      //let message = {"name":"vtcm_view","function":"main"};
      this.setGetType();
      this.CubeReturn();
    },
    CubeReturn(){
      let self=this;
      console.log(JSON.stringify(self.netaddr)+':'+JSON.stringify(self.netport));
      console.log("要传给cube的数据=="+self.cube_msg_output());
      if(self.wsock==""){
				self.wsock = new WebSocket('ws://'+self.netaddr+':'+self.netport, 'cube-wsport');
        //this.wsock = new WebSocket('ws://192.168.18.130:13888', 'cube-wsport');
			}else{
				// self.cube_msg("MESSAGE","BASE_MSG");
				// self.cube_msg_addrecord(meg);
				self.wsock.send(self.cube_msg_output());
			}
      self.wsock.onopen = function (e) {
        console.log("开着呢");
        // self.cube_msg("MESSAGE","BASE_MSG");
        // self.cube_msg_addrecord(meg);
        self.wsock.send(self.cube_msg_output());
      };
      self.wsock.onclose = function(e) {
        console.log("他关了");
      };
      self.wsock.onerror = function(e) {
        console.log("连接出错");
      };
      self.wsock.onmessage = function(e) {
        let msg = JSON.parse(e.data);
        console.log("cube传来的数据=="+JSON.stringify(msg));
        self.analysisTypeList(e.data);
        self.analysisSubTypeList(e.data);
        self.analysisSubTypeEle(e.data);
      }
    },
    cube_msg(type, subtype) {
			this.data={HEAD:{tag:"MESG",version:65537,record_type:type,record_subtype:subtype, flow:0,record_num:0,expand_num:0,nonce:''},RECORD:[],EXPAND:[]};
		},
		cube_msg_addrecord(x) {
			this.data.RECORD[this.data.HEAD.record_num]=x;
			this.data.HEAD.record_num++;
			return this.data.HEAD.record_num;
		},
    cube_msg_addexpand(x) {
			this.data.EXPAND[this.data.HEAD.expand_num]=x;
			this.data.HEAD.expand_num++;
			return this.data.HEAD.expand_num;
		},
		cube_msg_output() {
			return JSON.stringify(this.data);
		},
    setGetType(){
      let message = {"name":"vtcm_view","function":"main"};
      this.cube_msg("MESSAGE","BASE_MSG");
      this.cube_msg_addrecord(message);
    },
    setGetSubType(type){
      this.cube_msg("MESSAGE","TYPES");
      this.cube_msg_addrecord({"type":"SUBTYPELIST","subtype":"NULL"});
      this.cube_msg_addexpand({"type":"MESSAGE","subtype":"TYPES","expand":{"type":type,"subtype":"NULL"}});//这个第一部分应该写固定值么？{"type":"MESSAGE","subtype":"TYPES"

    },
    setGetEle(type,subty){
      //this.cube_msg(type,subty);
      this.cube_msg("MESSAGE","TYPES");
      this.cube_msg_addrecord({"type":"RECORDTYPE","subtype":"NULL"});
      this.cube_msg_addexpand({"type":"MESSAGE","subtype":"TYPES","expand":{"type":type,"subtype":subty}});
    },
    analysisTypeList(data){//获取type，根据HEAD.record_type == "TYPELIST"，则EXPAND的expand的elemlist是type列表
      let self=this;

      //console.log(JSON.stringify(data));
      let msg = JSON.parse(data);
      if(msg.HEAD.record_type == "TYPELIST"){
        let expand = msg.EXPAND;
        console.log("获取type返回的expand==" + JSON.stringify(expand));
        if(expand!=""){
          for(var ii in expand){
            if(expand[ii].expand.elemlist!=null){
              for(var listID in expand[ii].expand.elemlist){
                var jiequ = expand[ii].expand.elemlist[listID].indexOf("=");
                if(jiequ!=-1){
                  self.typeListFromCube.push(expand[ii].expand.elemlist[listID].slice(0,jiequ));
                }else{
                  self.typeListFromCube.push(expand[ii].expand.elemlist[listID]);
                }
              }
            }
          }
        }
      }
    },
    analysisSubTypeList(data){//根据type获取subtype,依靠HEAD.record_type == "SUBTYPELIST"，则EXPAND的expand的elemlist是type列表
      let self=this;
      let msg = JSON.parse(data);
      if(msg.HEAD.record_type == "SUBTYPELIST"){

        let expand = msg.EXPAND;
        console.log("获取subtype返回的expand==" + JSON.stringify(expand));
        if(expand!=""){
          for(var ii in expand){
            if(expand[ii].expand.elemlist!=null){
              for(var listID in expand[ii].expand.elemlist){
                var jiequ = expand[ii].expand.elemlist[listID].indexOf("=");
                if(jiequ!=-1){
                  self.subTypeListFromCube.push(expand[ii].expand.elemlist[listID].slice(0,jiequ));
                }else{
                  self.subTypeListFromCube.push(expand[ii].expand.elemlist[listID]);
                }
              }
            }
          }
        }
      }
    },
    analysisSubTypeEle(data){//获取该类型具体数据，依靠HEAD的"record_type":"RECORDTYPE",则expand中的expand里elem_desc数组对应所有元素
      let self=this;

      let msg = JSON.parse(data);
      if(msg.HEAD.record_type == "RECORDTYPE"){
        //self.highSubType = self.pinkSubType;
        //self.pinkSubType = "-1";
        self.highSubType = self.pinkSubType.pop()
        let expand = msg.EXPAND;
        console.log("获取属性返回的expand==" + JSON.stringify(expand));
        if(expand!=""){
          for(var ii in expand){
            if(expand[ii].expand.elem_desc!=null){
              for(var descID in expand[ii].expand.elem_desc){
                self.detailsData.push(expand[ii].expand.elem_desc[descID]);
              }

            }
          }
        }
        console.log("detailsData =="+self.detailsData);
        self.afreshSetStructs();
      }
    }
  }
}
</script>
<style scoped>
button.highLightBlue{
  background:#2b1bf5;
}
button.highLightOrange{
  background:#f5a106;
}
button.selectHighPink{
  background:#ec2a84;
}
.getType{
  margin-left:30px;
  margin-top:40px;
}
.typeAll{
  margin-top:20px;
  width:90%;
  border:1px solid #c1adad;
  overflow:hidden;
}
.typediv{
  float:left;
}
.typediv p{
  padding-top: 4px;
  text-align: center;
}
.typebutton{
  width:160px;
  padding:0px;
  height:20px;
  font-size: 10px;
  line-height: 10px;
}
ul.typeul{
  margin-left:-10px;
}
.typeli{
  margin-bottom: 6px;
}
ul.subul{
  float:left;
  margin-left: 20px;
}
.typeresult{
  float:left;
  margin-left:50px;
  margin-top:20px;
  margin-bottom: 20px;
  font-size: 14px;
  width:300px;
}
.typeresult table,.typeresult table tr th,.typeresult table tr td { border:1px solid #0094ff; }
.typeresult table{
  text-align: center;
  border-collapse :collapse ;
}
.addType{

}
.words{
  width:60px;
  display:inline-block;
  margin-left:10px;
}
.wordsInput{
  width:100px;
}
</style>
