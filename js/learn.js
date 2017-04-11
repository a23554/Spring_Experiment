function Learn(options){
    
    var $inputs = [$("#exp-suppose"), $("#independent-var"), $("#dependent-var"), $("#control-var")] ;
    var t_summary = ['summary-1', 'summary-2', 'summary-3'];

// modal node   
    var $modal = $('#questions') ;
    var $modal_title = $('#modal-title');
    var $modal_content = $("#modal-content");
    var $modal_btn1 = $('#modal-btn1');
    var $modal_btn2 = $("#modal-btn2"); 
    
    var modal_hide = function(){$('#questions').modal("hide")};
    var modal_show = function(){$('#questions').modal("show")};
    
    var modal_dialog = function(options){
        // set title
        $modal_title.html("").html(options["title"]);
        // set content
        $modal_content.html("").html(options["content"]);
        // set button1 (optional)
        if(options["button_1"]){
            var opt = options["button_1"] ;
            $modal_btn1.html(opt["text"]||"儲存");
            $modal_btn1.removeClass().addClass(opt["class"]||"btn btn-primary");
            $modal_btn1.unbind("click").click(opt["callBack"]);
            $modal_btn1.show();
        }else $modal_btn1.hide();
        // set button2 (optional)
        if(options["button_2"]){
            var opt = options["button_2"] ;
            $modal_btn2.html(opt["text"]||"關閉");
            $modal_btn2.removeClass().addClass(opt["class"]||"btn btn-warning");
            $modal_btn2.unbind("click").click(opt["callBack"]);
            $modal_btn2.show();
        }else $modal_btn2.hide();

        modal_show();
    };
    
    
// stage div    
    var $learn_stage1_form = $('#exp-var-form');
    var $learn_stage2_table = $("#exp-table-div");
    var $table_button = $("#table-finish") ;
    var $learn_stage3_form = $("#exp-summary");
    var $summary_finish = $("#summary-finish");
    
// store all data here -> take out to be global variable
    /* var data = {};  */ 

// stage var
    var stage = 1 ;
    var stage1_cnt = 0 ;

// html tag string & titles
    const title1 = "後設認知";
    const hr = "<hr>";
    
// toggle exp form 
    var setup_toggle_button = function(){
        $("#toggle-exp-form").css("visibility","");
        $("#toggle-exp-form").attr("onclick","").click(function(){
            $learn_stage1_form.toggle();
        });
    };
    
////////////////////////////////////////
// 第一階段填寫假設與變因
    var stage1_handle = function(flag){ 
        // flag用來表示是否為第一階段
        for(var i=0, $input; $input = $inputs[i]; ++i){
            $input.click(function(){
				info = prefix+"1";
				//saveRecord(info);
                var org_text = $(this).val();
                var var_title = $(this).attr('placeholder') ;
				info = prefix+"2";
                modal_dialog({
                    title: var_title,
                    content: '<textarea id="modal-answer" cols="30" rows="7" class="form-control" onfocus="saveRecord(info);">'+org_text+'</textarea>',
                    button_1: {
                        text:"儲存",
                        callBack: function(event){
							info = prefix+"3";
							saveRecord(info);
							
                            var text = $("#modal-answer").val() ;
                            if(text.length==0){
                                bootbox.alert("請填寫完整");
                                return false ;
                            }
                            $(this).val(text);
                            if(flag) 
                                $(this).attr('disabled', true);
                            modal_hide();
                            stage1_cnt++ ;
                            //save data 
                        //  data["stage1_"+stage1_cnt] = text ; 
                            data.push({
                                    time: getCurrentTime(), 
                                    action: "dailog confirm", 
                                    target: var_title, 
                                    data: text 
                                });
                            
                            if(flag){ 
                                if(stage1_cnt==$inputs.length)
                                {
                                    console.log("stage1 over");
                                    stage = 2 ;
                                    stage2_start();
                                }else if(stage1_cnt==1){ //寫完假設後，顯示後面的變因輸入框
                                    for(var j=1; j<$inputs.length; ++j)
                                        $inputs[j].parent().parent().show();
                                }
                            }               
                        }.bind(this)    
                    },
                    button_2: {
                        text: "關閉",
                        callBack: function(){ 
							info = prefix+"4";
							saveRecord(info);
                            data.push({
                                    time: getCurrentTime(), 
                                    action: "dialog close", 
                                    target: var_title
                                });
                            modal_hide(); 
                        }
                    }
                });

            });
        }
    };  

    var stage2_start = function(){
		var ansDa3 = "" + expPrefix + "Da3_" + document.getElementById("exp-suppose").value;
		var ansDb3 = "" + expPrefix + "Db3_"+ document.getElementById("independent-var").value;
		var ansDc3 = "" + expPrefix + "Dc3_"+ document.getElementById("control-var").value;
		var ansDd3 = "" + expPrefix + "Dd3_"+ document.getElementById("dependent-var").value;

		saveRecord(ansDa3);
		saveRecord(ansDb3);
		saveRecord(ansDc3);
		saveRecord(ansDd3);		
        $learn_stage2_table.show(); //show stage2 table
        //$("#exp-table-div").removeClass("hidden"); //show stage2 table
        //$(".tb-ans").hide();
        $table_button.unbind('click').click(table_finish_1);//填完實驗操作/應變變因
        
    };
    

    var stage2_mid = function(){
        
        //$('#exp-learn-form').hide();
        $(".item").attr("disabled", true);
        $(".tb-des").attr("disabled", true);
        
        $('#reset').removeClass("disabled"); 
        
       // $('.tb-ans').html('<input type="text" class="form-control tb-ans-input"/>');
       // var totalLen=$(".tb-des").length;
        
        $('.tb-ans-input').each(function(idx, data){
            //$(data).attr('id','tb-ans-'+idx);
            $(data).attr('onkeypress','return event.charCode >= 46 && event.charCode <= 57');
          //  $(data).attr('idx',(idx%totalLen)+1);
		  $(data).removeAttr("style");
        });//.click({title:"實驗結果"}, show_modal);
       // $('.tb-ans1').html('<input type="text" class="form-control tb-ans1-input"/>');
      //  var totalLen=$(".tb-des").length;
        
        $('.tb-ans1-input').each(function(idx, data){
            //$(data).attr('id','tb-ans-'+idx);
            $(data).attr('onkeypress','return event.charCode >= 46 && event.charCode <= 57');
            //$(data).attr('idx',(idx%totalLen)+1);
			$(data).removeAttr("style");
        });//.click({title:"實驗結果"}, show_modal);
        bootbox.alert("請利用左方實驗材料進行模擬並將實驗結果填入表格。");
        setDraggable();
        
        $table_button.unbind('click').click(table_finish_2);//填完實驗數據
    };
    

    var stage2_end = function(){
        if(options["chart"]) 
            genChart(options["chart"]); 
	   //drawChart();
        $table_button.unbind('click');
        if(options["mode"]){
            $learn_stage1_form.show();
            n_dialog_1_1();
        }else{
            stage = 3;
            $learn_stage1_form.hide();
            $learn_stage3_form.show();
            $table_button.hide();
            //
            setup_toggle_button(); 
            bootbox.alert('請依照實驗結果填寫結論');   
        }
        
        //$table_button.unbind('click').click(table_finish_3);
    };
    
    var table_finish_1 = function(){
        console.log("table[1]: 填寫變因完成");
        if(!save_td_var()){
            bootbox.alert("請填寫完整");
            return false ;
        }
            
        stage2_mid();   
    };

    var table_finish_2 = function(){
        if(!save_td_ans()){
            bootbox.alert("請填寫完整");
            //console.log("table_finish_1");
            return false ;
        }
        if(!options["mode"]){
			
           var rets;
		   // if(!confirm("送出後將無法再修改數據，確定要送出嗎?")) return false ;
		     bootbox.confirm("送出後將無法再修改數據，確定要送出嗎?",function(result) {
						if(!result)
							rets=false;
						}); 
                        if(!rets)
							return false;
        }
        
        $('.item').attr("disabled", true); 
        $('.tb-des').attr("disabled", true);
        $('.tb-ans').each(function(idx, dat){
            var $input = $(dat).children('input').first();
            $input.attr('disabled', true);
        });
        $('.tb-ans1').each(function(idx, dat){
            var $input = $(dat).children('input').first();
            $input.attr('disabled', true);
        });

		var ansDa3 = "" + expPrefix + "Da3_" + document.getElementById("exp-suppose").value;
		var ansDb3 = "" + expPrefix + "Db3_"+ document.getElementById("independent-var").value;
		var ansDc3 = "" + expPrefix + "Dc3_"+ document.getElementById("control-var").value;
		var ansDd3 = "" + expPrefix + "Dd3_"+ document.getElementById("dependent-var").value;
		saveAnswer('Da3',ansDa3);
		saveAnswer('Db3',ansDb3);
		saveAnswer('Dc3',ansDc3);
		saveAnswer('Dd3',ansDd3);
		
		switch(columncount){
			case 7:
				var temp1 = "" + expPrefix + "De1_" + document.getElementById("col1").value;
				var temp2 = "" + expPrefix + "De2_" + document.getElementById("col2").value;
				var temp3 = "" + expPrefix + "De3_" + document.getElementById("col3").value;
				var temp4 = "" + expPrefix + "De4_" + document.getElementById("col4").value;
				var temp5 = "" + expPrefix + "Df1_" + document.getElementById("tb-ans-0").value;
				var temp6 = "" + expPrefix + "Df2_" + document.getElementById("tb-ans-1").value;
				var temp7 = "" + expPrefix + "Df3_ "+ document.getElementById("tb-ans-2").value;
				if(ansDe1 != temp1){
					ansDe1 = temp1;
					saveRecord(ansDe1);
					saveAnswer('De1',ansDe1);
				}
				if(ansDe2 != temp2){
					ansDe2 = temp2;
					saveRecord(ansDe2);
					saveAnswer('De2',ansDe2);
				}
				if(ansDe3 != temp3){
					ansDe3 = temp3;
					saveRecord(ansDe3);
					saveAnswer('De3',ansDe3);
				}
				if(ansDe4 != temp4){
					ansDe4 = temp4;
					saveRecord(ansDe4);
					saveAnswer('De4',ansDe4);
				}
				if(ansDf1 != temp5){
					ansDf1 = temp5;
					saveRecord(ansDf1);
					saveAnswer('Df1',ansDf1);
				}
				if(ansDf2 != temp6){
					ansDf2 = temp6;
					saveRecord(ansDf2);
					saveAnswer('Df2',ansDf2);
				}
				if(ansDf3 != temp7){
					ansDfe3 = temp7;
					saveRecord(ansDf3);
					saveAnswer('Df3',ansDf3);
				}
				break;
			case 9:
				var temp1 = "" + expPrefix + "De1_" + document.getElementById("col1").value;
				var temp2 = "" + expPrefix + "De2_" + document.getElementById("col2").value;
				var temp3 = "" + expPrefix + "De3_" + document.getElementById("col3").value;
				var temp4 = "" + expPrefix + "De4_" + document.getElementById("col4").value;
				var temp5 = "" + expPrefix + "De5_" + document.getElementById("col5").value;
				var temp6 = "" + expPrefix + "Df1_" + document.getElementById("tb-ans-0").value;
				var temp7 = "" + expPrefix + "Df2_" + document.getElementById("tb-ans-1").value;
				var temp8 = "" + expPrefix + "Df3_ "+ document.getElementById("tb-ans-2").value;
				var temp9 = "" + expPrefix + "Df4_ "+ document.getElementById("tb-ans-3").value;
				if(ansDe1 != temp1){
					ansDe1 = temp1;
					saveRecord(ansDe1);
					saveAnswer('De1',ansDe1);
				}
				if(ansDe2 != temp2){
					ansDe2 = temp2;
					saveRecord(ansDe2);
					saveAnswer('De2',ansDe2);
				}
				if(ansDe3 != temp3){
					ansDe3 = temp3;
					saveRecord(ansDe3);
					saveAnswer('De3',ansDe3);
				}
				if(ansDe4 != temp4){
					ansDe4 = temp4;
					saveRecord(ansDe4);
					saveAnswer('De4',ansDe4);
				}
				if(ansDe5 != temp5){
					ansDe5 = temp5;
					saveRecord(ansDe5);
					saveAnswer('De5',ansDe5);
				}
				if(ansDf1 != temp6){
					ansDf1 = temp6;
					saveRecord(ansDf1);
					saveAnswer('Df1',ansDf1);
				}
				if(ansDf2 != temp7){
					ansDf2 = temp7;
					saveRecord(ansDf2);
					saveAnswer('Df2',ansDf2);
				}
				if(ansDf3 != temp8){
					ansDf3 = temp8;
					saveRecord(ansDf3);
					saveAnswer('Df3',ansDf3);
				}
				if(ansDf4 != temp9){
					ansDf4 = temp9;
					saveRecord(ansDf4);
					saveAnswer('Df4',ansDf4);
				}
				break;
			case 14:
				var temp1 = "" + expPrefix + "De1_" + document.getElementById("col1").value;
				var temp2 = "" + expPrefix + "De2_" + document.getElementById("col2").value;
				var temp3 = "" + expPrefix + "De3_" + document.getElementById("col3").value;
				var temp4 = "" + expPrefix + "De4_" + document.getElementById("col4").value;
				var temp5 = "" + expPrefix + "De5_" + document.getElementById("col5").value;
				var temp6 = "" + expPrefix + "De6_" + document.getElementById("col6").value;
				var temp7 = "" + expPrefix + "Df1_" + document.getElementById("tb-ans-0").value;
				var temp8 = "" + expPrefix + "Df2_" + document.getElementById("tb-ans-1").value;
				var temp9 = "" + expPrefix + "Df3_ "+ document.getElementById("tb-ans-2").value;
				var temp10 = "" + expPrefix + "Df4_ "+ document.getElementById("tb-ans-3").value;
				var temp11 = "" + expPrefix + "Df5_" + document.getElementById("tb-ans-4").value;
				var temp12 = "" + expPrefix + "Df6_" + document.getElementById("tb-ans-5").value;
				var temp13 = "" + expPrefix + "Df7_ "+ document.getElementById("tb-ans-6").value;
				var temp14 = "" + expPrefix + "Df8_ "+ document.getElementById("tb-ans-7").value;
				if(ansDe1 != temp1){
					ansDe1 = temp1;
					saveRecord(ansDe1);
					saveAnswer('De1',ansDe1);
				}
				if(ansDe2 != temp2){
					ansDe2 = temp2;
					saveRecord(ansDe2);
					saveAnswer('De2',ansDe2);
				}
				if(ansDe3 != temp3){
					ansDe3 = temp3;
					saveRecord(ansDe3);
					saveAnswer('De3',ansDe3);
				}
				if(ansDe4 != temp4){
					ansDe4 = temp4;
					saveRecord(ansDe4);
					saveAnswer('De4',ansDe4);
				}
				if(ansDe5 != temp5){
					ansDe5 = temp5;
					saveRecord(ansDe5);
					saveAnswer('De5',ansDe5);
				}
				if(ansDe6 != temp6){
					ansDe6 = temp6;
					saveRecord(ansDe6);
					saveAnswer('De6',ansDe6);
				}
				if(ansDf1 != temp7){
					ansDf1 = temp7;
					saveRecord(ansDf1);
					saveAnswer('Df1',ansDf1);
				}
				if(ansDf2 != temp8){
					ansDf2 = temp8;
					saveRecord(ansDf2);
					saveAnswer('Df2',ansDf2);
				}
				if(ansDf3 != temp9){
					ansDf3 = temp9;
					saveRecord(ansDf3);
					saveAnswer('Df3',ansDf3);
				}
				if(ansDf4 != temp10){
					ansDf4 = temp10;
					saveRecord(ansDf4);
					saveAnswer('Df4',ansDf4);
				}
				if(ansDf5 != temp11){
					ansDf5 = temp11;
					saveRecord(ansDf5);
					saveAnswer('Df5',ansDf5);
				}
				if(ansDf6 != temp12){
					ansDf6 = temp12;
					saveRecord(ansDf6);
					saveAnswer('Df6',ansDf6);
				}
				if(ansDf7 != temp13){
					ansDf7 = temp13;
					saveRecord(ansDf7);
					saveAnswer('Df7',ansDf7);
				}
				if(ansDf8 != temp14){
					ansDf8 = temp14;
					saveRecord(ansDf8);
					saveAnswer('Df8',ansDf8);
				}
				break;
		}
		
        stage2_end();
    };

    var save_var = function(){
        for(var i=0, $input; $input = $inputs[i]; ++i){
            console.log($input.val());
        }
    };
    
    var save_td_var = function(){
        var pass = true;
        td_data = {};
        $('.tb-des').each(function(idx, dat){
            if($(dat).val().length==0){pass=false; return ;}            
            td_data["tb-des_"+$(dat).attr('idx')] = $(dat).val() ;
        });
        $('.item').each(function(idx, dat){
            if($(dat).val().length==0){pass=false; return ;}
            td_data["item_"+$(dat).attr('idx')] = $(dat).val() ;
        });
        if(!pass)
            return pass;
        data.push({
            time: getCurrentTime,
            action: "table save",
            target: "表格 操作變因/應變變因",
            data: td_data
        });
        return pass ;
    };
    
    var save_td_ans = function(){
        var pass = true;
        var td_data = {};
        $('.tb-ans').each(function(idx, dat){
            var $input = $(dat).children('input').first();
            if($input.val().length==0 || parseFloat($input.val())=="NaN" ){pass=false; return ;}
            td_data["tb-ans-"+idx] = $input.val() ;
        });
        $('.tb-ans1').each(function(idx, dat){
            var $input = $(dat).children('input').first();
            if($input.val().length==0 || parseFloat($input.val())=="NaN" ){pass=false; return ;}
            td_data["tb-ans1-"+idx] = $input.val() ;
        });       
        if(!pass)
            return pass;
        data.push({
            time: getCurrentTime,
            action: "table save",
            target: "表格 實驗數值",
            data: td_data
        });
        return pass ;
    };
    
    var stage2_3_edit = function(){
        var pass = true;

        pass &= save_td_var();
        pass &= save_td_ans();

        if(!pass){
            bootbox.alert("請填寫完整");
            return ;
        }
        $('.item, .tb-des, .tb-ans-input, .tb-ans1-input').attr('disabled', true); 
        if(options["chart"])
			genChart(options["chart"]);
       // drawChart();
        n_dialog_1_2();
    };

    var genChart=function(type){
            var categories;
            if(type== 1) 
                categories=$(".item").map(function(){return $(this).val();});
            else if(type==2)
                categories=$(".tb-des").map(function(){return $(this).val();});
            $('#result_chart_div').highcharts({
            title: {
                    text: '',
                    x: -20 //center
            },
            xAxis: {
                //title: {
                   // text: 'gg'
               // },
                categories: categories //["物體在空氣中重量","物體在液體中重量"]
            },
            yAxis: {
                    //title: {
                          //  text: '重量(克)'
                    //},
                    plotLines: [{
                            value: 0,
                            width: 0.5,
                            color: '#808080'
                    }],
                    //min:-10,
                   // tickInterval:10
            },
            legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
            },
        });
        var $chart=$('#result_chart_div').highcharts();
        if(type== 1) {
			var datas= $(".drawchart").map(function(){return parseInt($(this).val());});
			$chart.addSeries({name:"彈簧",data:datas});
            }
        else if(type==2)
            $("input[class*='tb-ind']").each(function(){
                $row=$(this).parent().parent();
                var name=$(this).val();
                var datas=$row.find(".tb-ans-input").map(function(){return parseInt($(this).val());});
                //var idx=$(this).attr('idx');
                
                //var datas=$(".tb-ans-input[idx='"+idx+"']").map(function(){return parseInt($(this).val());});//.val();
                //console.log(x);
                $chart.addSeries({name:name,data:datas});
            });
        $chart.redraw();
    }
    
    var n_dialog_1_1 = function(){  
       var radio_str = '<div class="text-center"><input type="radio" name="dialog-1-1" value="1" id="d-1-1-0" onclick="saveRecord(\''+(expPrefix+"Ma1")+'\');"> <label for="d-1-1-0">是</label>'+
					'&nbsp;&nbsp;&nbsp;'+
					'<input type="radio" name="dialog-1-1" value="0" id="d-1-1-1" onclick="saveRecord(\''+(expPrefix+"Ma2")+'\');"> <label for="d-1-1-1">否</label></div>';
        modal_dialog({
            title: title1,
            content: '<h4>開始模擬實驗後，你是否發現原本的實驗設計有問題導致實驗無法依設計執行？</br></br>'+radio_str+'</h4>',     
            button_1: {
                text: "送出",
                callBack: function(){
					saveRecord((expPrefix+"Ma3"));
					
					ansMa1 = "" + expPrefix + "Ma1_" + document.getElementById("d-1-1-0").checked;
					saveRecord(ansMa1);
					saveAnswer('Ma1',ansMa1);
					ansMa2 = "" + expPrefix + "Ma2_" + document.getElementById("d-1-1-1").checked;
					saveRecord(ansMa2);
					saveAnswer('Ma2',ansMa2);
					
                    var res = $('input[name="dialog-1-1"]:checked').val();
                    if(res==0){                     
                        $('.item, .tb-des, .tb-ans-input, .tb-ans1-input').attr('disabled', false); 
                        $table_button.unbind("click").click(stage2_3_edit) ;
                        modal_hide();
                    }else if(res==1){
                        console.log(1);
                        n_dialog_1_2();
                    }
                }
            }   
        });

    };
    
    var n_dialog_1_2 = function(){
       var chkbox_str = '<input type="checkbox" name="editpart" value="suppose" id="d-s" onclick="saveRecord(\''+(expPrefix+"Mb1")+'\');"> <label for="d-s">假設</label>&nbsp;'+
					'<input type="checkbox" name="editpart" value="variable" id="d-v" onclick="saveRecord(\''+(expPrefix+"Mb2")+'\');"> <label for="d-v">變因</label>&nbsp;'+
					'<input type="checkbox" name="editpart" value="design" id="d-d" onclick="saveRecord(\''+(expPrefix+"Mb3")+'\');"> <label for="d-d">實驗設計</label>&nbsp;'+
					'<input type="checkbox" name="editpart" value="simulation" id="d-sim" onclick="saveRecord(\''+(expPrefix+"Mb4")+'\');"> <label for="d-sim">實驗模擬</label></br>'+
					'<input type="checkbox" name="editpart" value="others" id="d-o" onclick="saveRecord(\''+(expPrefix+"Mb5")+'\');"> <label for="d-o">其他</label>&nbsp;'+
					'<input typt="text" value="" id="dialog-1-2-others" onfocus="saveRecord(\''+(expPrefix+"Mb6")+'\');">';
        modal_dialog({
            hidePre: false,
            title: title1,
            content: '<h4>請重新檢視並思考實驗設計有問題的原因，勾選你認為有問題的地方?</br></br>'+chkbox_str+'</h4>', // 3-4
            button_1: {
                text: "修改",
                callBack: function(){    
					saveRecord((expPrefix+"Mb7"));

					ansMb1 = "" + expPrefix + "Mb1_" + document.getElementById("d-s").checked;
					saveRecord(ansMb1);
					saveAnswer('Mb1',ansMb1);
					ansMb2 = "" + expPrefix + "Mb2_" + document.getElementById("d-v").checked;
					saveRecord(ansMb2);
					saveAnswer('Mb2',ansMb2);
					ansMb3 = "" + expPrefix + "Mb3_" + document.getElementById("d-d").checked;
					saveRecord(ansMb3);
					saveAnswer('Mb3',ansMb3);
					ansMb4 = "" + expPrefix + "Mb4_" + document.getElementById("d-sim").checked;
					saveRecord(ansMb4);
					saveAnswer('Mb4',ansMb4);
					ansMb5 = "" + expPrefix + "Mb5_" + document.getElementById("d-o").checked;
					saveRecord(ansMb5);
					saveAnswer('Mb5',ansMb5);
					ansMb6 = "" + expPrefix + "Mb6_" + document.getElementById("dialog-1-2-others").value;
					saveRecord(ansMb6);
					saveAnswer('Mb6',ansMb6);
						
                    for(var i=0, $input; $input = $inputs[i]; ++i){
                        $input.attr("disabled", false);
                    }
                    stage1_handle(false);
                    $('.item, .tb-des, .tb-ans-input, .tb-ans1-input').attr('disabled', false); 
                    $table_button.unbind("click").click(stage2_3_edit) ;
                    modal_hide();
                }
            },
            button_2: {
                text: "完成",
                class: "btn btn-primary",
                callBack: function(){
					saveRecord((expPrefix+"Mb8"));
                    var need_edit = [];
                    var pass = true ;
                    $('input[name="editpart"]:checked').each(function(idx, dat){
                        var tmp = { selection: $(dat).val() } ;
                        if($(dat).val()=="others"){ 
                            var o_text = $("#dialog-1-2-others").val();
                            if(o_text.length>0)
                                tmp["text"] = o_text;
                            else{
                                bootbox.alert("請填寫原因");
                                pass = false ;
                            }
                        }
                            
                        need_edit.push(tmp);
                    });
                    if(need_edit.length>0){
                        bootbox.alert("請點選修改以修改該選項");
                        return false ;
                    }else if(!pass){
                        return false ;
                    }   
                    data["dialog-1-2"] = need_edit ;
					var ret;
                   // if(!confirm("完成後將無法再修改內容，確定要送出嗎?"))
                    bootbox.confirm("完成後將無法再修改內容，確定要送出嗎?",function(result) {
						if(result){
							stage = 3;
							for(var j=0; j<$inputs.length; ++j)
								$inputs[j].attr("disabled", true);
							
							
						
							$learn_stage1_form.hide();
							setup_toggle_button(); 
							$learn_stage3_form.show();
							$table_button.hide();
							modal_hide();
							bootbox.alert('請依照實驗結果填寫結論'); 
						
						}
						else
							ret=false;
						}); 
                        if(!ret)
							return false;
						
						ansMb1 = "" + expPrefix + "Mb1_" + document.getElementById("d-s").checked;
						saveRecord(ansMb1);
						saveAnswer('Mb1',ansMb1);
						ansMb2 = "" + expPrefix + "Mb2_" + document.getElementById("d-v").checked;
						saveRecord(ansMb2);
						saveAnswer('Mb2',ansMb2);
						ansMb3 = "" + expPrefix + "Mb3_" + document.getElementById("d-d").checked;
						saveRecord(ansMb3);
						saveAnswer('Mb3',ansMb3);
						ansMb4 = "" + expPrefix + "Mb4_" + document.getElementById("d-sim").checked;
						saveRecord(ansMb4);
						saveAnswer('Mb4',ansMb4);
						ansMb5 = "" + expPrefix + "Mb5_" + document.getElementById("d-o").checked;
						saveRecord(ansMb5);
						saveAnswer('Mb5',ansMb5);
						ansMb6 = "" + expPrefix + "Mb6_" + document.getElementById("dialog-1-2-others").value;
						saveRecord(ansMb6);
						saveAnswer('Mb6',ansMb6);
                }
            },
        });

    };


    var n_dialog_2_1 = function(){
        console.log("2-1");
       var textarea = '<textarea rows="3" class="form-control" id="modal-textarea" onfocus="saveRecord(\''+(expPrefix+"Mc1")+'\');"></textarea>' ;
        modal_dialog({
            title: title1,
            content: '<h4>請回想探究實驗歷程，在此過程中你學到了什麼科學概念？</br></br>'+textarea+'</h4>', // new 2-1        
            button_1: {
                text: "儲存",
                callBack: function(){
					saveRecord((expPrefix+"Mc2"));
                    var text = $('#modal-textarea').val(); 
                    if(text && text.length>0){
                        data['dialog-2-1'] = text;
						ansMc1 = "" + expPrefix + "Mc1_" + document.getElementById("modal-textarea").value;
						saveRecord(ansMc1);
						saveAnswer('Mc1',ansMc1);
                        n_dialog_2_2();
                    }else{                  
                        bootbox.alert("請填寫內容");
                    }
                }
            }
        });
    };
    
    var n_dialog_2_2 = function(){
        var textarea = '<textarea rows="3" class="form-control" id="modal-textarea" onfocus="saveRecord(\''+(expPrefix+"Md1")+'\');"></textarea>' ;
        modal_dialog({
            title: title1,
          content: '<h4>請回想探究實驗歷程，在此過程中你學到如何進行實驗探究？</br></br>'+textarea+'</h4>', // new 2-1     
          button_1: {
                text: "儲存",
                callBack: function(){
						saveRecord((expPrefix+"Md2"));
                        var text = $('#modal-textarea').val(); 
                        if(text && text.length>0){
                            data['dialog-2-2'] = text;
							ansMd1 = "" + expPrefix + "Md1_" + document.getElementById("modal-textarea").value;
							saveRecord(ansMd1);
							saveAnswer('Md1',ansMd1);
                            n_dialog_2_3();
                        }else{
                            bootbox.alert("請填寫內容");
                            
                        }
                }
            }
        });
    };
    
    var n_dialog_2_3 = function(){
       var chkbox_str = '<input type="checkbox" name="editpart" value="suppose" id="d3-s" onclick="saveRecord(\''+(expPrefix+"Me1")+'\');"> <label for="d3-s">假設</label> '+
						'<input type="checkbox" name="editpart" value="variable" id="d3-v" onclick="saveRecord(\''+(expPrefix+"Me2")+'\');"> <label for="d3-v"">變因</label> '+
						'<input type="checkbox" name="editpart" value="design" id="d3-d" onclick="saveRecord(\''+(expPrefix+"Me3")+'\');"> <label for="d3-d">實驗設計</label> '+
						'<input type="checkbox" name="editpart" value="simulation" id="d3-sim" onclick="saveRecord(\''+(expPrefix+"Me4")+'\');"> <label for="d3-sim">執行模擬實驗</label> '+
						'<input type="checkbox" name="editpart" value="summary" id="d3-sum" onclick="saveRecord(\''+(expPrefix+"Me5")+'\');"> <label for="d3-sum">結論</label></br>'+
						'<input type="checkbox" name="editpart" value="other" id="d3-o" onclick="saveRecord(\''+(expPrefix+"Me6")+'\');"> <label for="d3-o">其他</label> '+
						'<input type="text" value="" id="other-text" onfocus="saveRecord(\''+(expPrefix+"Me7")+'\');"/>';
        modal_dialog({
            title: title1,
          content: '<h4>回想剛剛的探究歷程，請勾選你認為探究的過程中最困難的部分?(複選)</br></br>'+chkbox_str+'</h4>', //4-2-a1
          button_1: {
                text: "儲存",
                callBack: function(){
					saveRecord((expPrefix+"Me8"));
                    var res = [];
                    var pass = true ;
                    $('input[name="editpart"]:checked').each(function(idx, data){
                        var select = $(data).val() ; 
                        if(select=="other"){
                            var o_text = $("#other-text").val() ;
                            res.push({type:"other", content: o_text||"" });
                            if(o_text.length==0){                           
                                bootbox.alert("請填寫完整");
                                pass = false ;
                            }
                        }else
                            res.push(select);
                    });
                    if(res.length==0){
                        bootbox.alert("請至少勾選一項");
                        return false ;
                    }else if(!pass)
                        return false ;
                    data["dailog-2-3"] = res ;
					ansMe1 = "" + expPrefix + "Me1_" + document.getElementById("d3-s").checked;
					saveRecord(ansMe1);
					saveAnswer('Me1',ansMe1);
					ansMe2 = "" + expPrefix + "Me2_" + document.getElementById("d3-v").checked;
					saveRecord(ansMe2);
					saveAnswer('Me2',ansMe2);
					ansMe3 = "" + expPrefix + "Me3_" + document.getElementById("d3-d").checked;
					saveRecord(ansMe3);
					saveAnswer('Me3',ansMe3);
					ansMe4 = "" + expPrefix + "Me4_" + document.getElementById("d3-sim").checked;
					saveRecord(ansMe4);
					saveAnswer('Me4',ansMe4);
					ansMe5 = "" + expPrefix + "Me5_" + document.getElementById("d3-sum").checked;
					saveRecord(ansMe5);
					saveAnswer('Me5',ansMe5);
					ansMe6 = "" + expPrefix + "Me6_" + document.getElementById("d3-o").checked;
					saveRecord(ansMe6);
					saveAnswer('Me6',ansMe6);
					ansMe7 = "" + expPrefix + "Me7_" + document.getElementById("other-text").value;
					saveRecord(ansMe7);
					saveAnswer('Me7',ansMe7);
                    n_dialog_2_4();
              },
            }
        });
    };
    
    var n_dialog_2_4 = function(){
      var textarea = '<textarea rows="3" class="form-control" id="modal-textarea" onfocus="saveRecord(\''+(expPrefix+"Mf1")+'\');"></textarea>' ;
        modal_dialog({
            title: title1,
            content: '<h4>根據你所勾選的選項，請說明為什麼你覺得困難？你如何解決困難？</br></br>'+textarea+'</h4>', // new 2-1
            button_1: {
                    text: "儲存",
                    callBack: function(){
						saveRecord((expPrefix+"Mf2"));
                        var text = $('#modal-textarea').val(); 
                        if(text && text.length>0){
                            data['dialog-2-4'] = text;
							ansMf1 = "" + expPrefix + "Mf1_" + text;
							saveRecord(ansMf1);
							saveAnswer('Mf1',ansMf1);
                            n_dialog_2_5();
                        }else{
                            bootbox.alert("請填寫內容");
                            
                        }
                    }
            },
        });
    };
    
    var n_dialog_2_5 = function(){
		var textarea = '<textarea rows="3" class="form-control" id="modal-textarea" onfocus="saveRecord(\''+(expPrefix+"Mg1")+'\');"></textarea>' ;
        modal_dialog({
            title: title1,
          content: '<h4>請回想探究歷程，你學到形成假設、變因與實驗設計之間的關係為何？</br></br>'+textarea+'</h4>', // new 2-1
          button_1: {
                text: "儲存",
                callBack: function(){
					saveRecord((expPrefix+"Mg2"));
                    var text = $('#modal-textarea').val(); 
                    if(text && text.length>0){
                        data['dialog-2-5'] = text;
						ansMg1 = "" + expPrefix + "Mg1_" + document.getElementById("modal-textarea").value;
						saveRecord(ansMg1);
						saveAnswer('Mg1',ansMg1);
                        n_dialog_2_6();
                    }else{
                        bootbox.alert("請填寫內容");
                        
                    }               
                }
            }   
        });
    };
    
    var n_dialog_2_6 = function(){
        var textarea = '<textarea rows="3" class="form-control" id="modal-textarea" onfocus="saveRecord(\''+(expPrefix+"Mh1")+'\');"></textarea>' ;
        modal_dialog({
            title: title1,
          content: '<h4>請回想探究歷程，你學到實驗設計與執行模擬實驗之間的關係為何？</br></br>'+textarea+'</h4>', // new 2-1    
          button_1: {
                text: "儲存",
                callBack: function(){
					saveRecord((expPrefix+"Mh2"));
                    var text = $('#modal-textarea').val(); 
                    if(text && text.length>0){
                        data['dialog-2-6'] = text;
						ansMh1 = "" + expPrefix + "Mh1_" + document.getElementById("modal-textarea").value;
						saveRecord(ansMh1);
						saveAnswer('Mh1',ansMh1);
                        bootbox.alert("學習單結束!");
                        $summary_finish.unbind("click");
                        modal_hide();
                    }else{
                        bootbox.alert("請填寫內容");
                        
                    }               
                }
            }
        });
    };

    $summary_finish.click(function(){
        var pass = true ;
        
        // check text area value
        $.each(t_summary, function(idx, dat){
            var $input = $('#'+dat) ;   
            if($input.val().length==0) 
                pass = false ;
            else
                data[dat] = $input.val(); 
        });
        if(!pass){
            bootbox.alert("請填寫完整");
            return ;
        }
        
        // check checkbox selected  
        var support = $('input[name=summary-sup]:checked').val() ;
        if(!support){
            bootbox.alert("請選擇是否支持假設");
            return ;
        }
        data["summary-sup"] = support;
        
        /////
       // if(!confirm("送出後無法修改，確定作答無誤嗎?")) return ; 
	   var setans;
			bootbox.confirm("送出後無法修改，確定作答無誤嗎?",function(result) {
						if(result){
							$summary_finish.remove();
							setans=true;;
							if(options["mode"]){
								var ansDg1 = "" + expPrefix + "Dg1_" + document.getElementById("summary-1").value;
								var ansDg2 = "" + expPrefix + "Dg2_" + document.getElementById("summary-2").value;
								var ansDg3 = "" + expPrefix + "Dg3_ "+ document.getElementById("s-1").checked;
								var ansDg4 = "" + expPrefix + "Dg4_ "+ document.getElementById("s-0").checked;
								var ansDg5 = "" + expPrefix + "Dg5_ "+ document.getElementById("summary-3").value;
								saveRecord(ansDg1);
								saveRecord(ansDg2);
								saveRecord(ansDg3);
								saveRecord(ansDg4);
								saveRecord(ansDg5);
								saveAnswer('Dg1',ansDg1);
								saveAnswer('Dg2',ansDg2);
								saveAnswer('Dg3',ansDg3);
								saveAnswer('Dg4',ansDg4);
								saveAnswer('Dg5',ansDg5);
								n_dialog_2_1();
								
							}
								
							else
								bootbox.alert("學習單結束");
						}

						}); 
                        if(setans)
							return;	   
			
    });

    

    stage1_handle(true);


}

/*$(function(){
    var var_cnt = 0 ;
    var $inputs = [$("#exp-suppose"), $("#independent-var"), $("#dependent-var"), $("#control-var")] ;
    var $summary_inputs = [$("#summary-1"), $("#summary-2"), $("#summary-3")];
    var $finish = $('#summary-finish');
    var $modal = $('#questions');
    var $modal_title = $('#modal-title');
    var $modal_content = $('#modal-answer');
    var $modal_save = $('#modal-save');
    $(".tb-ans").hide();
        //set number only
        $("input[class*='tb-ans']").attr('onkeypress','return event.charCode >= 48 && event.charCode <= 57');
        
    for(var i=0, $input; $input = $inputs[i]; ++i){
        $input.click(function(){
            //console.log($(this).attr('placeholder'));
            $modal_title.html($(this).attr('placeholder'));
            $modal_content.val('');
             
            $modal_save.unbind('click');
            $modal_save.click(function(event){
                var text = $modal_content.val() ;
                if(text.length==0){
                    alert("請填寫完整");
                    return false ;
                }
                $(this).val(text);
                $(this).attr('disabled', true);
                $modal.modal('hide');
                var_cnt++ ;
                if(var_cnt==$inputs.length){
                                    $("#exp-table-div").removeClass("hidden");
                                    $("#result_chart_div").removeClass("hidden");
                  
                                    //$("#exp-var-form").addClass("hidden");
                }
                 
            }.bind(this));
            $modal.modal('show');
        });
    }
     
    $finish.click(function(){
        if(var_cnt!=4){
            alert("請完成每個填寫項目");
            return false ;
        }
         
        var summary_ratio = $('input[name=summary-sup]:checked').val();
        if(typeof summary_ratio == "undefined"){
            alert("請完成實驗總結");
                return false ;
        }
        for(var i=0, $input; $input = $summary_inputs[i]; ++i){
            var text = $input.val();
            if(text.length==0){
                alert("請完成實驗總結");
                return false ;
            }
        }
        alert("學習單結束!!!");
         
    });
     
});

function canSimulation(){
    var inputDone=true;
    $("#exp-table").find(".tb-des").each(function(index,value){
        //$(this).removeClass("hidden");
        if($(this).val()=="")
            inputDone=false;
    });
    return inputDone;
}
function canConclusion(){
    var inputDone=true;
    $("#exp-table").find("input").each(function(index,value){
        //$(this).removeClass("hidden");
        if($(this).val()=="")
            inputDone=false;
    });
    return inputDone;
}

function startSimulation($obj){
    if(canSimulation()){
        alert("實驗已開始!");
        $obj.attr("onClick","startConclusion();");
        setDraggable();
        $("#reset").removeClass("disabled");
        $("#go").removeClass("disabled");
        $(".btn-liquid").removeClass("disabled");
        $(".tb-ans").show();
    }
    else{
        alert("有表格尚未填寫!");
    }
}
function startConclusion(){
    //$(this).addClass("hidden");
    if(canConclusion()){
        drawChart();
        $("#exp-var-form").addClass("hidden");
        $("#conclusion").removeClass("hidden");
        $("#toggle-exp-form").css("visibility","visible");//removeClass("hidden");
        $("#exp-table").find("input").attr("disabled","true");
    }
    else{
        alert("有表格尚未填寫!");
    }
};
*/