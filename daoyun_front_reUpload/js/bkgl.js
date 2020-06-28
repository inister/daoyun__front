var all_page = 0;
var page_addr = 1;
var page_true = 1;
var page_deviation = 0;
var len = 3;
var num = 15;
var data = new Array();
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
    var node0 = document.createElement("a");
    node0.setAttribute('href', './get?ask=editpage-class&id='+temp[0]);
    node0.setAttribute('target', 'rgt');
    node0.innerHTML = "编辑"
    var node1 = document.createElement("a");
    node1.innerHTML = " | "
    var node2 = document.createElement("a");
    node2.onclick = function(){del(temp[0]);};
    node2.innerHTML = "删除"
    var row=editTable.insertRow(tar+i);
    var cell0=row.insertCell(0);
    var cell1=row.insertCell(1);
    var cell2=row.insertCell(2);
    var cell3=row.insertCell(3);
    var cell4=row.insertCell(4);
    cell0.innerHTML = temp[0];
    cell1.innerHTML = temp[1];
    cell2.innerHTML = temp[2];
    cell3.innerHTML = temp[3];
    cell4.appendChild(node0);
    cell4.appendChild(node1);
    cell4.appendChild(node2);
    //console.log(temp);
  }
}
function del(id){
  var data = 'ask=delete&type=class&id='+id;
  var url = '/post';
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  //设置header
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && ( xhr.status === 200 || xhr.status === 304 )){
      console.log(xhr.responseText);
      alert("删除成功！");
      window.open('./r-bkgl.html','_self');
    }
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
      data.sort(function(x, y){return Number(x[0])-Number(y[0]);});
      document.getElementById("id_button").name = "down";
      document.getElementById("id_flag").innerHTML = "▲";
    }
    else {
      data.sort(function(y, x){return Number(x[0])-Number(y[0]);});
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
  get_data(1);
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
window.onload = function(){
  var xhr = new XMLHttpRequest();
  //监听响应
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      var s = xhr.responseText.split(';');
      if (s.length < 3){
        window.open('./'+s[0]+'.html','_self');
      }
      else{
        sessionStorage.setItem("classes", s);
        all_page = Math.ceil(s.length/len);
        for (var i = 0; i < s.length; i++){
          data[i] = s[i].split('/');
        }
        get_data(1);
      }
    }
  };
  var url = '/get?ask=classes&token=' + sessionStorage.getItem("token");
  xhr.open("GET", url, true);
  xhr.send();
}