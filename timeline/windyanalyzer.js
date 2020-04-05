// windyanalyzer.js
// code for analyzing COVID19 cases to understand some reasons
// developer: @windygallery
// date 1 April 2020 00:39AM
// version 1.1.0

// grouping
let groupNames = ['รอการตรวจสอบ', //0
'เดินทางไปต่างประเทศ',  //1
'สัมผัสกับชาวต่างชาติ',   //2
'หมอและพยาบาล',   //3
'ติดภายในประเทศ',   //4
'สนามมวย',    //5
'สถานบันเทิง',  //6
'คนดัง/แบรนด์'  //7
];

//Keyword mapping
var unknown  = []; // 0
var move     = ['จากต่างประเทศ','เดินทางมาจาก','เดินทางกลับจาก','เดินทาง','นักท่องเที่ยว',
  'ดูงานที่ประเทศ','อู่ฮั่น','คัดกรองจากสนามบิน','คนไทยกลับบ้าน','สนามบินสุวรรณภูมิผ่านด่านคัดกรอง',
  'อิตาลี','ญี่ปุ่น','สเปน','มาเลเซีย','มาเลเชีย','อินโดนีเซีย','ฝรั่งเศส','เดนมาร์ก','กัมพูชา',
  'สวิตเซอร์แลนด์','เบลเยี่ยม','สหรัฐอเมริกา','ฝรั่งเศส','จากพื้นที่ระบาด','เข้าประเทศ',
  'ติดจากต่างประเทศ']; //1
var bridge   = ['ใกล้ชิดกับนักท่องเที่ยวต่างชาติ','ติดจากนักท่องเที่ยว','รับนักท่องเที่ยว','ขับรถ',
  'ให้บริการชาวต่างชาติ','ให้บริการนักท่องเที่ยว','ใกล้ชิดชาวต่างชาติ','รับผู้โดยสารต่างชาติ','เพื่อนต่างชาติ',
  'ทำงานกับต่างชาติ','พนักงานต้อนรับบนเครื่องบิน','อาชีพเสี่ยงต่อการติดเชื้อ','เกี่ยวกับต่างชาติ','ตำรวจตรวจคนเข้าเมือง',
  'ใกล้ชิดต่างชาติ','คนขับTaxi','เกี่ยวกับชาวต่างชาติ','มีนักท่องเที่ยวต่างชาติ','เจ้าหน้าที่สนามบิน','สัมผัสผู้เดินทางจากต่างประเทศ']; //2
var boxing    = ['สนามมวย','นักมวย']; //5
var entertain = ['ทองหล่อ','สถานบันเทิง','ทองหล่อ']; //5
var wellknown = ['นักแสดง','คิงเพาเวอร์',"คิงส์พาวเวอร์"]; //5
var doctor   = ['บุคลากรทางการแพทย์','บุคลากรการแพทย์']; //3
var intenal  = ['รับเชื้อจากผู้ป่วย','ลูกสาวของ','สามีของ','หลานของ','น้องชายของ','สัมผัสใกล้ชิดกับผู้ป่วย',
  'เพื่อนของผู้ป่วย','มารดาของผู้ป่วย','ลูกจ้างของผู้ป่วย','ใกล้ชิดผู้ป่วย','ติดเชื้อต่อเนื่อง','สัมผัสผู้ป่วย',
  'ผู้สัมผัสของผู้ป่วย','ติดจากการสัมผัส','สัมผัสกับผู้ป่วย','สถานที่แออัด','ในครอบครัว',
  'ขนส่งสาธารณะ','ชุมนุมชน','สาเหตุอื่น'] //4

var cMove  = new RegExp(move.join("|"));
var cBrid  = new RegExp(bridge.join("|"));
var cBoxi  = new RegExp(boxing.join("|"));
var cEnte  = new RegExp(entertain.join("|"));
var cWell  = new RegExp(wellknown.join("|"));
var cDoct  = new RegExp(doctor.join("|"));
var cInte  = new RegExp(intenal.join("|"));

function testGroup(str) {
  str = str.replace(/\s/g, '');
  let group = 0;
  if (cDoct.test(str)) {        group = 3;  } // เจอหมอ ชัดเจน
  else if (cBoxi.test(str)) {   group = 5;  } // เจอคำเฉพาะ ชัดเจน
  else if (cEnte.test(str)) {   group = 6;  } // เจอคำเฉพาะ ชัดเจน
  else if (cWell.test(str)) {   group = 7;  } // เจอคำเฉพาะ ชัดเจน
  else if (cBrid.test(str)) {   group = 2;  }
  else if (cInte.test(str)) {   group = 4;  }
  else if (cMove.test(str)) {   group = 1;  }
  // document.write(group+":"+unescape(str))
  return group
}

function countCase(str) {
  total = 1;
  let found = str.indexOf("-");
  if (found > -1) {
    var res = str.split("-");
    if (res.length == 2) {
      total = parseInt(res[1]) - parseInt(res[0]) + 1;
    }
  }
  return total;
}

let grouping = [];
let unittest = {
  "1":1,"2":1,"3":1,"4":1,"5":1,"6":1, "7":1, "8":1, "9 - 14":1,"15":1,"16":2,"17":1,
  "18 - 19":1,"20 - 21":1,"22":0,"23":2,"24":0,"25":2,"26":0,"27":7,"28":0,"29":0,
  "30":0,"31":7,"32":1,"34":3, "35":4,"37":2,"38 - 39":1,"41":1, "42":2, "43":2,
  "44":1,"45":1,"46":1,"47":1,"49":1,"50":1,"51":4,"52":1,"53":4,"57":1,"58":1,
  "59":2,"73":4,"74 - 75":4,"76":4,"77":1,"78":4,"79":4,"80":4,"81":1,"82":7,
  "83 - 91":5,"48":1,"56":1,"60 - 72":2,"93 - 94":6,"95 - 99":6,"100 - 102":2,
  "110 - 111":4,"112":1,"113 - 114":0,"115 - 121":5,"122 - 124":6,"125 - 130":4,
  "134 - 136":1,"137 - 142":2,"143 - 145":1,"146 - 147":1,"148 - 158":5,"159":6,
  "160 - 161":4,"171":2,"172 - 177":0,"178-190":5,"191-194":6,"195-206":4,
  "207":1,"208-211":2,"212":0,"213-224":5,"225-238":6,"239-250":4,"251-255":1,
  "256-264":1,"265":2,"266":2,"267":2,"268":4,"269-272":0,"273-290":5,
  "291-295":6,"296-307":4,"308-313":1,"314":1,"315":1,"318-319":2,"320-322":0,
  "323-354":5,"355-356":6,"357-362":1,"363-373":4,"392-411":0,"412-432":5,
  "433-437":6,"438-439":1,"440-476":4,"477-481":1,"482":1,"483-484":1,
  "485-491":5,"492-599":0,"600-603":5,"604-619":4,"620-621":1,"622":1,"623":1,
  "624":1,"632-721":0,"722-726":5,"727-732":6,"733-744":4,"745-746":1,
  "755-764":2,"765-768":3,"769-780":1,"781-827":0,"832-836":6,"837-850":4,
  "851-854":1,"855-856":1,"857":1,"858":1,"859":1,"860":1,"861-865":2,
  "866-867":3,"868-934":0,"935-940":5,"941-943":6,"944-962":4,"963":1,
  "964":1,"965":1,"966-967":1,"968":2,"969":1,"970-978":2,"979-981":3,
  "982":0,"983-1023":0,"1024":1,"1025-1028":0,"1029":4,"1030":0,"1031":4,
  "1032":0,"1033-1037":4,"1038-1040":0,"1041-1044":4,"1045":0,"1046-1050":5,
  "1051-1057":6,"1058-1075":4,"1095-1136":0,"92":6,"828-831":5,"316-317":1,
  "374-385":1,"386-391":6,"40":4,"625-631":2,"103 - 109":1,"131 - 133":1,
  "162 - 167":1,"168 - 170":1,"747-754":1,"1076-1085":1,
  "1086-1094":2,"36":4,"54":2,"55":2,"33":4,
};

// 0=true, 1=false, 2=new (no unit test yet)
function validateunittest(key, expectedgroup) {
  result = 2;
  if (unittest[key] != undefined) {
    if (unittest[key] == expectedgroup) { result = 0; }
    else {  result = 1; }
  }
  if (result == 2) { // new case
    // console.log(key+" : "+unittest[key]+" vs. "+expectedgroup+" = "+result+" !!");
  }
  return result;
}

let groupicons = {0:"./images/hourglass.png", 1:"./images/airflight.png", 2:"./images/waiter.png",
3:"./images/doctor.png", 4:"./images/cough.png", 5:"./images/boxing.png",
6:"./images/beer.png", 7:"./images/superstar.png" };

function printCase(element) {
  let detailTh = unescape(element.detail_th);
  let group    = testGroup(detailTh);
  let count    = countCase(element.rid);
  // let text     = element.confirm_at+" [<b>"+group+"</b>] "+element.rid+"("+count+") : "+detailTh+"<br>\n";
  // let text     = element.confirm_at+" \""+element.rid+"\":<b>"+group+"</b> ("+count+") : "+detailTh+"<br>\n";
  let highlight  = " class='unknown' ";
  let unittest   = validateunittest(element.rid, group)
  if (unittest == 1){
    highlight = " class='error' ";
  }
  else if (unittest == 0){
    highlight = " class='pass' ";
  }
  else if (unittest == 2){
    highlight = " class='new' ";
  }
  let text = "<div "+highlight+">"+element.confirm_at+" <img src='"+groupicons[group]+"'> <b>x"+count+"</b> ";
  text += "case: "+element.rid+": "+detailTh+"</div>\n";
  // console.log(text);
  let keyGroup = ""+group
  if (grouping.hasOwnProperty(keyGroup)) {
    grouping[keyGroup] += "<div "+highlight+"> - "+detailTh+"</div>\n";
  }
  else {
    grouping[keyGroup] = "<div "+highlight+">- "+detailTh+"</div>\n";
  }
  // console.log(text);
  return text;
}

function printLink(e) {
  let text = e.report_id+":"+e.from_refid+" ("+e.to_name+")<br>\n";
  return text;
}

function printWhere(e) {
  let text = e.created_at+" : "+e.id+":"+e.from_name+" ("+e.location_from_id+" -> "+e.location_to_id+")<br>\n";
  return text;
}

function extractCase(element) {
  let detailTh = unescape(element.detail_th);
  let group    = testGroup(detailTh);
  let count    = countCase(element.rid);
  let unittest = validateunittest(element.rid, group);
  // element.confirm_at: "2020-03-27";
  let dateArr  = element.confirm_at.split("-");
  let timing   = Date.UTC(dateArr[0], dateArr[1]-1, dateArr[2]);
  // console.log(element.rid+" : "+dateArr[0]+"-"+(dateArr[1]-1)+"-"+dateArr[2]+" = "+timing+" -> "+(new Date(timing)).toString());
  let item = {id: element.id, group: group,
    content: "case:"+element.rid+":"+detailTh+" (+"+count+")", start: timing, type: 'box'};
  // console.log(item);
  return item;
}

function scanAllCases(flag) {
  let allcases = "";
  data_case.reverse().forEach(
      (element, index) =>
      allcases += printCase(element)
  )
  // console.log(allcases);
  if (flag == true) {
    document.write(allcases);
  }
  return allcases;
}

function optimize(list) {
  let hash = {};
  let j   = 1;
  for (var i = 0; i < list.length; i++) {
    groupandtime = list[i].group+" "+list[i].start;
    var r = /\(\+(\d+)\)/;
    let o = list[i].content.match(r);
    if (o.length > 1) {
      let valueadd = parseInt(o[1]);
      // console.log(list[i].content.match(r)[1]);
      if (hash.hasOwnProperty(groupandtime)) {
        // console.log(hash[groupandtime]);
        hash[groupandtime].value = hash[groupandtime].value + valueadd;
      }
      else {
        hash[groupandtime] = {id: j, value: valueadd, group: list[i].group, start: list[i].start, type: 'box'};
        j = j + 1;
      }
    }
  }
  // console.log(hash);
  let arr = [];
  for (var k in hash) {
      if (hash.hasOwnProperty(k)) {
         let value = hash[k];
         value["content"] = "+"+value.value;
         delete value['value'];
         let item = value;
         arr.push(item);
      }
  }
  return arr;
}

function extractAllCases() {
  let allcases = [];
  data_case.reverse().forEach(
      (element, index) =>
      allcases.push(extractCase(element))
  )
  // console.log("Total "+allcases.length+" cases.");
  let result = optimize(allcases);
  // console.log(result);
  return result;
}

function getGroupNames() {
  return groupNames;
}
// allcases = "";
// data_case.reverse().forEach(
//     (element, index) =>
//     allcases += printCase(element)
// )
// console.log(allcases);
// $("#cases").html(allcases);

// var unknown  = []; // 0
// var move     = ['เดินทาง','นักท่องเที่ยว','เข้าประเทศ','ดูงานที่ประเทศ','อู่ฮั่น','คัดกรองจากสนามบิน','คนไทยกลับบ้าน','สนามบินสุวรรณภูมิผ่านด่านคัดกรอง','กลับจากญี่ปุ่น','สเปน','มาเลเซีย','มาเลเชีย','อินโดนีเซีย','ฝรั่งเศส','เดนมาร์ก','กัมพูชา','สวิตเซอร์แลนด์']; //1
// var bridge   = ['ใกล้ชิดกับนักท่องเที่ยวต่างชาติ','ติดจากนักท่องเที่ยว','รับนักท่องเที่ยว','ขับรถ','ให้บริการชาวต่างชาติ','ให้บริการนักท่องเที่ยว','ใกล้ชิดชาวต่างชาติ','รับผู้โดยสารต่างชาติ','เพื่อนต่างชาติ','ทำงานกับต่างชาติ','จากต่างประเทศ','พนักงานต้อนรับบนเครื่องบิน','อาชีพเสี่ยงต่อการติดเชื้อ','ทำงานใกล้ชิดต่างชาติ']; //2
// var doctor   = ['บุคลากรทางการแพทย์']; //3
// var intenal  = ['รับเชื้อจากผู้ป่วย','ลูกสาวของ','สามีของลูกสาว','หลานของผู้ป่วย','น้องชายของผู้ป่วย','เพื่อนของผู้ป่วย','มารดาของผู้ป่วย','ลูกจ้างของผู้ป่วย','ใกล้ชิดผู้ป่วย','ติดเชื้อต่อเนื่อง','สัมผัสผู้ป่วย','ผู้สัมผัสของผู้ป่วย','ติดจากการสัมผัส','สัมผัสกับผู้ป่วย','สถานบันเทิง','สถานที่แออัด'] //4
// var focus    = ['นักแสดง','สนามมวย','คิงเพาเวอร์','ทองหล่อ','นักมวย']; //5

function printAllcases() {
  scanAllCases(true);
  // let groupName = {"1":"กลุ่มเดินทางไปต่างประเทศ", "2":"สัมผัสกับชาวต่างชาติ",
  // "3":"หมอและพยาบาล","4":"ติดต่อภายในประเทศ","5":"น่าสนใจพิเศษ", "0":"ยังไม่สรุปข้อมูล"};

  for (const [key, value] of Object.entries(grouping)) {
    // console.log(key, value);
    document.write("<h2>"+groupNames[key]+":</h2>"+value)
  }
}
