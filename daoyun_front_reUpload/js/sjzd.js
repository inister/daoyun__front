var all_page = 0;
var page_addr = 1;
var page_true = 1;
var page_deviation = 0;
var len = 3;
var num = 15;
var data = new Array();
var now_edit = "";
//更新页面内容
function add(page){
  var tar = 1;
  var editTable=document.getElementById("etable");
  var j = editTable.rows.length;
  for (var i = tar; i < j; i++){
      editTable.deleteRow(tar);
  }
  if (data.length-(page-1)*len < len){
    num = data.length-(page-1)*len;
  }
  else{
    num = len;
  }
  //console.log(data);
  for (var i = 0; i < num; i++){
    var temp = data[(page-1)*len+i];
    var node0 = document.createElement("input");
    node0.setAttribute('type', "button");
    node0.setAttribute('value', "查看");
    node0.setAttribute('onclick', "show('"+temp[0]+"')");
    var node1 = document.createElement("input");
    node1.setAttribute('type', 'checkbox');
    node1.setAttribute('id', 'checkbox_'+i);
    var row=editTable.insertRow(tar+i);
    var cell0=row.insertCell(0);
    var cell1=row.insertCell(1);
    var cell2=row.insertCell(2);
    var cell3=row.insertCell(3);
    var cell4=row.insertCell(4);
    var cell5=row.insertCell(5);
    cell0.appendChild(node1);
    cell1.innerHTML = temp[0];
    cell2.innerHTML = temp[1];
    cell3.innerHTML = temp[2];
    cell4.innerHTML = temp[3];
    cell5.appendChild(node0);
    //console.log(temp);
  }
}
//请求每页数据
function get_data(p){
  page_true = page_deviation+p;
  if (all_page > 5){
    if (p == -1 || page_true == 1){
      $("#a"+page_addr).removeClass("active");
      page_addr = 1;
      page_deviation = 0;
      page_true = 1;
      $("#a1").addClass("active");
      for (var i = 1; i <= 5; i++){
        document.getElementById("at"+i).innerHTML = i;
      }
    }
    else if (page_true == 2){
      $("#a"+page_addr).removeClass("active");
      page_addr = 2;
      page_deviation = 0;
      $("#a2").addClass("active");
      for (var i = 1; i <= 5; i++){
        document.getElementById("at"+i).innerHTML = i;
      }
    }
    else if (page_true == all_page-1){
      $("#a"+page_addr).removeClass("active");
      page_addr = 4;
      page_deviation = all_page-5;
      $("#a4").addClass("active");
      for (var i = 1; i <= 5; i++){
        document.getElementById("at"+i).innerHTML = all_page-5+i;
      }
    }
    else if(p == -2 || page_true == all_page){
      $("#a"+page_addr).removeClass("active");
      page_addr = 5;
      page_deviation = all_page-5;
      page_true = all_page;
      $("#a5").addClass("active");
      for (var i = 1; i <= 5; i++){
        document.getElementById("at"+i).innerHTML = all_page-5+i;
      }
    }
    else{
      page_deviation = page_true-3
      $("#a"+page_addr).removeClass("active");
      page_addr = 3;
      $("#a3").addClass("active");
      for (var i = 1; i <= 5; i++){
        document.getElementById("at"+i).innerHTML = page_deviation+i;
      }
    }
  }
  else{
    if (p == -1){
      $("#a"+page_addr).removeClass("active");
      page_addr = 1;
      page_true = 1;
      $("#a1").addClass("active");
    }
    else if (p == -2){
      $("#a"+page_addr).removeClass("active");
      page_addr = all_page;
      page_true = all_page;
      $("#a"+all_page).addClass("active");
    }
    else{
      $("#a"+page_addr).removeClass("active");
      page_addr = p;
      $("#a"+p).addClass("active");
    }
  }
  add(page_true);
}
function jump_(){
  page_deviation = 0;
  get_data(Number(document.getElementById("jump").value));
}
//排序
function sort_(f){
  if (f == 0){
    var uol = document.getElementById("id_button").name;
    document.getElementById("name_flag").innerHTML = "";
    if (uol == "up"){
      data.sort(function(x, y){return x[0].localeCompare(y[0]);});
      document.getElementById("id_button").name = "down";
      document.getElementById("id_flag").innerHTML = "▲";
    }
    else {
      data.sort(function(y, x){return x[0].localeCompare(y[0]);});
      document.getElementById("id_button").name = "up";
      document.getElementById("id_flag").innerHTML = "▼";
    }
  }
  else if(f == 1){
    var uol = document.getElementById("name_button").name;
    document.getElementById("id_flag").innerHTML = "";
    if (uol == "up"){
      data.sort(function(x, y){return x[1].localeCompare(y[1]);});
      document.getElementById("name_button").name = "down";
      document.getElementById("name_flag").innerHTML = "▲";
    }
    else {
      data.sort(function(y, x){return x[1].localeCompare(y[1]);});
      document.getElementById("name_button").name = "up";
      document.getElementById("name_flag").innerHTML = "▼";
    }
  }
  add(1);
}
function allcheck(){
  for (var i = 0; i < len; i++){
    var temp = document.getElementById("check").checked;
    document.getElementById("checkbox_"+i).checked = temp;
  }
}
function search(){
  /*
  var key = document.getElementById("key").value;
  var xhr = new XMLHttpRequest();
  //监听响应
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      //console.log(xhr.responseText);
      data = new Array();
      s = xhr.responseText.split(';');
      for (var i = 0; i < s.length; i++){
        data[i] = s[i].split('/');
      }
      add();
    }
  };
  var url = '/get?type=user&key=' + key;
  xhr.open("GET", url, true);
  xhr.send();
  */
}
function delete_(){
  var temp = new Array(); 
  var k = 0;
  for (var i = 0; i < len; i++){
    if (document.getElementById("checkbox_"+i).checked){
      data.splice((page_true-1)*len+i-k, 1);
      k += 1;
    }
  }
  for (var j = 0; j < data.length; j++){
    temp[j] = data[j].join('/');
  }
  sessionStorage.setItem("data", temp.join(';'));
  window.open('./r-sjzd.html','_self');
}
function show(item){
  now_edit = item;
  var data_s = sessionStorage.getItem(item+"-d").split(';');
  var tar = 1;
  var editTable=document.getElementById("stable");
  var j = editTable.rows.length;
  for (var i = tar; i < j; i++){
      editTable.deleteRow(tar);
  }
  //console.log(data);
  var i = 0
  for (; i < data_s.length; i++){
    var temp = data_s[i].split('/');
    var node0 = document.createElement("input");
    node0.setAttribute('type', "button");
    node0.setAttribute('value', "修改");
    node0.setAttribute('onclick', "chi_edit('"+(tar+i)+"')");
    var node1 = document.createElement("input");
    node1.setAttribute('type', "button");
    node1.setAttribute('value', "删除");
    node1.setAttribute('onclick', "chi_del('"+(tar+i)+"')");
    var row=editTable.insertRow(tar+i);
    var cell0=row.insertCell(0);
    var cell1=row.insertCell(1);
    var cell2=row.insertCell(2);
    var cell3=row.insertCell(3);
    cell0.innerHTML = temp[0];
    cell1.innerHTML = temp[1];
    cell2.appendChild(node0);
    cell3.appendChild(node1);
    //console.log(temp);
  }
  var node0 = document.createElement("input");
  node0.setAttribute('type', "button");
  node0.setAttribute('value', "追加");
  node0.setAttribute('onclick', "chi_edit('"+(tar+i)+"')");
  var row=editTable.insertRow(tar+i);
  var cell0=row.insertCell(0);
  var cell1=row.insertCell(1);
  var cell2=row.insertCell(2);
  var cell3=row.insertCell(3);
  cell2.appendChild(node0);
}
function chi_edit(i){
  var editTable=document.getElementById("stable");
  editTable.deleteRow(i);
  var node0 = document.createElement("input");
  node0.setAttribute('type', "button");
  node0.setAttribute('value', "确定");
  node0.setAttribute('onclick', "chi_sure('"+i+"')");
  var node1 = document.createElement("input");
  node1.setAttribute('type', "button");
  node1.setAttribute('value', "取消");
  node1.setAttribute('onclick', "show('"+now_edit+"')");
  var node2 = document.createElement("input");
  node2.setAttribute('type', "text");
  node2.setAttribute('id', "chiname");
  var node3 = document.createElement("input");
  node3.setAttribute('type', "text");
  node3.setAttribute('id', "chitype");
  var row=editTable.insertRow(i);
  var cell0=row.insertCell(0);
  var cell1=row.insertCell(1);
  var cell2=row.insertCell(2);
  var cell3=row.insertCell(3);
  cell0.appendChild(node2);
  cell1.appendChild(node3);
  cell2.appendChild(node0);
  cell3.appendChild(node1);
}
function chi_sure(i){
  var editTable=document.getElementById("stable");
  var node0 = document.createElement("input");
  node0.setAttribute('type', "button");
  node0.setAttribute('value', "修改");
  node0.setAttribute('onclick', "chi_edit('"+i+"')");
  var node1 = document.createElement("input");
  node1.setAttribute('type', "button");
  node1.setAttribute('value', "删除");
  node1.setAttribute('onclick', "chi_del('"+i+"')");
  var node2 = document.getElementById("chiname").value;
  var node3 = document.getElementById("chitype").value;
  editTable.deleteRow(i);
  var row=editTable.insertRow(i);
  var cell0=row.insertCell(0);
  var cell1=row.insertCell(1);
  var cell2=row.insertCell(2);
  var cell3=row.insertCell(3);
  cell0.innerHTML = node2;
  cell1.innerHTML = node3;
  cell2.appendChild(node0);
  cell3.appendChild(node1);
  chi_save();
}
function chi_del(i){
  var editTable=document.getElementById("stable");
  editTable.deleteRow(i);
  chi_save();
}
function chi_save(){
  var da = new Array();
  var tb = document.getElementById('stable');
  var rows = tb.rows;
  for(var i = 1; i<rows.length; i++){
    var dt = "";
    if (rows[i].cells[0].innerHTML == "" || rows[i].cells[1].innerHTML == ""){
      continue;
    }
    for(var j = 0; j<2; j++){
      dt += rows[i].cells[j].innerHTML;
      dt += '/';
    }
    da.push(dt);
  }
  sessionStorage.setItem(now_edit+"-d", da.join(';'));
  show(now_edit);
}
window.onload = function(){
  var s = sessionStorage.getItem("data").split(';');
  all_page = Math.ceil(s.length/len);
  for (var i = 0; i < s.length; i++){
    data[i] = s[i].split('/');
  }
  get_data(1);
}