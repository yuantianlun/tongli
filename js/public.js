$(document).ready(function(){

    $(document).on('click', 'a[ajax=true]', function() {
        var alinkobj=$(this);
        if(typeof(alinkobj.attr("ajax-target"))!="undefined")//鐩存帴ajx Load鍔犺浇鑷崇洰鏍嘍ocument涓�
        {

            $(this).parent().parent().find(".select").removeClass("select");//鍘婚櫎閾炬帴鐨勭劍鐐�
            $(this).addClass("select");//鍔犱笂閾炬帴鐨勭劍鐐�

            $(alinkobj.attr("ajax-target")).load(alinkobj.attr("href"),function(){$(alinkobj.attr("ajax-target")).fadeIn()});
        }
        else
        {
            //alert("1");
            poplayer(alinkobj.attr("title"),alinkobj.attr("href"),alinkobj.attr("width"),alinkobj.attr("height"),"",alinkobj.attr("closebtn"));//寮瑰眰鍔犺浇
        }
        return false;
    });

    //閿氱偣鍔ㄧ敾杞烦,閲囩敤ID鐨勬柟寮�,stop:涓嶈兘鑷姩璺冲埌鎸囧畾鐨勪綅缃�
    /*$(document).on('click', 'a[href*=#]', function() {
        var thislocation=$(this).attr("href");
        var rightthislocation=thislocation.split("#");
        var a_markname=rightthislocation[1];
        if(a_markname!="")
        {
            $("html,body").animate({scrollTop:$("a[name="+a_markname+"]").offset().top},1000)
            //return false;
        }
    });*/



    $(document).on('click', 'button[ajax=true]', function() {
        var buttonobj=$(this);
        var formobj=buttonobj.parents("form");
        var yesfun=function(){
            $.ajax({
                type: "GET",
                url: buttonobj.attr("data-href")==""?location.href:buttonobj.attr("data-href"),
                data: formobj.serialize(),
                cache:false,
                dataType: "json",
                error:function (XMLHttpRequest, textStatus, errorThrown) {
                    // 閫氬父 textStatus 鍜� errorThrown 涔嬩腑
                    // 鍙湁涓€涓細鍖呭惈淇℃伅
                    //this; // 璋冪敤鏈AJAX璇锋眰鏃朵紶閫掔殑options鍙傛暟
                    if(typeof(console)!='undefined')
                    {
                        console.log("Ajax Error!");
                        console.log("status:"+XMLHttpRequest.status);
                        console.log("readyState:"+XMLHttpRequest.readyState);
                        console.log("textStatus:"+textStatus);
                    }
                    buttonobj.removeAttr("disabled");
                },
                success: function(result){
                    buttonobj.removeAttr("disabled");
                    switch (result["status"])
                    {
                        case 0://Error
                            //杩斿洖result=array("info"=>"鏍囬","status"=>0);
                            alertz(result["info"]);
                            break;
                        case 1://Succend
                            //杩斿洖result=array("info"=>"鏍囬","status"=>1,"url"=>"/Index/index");
                            alert2url(result["info"],result["status"],result["url"]);
                            break;
                    }
                },
                beforeSend:function(){
                    buttonobj.attr("disabled","disabled");
                }
            });
        };

        if(typeof(buttonobj.attr("data-action"))!="undefined")
        {
            if(buttonobj.attr("data-action")=="selectAnd2dosome")//鏄姹傚厛閫夋嫨鐒跺悗鍋歴omething
            {
                if(formobj.find(":checkbox[name^=id]:checked").size()<1)//閫夐」鐨刵ame蹇呴渶涓�"id[]"
                {
                    alertz("璇烽€夋嫨璁板綍!");
                    return false;
                }
            }
        }

        if(typeof(buttonobj.attr("data-confirm-msg"))!="undefined")//瑕佹眰鎿嶄綔鍓嶅啀纭鐨�
        {
            confirm(buttonobj.attr("data-confirm-msg"),yesfun,'');
        }
        else
        {
            yesfun();
        }
        return false;
    });

    //缁戝畾ajax鐨勮〃鍗�

    $(document).on('submit', 'form[ajax=true]', function() {
        var formobj=$(this);
        $.ajax({
            type: formobj.attr("method"),
            url: formobj.attr("action")==""?location.href:formobj.attr("action"),
            data: formobj.serialize(),
            cache:false,
            dataType: "json",
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                // 閫氬父 textStatus 鍜� errorThrown 涔嬩腑
                // 鍙湁涓€涓細鍖呭惈淇℃伅
                //this; // 璋冪敤鏈AJAX璇锋眰鏃朵紶閫掔殑options鍙傛暟
                if(typeof(console)!='undefined')
                {
                    console.log("Ajax Error!");
                    console.log("status:"+XMLHttpRequest.status);
                    console.log("readyState:"+XMLHttpRequest.readyState);
                    console.log("textStatus:"+textStatus);
                }
            },
            success: function(result){
                switch (result["status"])
                {
                    case 0://Error
                        //杩斿洖result=array("info"=>"鏍囬","status"=>0);
                        formobj.find("input[type='submit']").removeAttr("disabled");
                        alertz(result["info"])
                        $("img[autoRefresh=true]").click();//鑷姩鍒锋柊楠岃瘉鐮佸浘鐗�
                        break;
                    case 1://Succend
                        //杩斿洖result=array("info"=>"鏍囬","status"=>1,"url"=>"/Index/index");
                        formobj.find("input[type='submit']").removeAttr("disabled");
                        /*if(typeof(result["info"])!='undefined')//浣滄秷鎭彁绀�
                        {
                            if(result["info"]!="")
                            {
                                //alerts(result["info"],1, 'if(typeof("'+result["url"]+'")!="undefined"){if("'+result["url"]+'"!=""){var urlss="'+result["url"]+'";urlss=urlss.replace(/amp;/g, "");window.location.href=urlss;}}');
                                alerts(result["info"],1,function(){
                                                                       var urlss=result["url"];
                                                                       urlss=urlss.replace(/amp;/g, "");
                                                                       window.location.href=urlss;
                                                                       });
                                //杩斿洖鍚玌RL鍊间笉涓虹┖

                            }
                            else
                            {
                                if(typeof(result["url"])!='undefined'){
                                    if(result["url"]!=""){
                                        var  urlss=result["url"];
                                        urlss=urlss.replace(/&amp;/g, "&");
                                        window.location.href=urlss;//杞烦
                                    }
                                }
                            }
                        }*/
                        alert2url(result["info"],result["status"],result["url"]);
                        break;
                }
            },
            beforeSend:function(){
                //閲囩敤jq on(live) 閮戒笉鐢ㄤ笅闈㈢殑浠ｇ爜浜嗐€侻LGB
                //if(formobj.attr("ajaxbeforeSend")!="")//妫€娴嬫湁娌℃湁缁戝畾琛ㄥ崟楠岃瘉
//				   {
//					   var istrue=false;//榛樿琛ㄥ崟楠岃瘉鏈€氳繃
//					   switch (formobj.attr("ajaxbeforeSend"))
//					   {
//						   case "Validform"://琛ㄥ崟楠岃瘉
//								if(typeof(formobj.valid)!="undefined")istrue=formobj.valid() ;//妫€鏌ユ槸鍚﹀叏閮ㄩ€氳繃楠岃瘉
//						   break;
//					   }
//					   if(istrue==true)
//					   {
//
//					   }
//					   else
//					   {
//						   //琛ㄥ崟鏃犳搷浣滐紝淇濇寔鍘熼〉闈�
//					   }
//				   }
                formobj.find("input[type='submit']").attr("disabled","disabled");
            }
        });
        return false;//Stop Submit
    });

});
//寮圭獥锛屽苟杞悜
function alert2url(info,status,url)
{
    if(info!="")
    {
        if(url=="")
        {
            alerts(info,status,function(){location2url(window.location.href)});
        }
        else
        {
            alerts(info,status,function(){
                var urlss=url;
                urlss=urlss.replace(/amp;/g, "");
                //alertz(urlss);
                location2url(urlss);
            });
        }
    }
    else
    {
        if(url=="")
        {
            //window.location.href=window.location.href;
        }
        else
        {
            var urlss=url;
            urlss=urlss.replace(/amp;/g, "");
            location2url(urlss);
        }
    }
}
//鏍规嵁鍙傛暟鏍囪瘑锛屽喅瀹氭槸鍦ㄦ湰/澶栨鏋惰烦鍑烘柊椤甸潰
//http://www.baidu.com/&noiframe
function location2url(url)
{
    if(url!="")
    {
        if(url.indexOf("&noiframe")>0)////"noiframe"鍏抽敭瀛楃,鍦ㄩ《绾х獥鍙ｄ腑
        {
            top.window.location.href=url.replace("&noiframe","");//
        }
        else if(url.indexOf("&parentiframe")>0)////"parentiframe"鍏抽敭瀛楃鍦ㄧ埗绾х獥鍙ｄ腑
        {
            parent.window.location.href=url.replace("&parentiframe","");
        }
        else
        {
            window.location.href=url;//榛樿褰撳墠绐楀彛
        }
    }
}


//鑷畾涔夊脊鍑烘秷鎭
//鍙傛暟锛歩nfo:娑堟伅鍐呭锛泂tatus锛氱姸鎬佺被鍨嬶紝鏋氫妇鍨嬶紱fn:鐐瑰嚮纭畾璁ゆ墽琛岀殑鍑芥暟
function alerts(info,status,fn)
{
    var layerobj;
    switch (status)
    {
        case 0:
            //layerobj=layer.alertz(info, 5,function(){eval(fn);layer.close(layerobj);});
            /*layer.msg(info, 2, function(){
                eval(fn);
            });*/
            parent.$.layer({
                title: false,
                area: ['340px', 'auto'],
                border: [5, 0.3, '#000'],
                shade: [0.5, '#000'],
                closeBtn:false,
                fadeIn: 300,
                time: 2,
                fix: true,
                btns: 0,
                dialog: {
                    type: 3,
                    msg: info
                },
                success: function(){
                    //layer.shift('top', 200); //鍙充笅瑙掑脊鍑猴紝400姣閫熺巼
                },
                end: function(){
                    //eval(fn);
                    if(typeof(fn)=="function")fn();
                }
            });
            break;
        case 1:
            //layerobj=layer.alertz(info, 1,function(){eval(fn);layer.close(layerobj);});
            /*layerobj=layer.msg(info, 2, function(){
                eval(fn);layer.close(layerobj);
            });*/
            parent.$.layer({
                title: false,
                area: ['340px', 'auto'],
                border: [5, 0.3, '#000'],
                shade: [0.5, '#000'],
                closeBtn:false,
                time: 2,
                fix: true,
                btns: 0,
                fadeIn: 300,
                dialog: {
                    type: 1,
                    msg: info
                },
                success: function(){
                    //layer.shift('top', 200); //鍙充笅瑙掑脊鍑猴紝400姣閫熺巼
                },
                end: function(){
                    //eval(fn);
                    if(typeof(fn)=="function")fn();
                }
            });
            break;
    }



}
function alertz(msg)
{
    alerts(msg,0,"");
    return false;
}

function confirm(msg,yesfunction,nofun)
{
    layer.confirm(msg, function(){
            if(typeof(yesfunction)=="function")yesfunction();
            layer.closeAll();
        },
        function(){
            if(typeof(nofun)=="function")nofun();
        }
    );
}
var poplayerobj;
//寮瑰嚭灞�
function poplayer(title,src,width,height,fn,closebtn)
{
    poplayerobj=parent.$.layer({
        type:2,
        title: title==""?false:title,
        area: [width==""?'auto':width, height==""?'auto':height],
        border: [2, 0.3, '#000'],
        shade: [0.5, '#000'],
        closeBtn: [0, closebtn=="no"?false:true],
        fix: true,
        fadeIn: 300,
        btns:0,
        success:function(datas){

        },
        iframe: {
            src: src/*,
						ok: function(datas){
							if(typeof(datas)=="object")//杩斿洖鐨勬槸闈炴甯告暟鎹紝鍙兘鏄瘂"info":"\u767b\u9646\u8d85\u65f6\uff0c\u8bf7\u91cd\u65b0\u767b\u9646!","status":0,"url":""}
							{
								layer.close(poplayerobj);
								alert2url(datas["info"],datas["status"],datas["url"]);
							}
							else
							{
								if($(".Validform").size()>0)
								{
									if(typeof(state2validate)!='undefined')
									{
										state2validate();
									}
									else
									{
										alert("椤甸潰鏈塿alidation闇€姹傦紝浣唙alidation.js娌℃湁寮曞叆");
									}
								}
							}
						}*/
        },
        end: function(){
            if(typeof(fn)=="function")fn();
            layer.close(poplayerobj);
        }
    });
}


//*********************************************************
//鍏ㄩ€�
//*********************************************************
function articleall(inputname){
    var sid=document.getElementsByName(inputname+'[]');
    for(var i=0;i<sid.length;i++){
        //*********************************************************
        //閫変腑澶嶉€夋
        //*********************************************************
        sid[i].checked=true;}
}
//*********************************************************
//鍙嶉€�
//*********************************************************
function articlealls(inputname){
    var sid=document.getElementsByName(inputname+'[]');
    for(var j=0;j<sid.length;j++){
//*********************************************************
//澶嶉€夋閫変腑
//*********************************************************
        if(sid[j].checked==true)
        {
            sid[j].checked=false;
        }
        else
        {
            sid[j].checked=true;
        }
    }
}