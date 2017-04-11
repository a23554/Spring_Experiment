function resetResultImg(num){
	$("#result_img_div").html("");
	for(var i = 0 ; i <= num;i++){
		$("#result_img_div").append("<img id='"+i+"' src='origin1.jpg' class='drag-component'></img>");
	}
}

function setDraggable(){
	$(".draggable").draggable({
					revert : function(event, ui) {
						$(this).data("uiDraggable").originalPosition = {
								top : 0,
								left : 0
						};
						return !event;
					}
			});
	$(".draggable").draggable("enable");
}
function resetDragPos(obj){
	obj.css({
		'left': '0px',
		'top': '0px'
	});
}
function clearDraggable(){
	resetDragPos($(".draggable"));
	$(".draggable").show();
	$(".draggable").draggable('disable');
	//$(".draggable").removeAttr('style');
}
function dateFormat(date, format) {
    if(format === undefined){
        format = date;
        date = new Date();
    }
    var map = {
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "h": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "q": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}

function setPrefix(code){
	prefix = expPrefix + code;
}

function setArrow(code){
	saveRecord(code);
	if(code.slice(2,2)=="d"){
		var newcode = "" + code.slice(0,1) + "up";
		document.getElementById("toggle-button").onclick=function(){setArrow(newcode);}
	}
	else{
		var newcode = "" + code.slice(0,1) + "down";
		document.getElementById("toggle-button").onclick=function(){setArrow(newcode);}
	}
}

function saveRecord(recordstring){
	theDate = new Date();
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4) {
			if(xmlhttp.status==200) {
				xmlhttp.abort();
			}
		}
	};
	xmlhttp.open("POST","saveRecord.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("userid=" + username + "&info=" + recordstring + "&time=" + dateFormat(theDate, 'yyyy-MM-dd hh:mm:ss') + "." + theDate.getMilliseconds());
}

function saveAnswer(column,recordstring){
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState==4) {
			if(xmlhttp.status==200) {
				xmlhttp.abort();
			}
		}
	};
	xmlhttp.open("POST","saveAnswer.php",true);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlhttp.send("userid=" + username + "&exp=" + expPrefix + "&column=" + column + "&content=" + recordstring);
}
/*var drawChart = function(){ //div_id, data, category
    //var $chart = $('#'+div_id);
    $('#result_chart_div').highcharts({
        title: {
                text: '',
                x: -20 //center
        },
        xAxis: {
            //title: {
                   //     text: '重量(克)'
               // },
            categories: $(".item").map(function(){return $(this).val();})
        },
        yAxis: {
                //title: {
                      //  text: '伸長量(公分)'
               // },
                plotLines: [{
                        value: 0,
                        width: 0.5,
                        color: '#808080'
                }],
                min:0,
                tickInterval:2
        },
        legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
        },
         
    });
    var $chart=$('#result_chart_div').highcharts();
        var datas= $(".tb-ans-input").map(function(){return parseInt($(this).val());});
        $chart.addSeries({name:"彈簧",data:datas});
};*/