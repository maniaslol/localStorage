var send=document.querySelector('.button');
var datalist=JSON.parse(localStorage.getItem('datalist')) || [];
var card=document.querySelector('.card-group');
var result=document.querySelector('.result');
var hightinput=document.getElementById('hight');
var weightinput=document.getElementById('weight');
var resetButton=document.querySelector('.reset-button');

document.onkeydown=function(key){
    console.log(key.which==13);
    if(key.which==13){
        showtime(key);
    }
}
send.addEventListener('click', showtime);
resetButton.addEventListener('click',reset);

console.log(datalist);
updateList(datalist);

function showtime(e){
    e.preventDefault();
    var hight=document.querySelector('.hight').value;
    var weight=document.querySelector('.weight').value;
    var today = new Date();//當前日期資料
    var year = today.getFullYear();//當前年份
    var month = today.getMonth() + 1;//當前月份
    var day = today.getDate();//當前日期
    var resultStr="";
    var BMI=weight/((hight/100)*(hight/100));
    var BMIData = {
        BMIhight:hight,
        BMIweight:weight,
        color: "",
        state:"",
        content:Math.ceil(BMI),
        date:month+"/"+day+"/"+year
    };
    if( hight>0 && hight<240 && weight>20 && weight<200){
        if(BMI<18.5){
            BMIData.state="過瘦";
            BMIData.color= "#31BAF9";
            resultStr+='<div class="result-sync" style="border: 5px solid #31BAF9; color: #31BAF9;"><p>'+Math.ceil(BMI)+'</P><middle>BMI</middle><a href="file:///C:/Users/user/Desktop/%E4%BD%9C%E5%93%81%E9%9B%86/localStorage/localStorage.html" class="reset"><i class="fas fa-sync-alt sync-Positioning" style="background-color: #31BAF9;"></i></a></div><div class="state"style="color:#31BAF9">過瘦</div>'
        }
        else if(BMI>18.5 && BMI<25){
            BMIData.state="正常";
            BMIData.color= "#86D73F";
            resultStr+='<div class="result-sync" style="border: 5px solid #86D73E; color: #86D73E;"><p>'+Math.ceil(BMI)+'</p><middle>BMI</middle><a href="file:///C:/Users/user/Desktop/%E4%BD%9C%E5%93%81%E9%9B%86/localStorage/localStorage.html" class="reset"><i class="fas fa-sync-alt sync-Positioning" style="background-color: #86D73F;"></i></a></div><div class="state" style="color:#86D73F">理想</div>'
        }
        else if(BMI>25 && BMI<30){
            BMIData.state="過重";
            BMIData.color = "#FF982D";
            resultStr+='<div class="result-sync" style="border: 5px solid #FF982D; color: #FF982D;"><p>'+Math.ceil(BMI)+'</p><middle>BMI</middle><a href="file:///C:/Users/user/Desktop/%E4%BD%9C%E5%93%81%E9%9B%86/localStorage/localStorage.html" class="reset"><i class="fas fa-sync-alt sync-Positioning" style="background-color: #FF982D;"></i></a></div><div class="state"style="color:#FF982D">過重</div>'
        }
        else if(BMI>30 && BMI<32){
            BMIData.state="肥胖";
            BMIData.color= "#FF6C02";
            resultStr+='<div class="result-sync" style="border: 5px solid #FF6C02; color: #FF6C02;"><p>'+Math.ceil(BMI)+'</p><middle>BMI</middle><a href="file:///C:/Users/user/Desktop/%E4%BD%9C%E5%93%81%E9%9B%86/localStorage/localStorage.html" class="reset"><i class="fas fa-sync-alt sync-Positioning" style="background-color: #FF6C02;"></i></a></div><div class="state"style="color:#FF6C02">肥胖</div>'
        }
        else if(BMI>32){
            BMIData.state="過度肥胖";
            BMIData.color= "red";
            resultStr+='<div class="result-sync" style="border: 5px solid red; color: red;"><p>'+Math.ceil(BMI)+'</P><middle>BMI</middle><a href="file:///C:/Users/user/Desktop/%E4%BD%9C%E5%93%81%E9%9B%86/localStorage/localStorage.html" class="reset"><i class="fas fa-sync-alt sync-Positioning" style="background-color: red;"></i></a></div><div class="state"style="color:red">過度肥胖</div>'
        }
        ;
        datalist.push(BMIData);
        updateList(datalist);
        localStorage.setItem('datalist',JSON.stringify(datalist));
        result.innerHTML=resultStr;
    }
    else{
        alert('請輸入正確數值');
    }
}

function updateList(items){
    var str="";
    var len = items.length;
    for(var i=0 ;len>i ;i++){
        str+='<div class="card" style="border-left: 7px solid '+items[i].color+'"><p>'+items[i].state+'</p><small>BMI</small><p>'+items[i].content+'</p><small>身高</small><p>'+items[i].BMIhight+'</p><small>體重</small><p>'+items[i].BMIweight+'</p><small>'+items[i].date+'</small></div>';
    }
    card.innerHTML=str;
}

function reset(e){
    e.preventDefault();
    datalist=[];
    updateList(datalist);
    localStorage.setItem('datalist',JSON.stringify(datalist));
}
