// JavaScript Document
var document_scrollTop;//婊氬姩鏉′綅缃�
var document_last_scrollTop=0;//涓婃婊氬姩鏉＄殑鍊硷紝鐢ㄤ簬鍒ゆ柇婊氬姩鏂瑰悜
var document_scrollFangxiang="down";//婊氬姩鏂瑰悜
var window_botton_top;//婊氬姩鏉′綅缃�+椤甸潰楂樺害锛涗笅鐣屽嚭鐜版椂鐨則op鍊�
var last_for_value;
var is_allow_autoload=true; //寮€鍚嚜鍔ㄥ姞杞�
var window_height=0;
var window_width=0;
var xx=0;
var last_xx=1;
var yy=0;
var autoclosetoplinedoing=false;
$(document).ready(function(){
    //scrollmove();
    pagesize();
    $(window).scroll(function(){//婊氬姩鏉℃粴鍔ㄤ簨浠�
        if(autoclosetoplinedoing==true)
        {
            return false;
        }
        //scrollmove();
    });

    //for鏍囩锛岃嚜鍔ㄧ偣鍑诲彟涓€涓摼鎺�
    $(document).on('click', 'a[for]', function() {
        last_for_value=$(this).attr("for");
        is_allow_autoload=false;//鍏堝叧闂嚜鍔ㄥ姞杞斤紝闃叉鍗￠〉
        var afortime=setTimeout("$('#'+last_for_value).click();",950);
        setTimeout("is_allow_autoload=true;",1100);//閿氱偣鐐瑰嚮瀹屾垚鍚庯紝鍐嶅紑鍚嚜鍔ㄥ姞杞�
    });

    if(typeof(open_mousemove)!="undefined"&&open_mousemove!="")//寮€鍚紶鏍囩Щ鍔ㄤ簨浠�,鏋佹秷鑰楄祫婧�
    {
        $(document).mousemove(function (e) {
            xx=e.pageX;
            yy=e.pageY;
        });
    }
    if(typeof(open_mousemove)!="undefined"&&open_mousemove!="")//寮€鍚紶鏍囩Щ鍔ㄤ簨浠�,鏋佹秷鑰楄祫婧�
    {
        //
        $(".autoShowLeftRight").on("mousemove",function(e){

            //榛樿鍋忕Щ閲�
            var defaultleft=((window_width-$(this).width())/2);
            var newleft=defaultleft*xx/(window_width/2);
            //document.title=xx+":"+yy;
            //logs(xx);
            if(xx<window_width/4)
            {
                //document.title=xx+":"+(window_width/4);
                $(this).stop(1).animate({"left":0},500);
                //$(this).css({"left":0});
            }
            if(xx>((window_width/4)*3))
            {
                $(this).stop(1).animate({"left":(window_width-$(this).width())},500,"swing");
                //$(this).css({"left":(window_width-$(this).width())});
            }
            if((xx>window_width/4)&&(xx<((window_width/4)*3)))
            {
                $(this).stop(1).animate({"left":((window_width-$(this).width()))/2},500);
                //$(this).stop(1).css({"left":((window_width-$(this).width()))/2});
            }
        });
    }
    $(".autoShowLeftRight").on("mouseleave",function(e){
        //alert('out');
        resetbodysomethingsize();
    });

});
$(window).resize(function(){
    pagesize();
});
$.ajaxSetup ({
    cache: true //寮€鍚疉JAX鐩稿簲鐨勭紦瀛�
});
function pagesize()//椤甸潰閲嶇疆鏃�
{
    window_height=$(window).height();
    window_width=$(window).width();
    resetbodysomethingsize();
}

//閲嶇疆椤靛唴鍏冪礌澶у皬
function resetbodysomethingsize()
{
    if(window_height<600)window_height=600;
    $(".fullheightoverflow").css("height",window_height);
    $(".fullheight").each(function(index, element) {
        $(this).css({"height":window_height>$(this).outerHeight(true)?window_height:$(this).outerHeight(true)});
    });
    //鍨傜洿灞呬腑鍏冪礌
    $(".verticalcenter").each(function(index, element) {
        var newtop=(window_height-$(this).height())/2;
        $(this).css("top",newtop>0?newtop:0);
    });
    //姘村钩灞呬腑鍏冪礌
    $(".aligncenterbyleft").each(function(index, element) {
        $(this).stop(1).animate({"left":((window_width-$(this).width())/2)},1000);
    });
    //$(".fullobj").css({"width":$(window).width(),"height":($(window).width()*$(this).attr("bestheight"))/$(this).attr("bestwidth")});
}

function scrollmove()
{
    document_scrollTop=$(document).scrollTop();
    document_scrollFangxiang=(document_scrollTop-document_last_scrollTop)>=0?"down":"up";
    document_last_scrollTop=document_scrollTop;
    //document.title=document_scrollFangxiang;
    window_botton_top=document_scrollTop + $(window).height();
    lazyloadcjh();//
    parallaxscrolling();
    //$(".menu").css("top",document_scrollTop);
    if(document_scrollTop>500)//鏄剧ず鈥滃洖鍒伴《閮ㄢ€濇寜閽�
    {
        $("#goto2top").fadeIn();
    }
    else
    {
        $("#goto2top").fadeOut();
    }
    //$(".virtualsoc").css("top",window_botton_top - $(".virtualsoc").outerHeight());
    autoclosetopline();
}

/*涓婅竟缂樿嚜鍔ㄩ潬杩�*/
function autoclosetopline()
{
    if(autoclosetoplinedoing==false)
    {
        $(".autoclosetopline").each(function(index, element) {
            var thistop=$(this).css("top")=="auto"?$(this).offset().top:($(this).css("top")).replace("px","");
            var closeval=thistop-document_scrollTop;
            var top_down_close_max_val=window_height/4*3;
            var top_up_close_max_val=-window_height/4*3;
            //if((document_scrollTop>500&&closeval>50&&closeval<top_down_close_max_val&&document_scrollFangxiang=="down")||(document_scrollTop>500&&closeval>top_up_close_max_val&&closeval<0&&document_scrollFangxiang=="up"))
            if((document_scrollTop>500&&closeval>50&&closeval<top_down_close_max_val&&document_scrollFangxiang=="down"))
            {
                autoclosetoplinedoing=true;
                $("html,body").stop(1).animate({scrollTop:thistop+1},500,function(){});
                setTimeout("autoclosetoplinedoing=false;",500);
            }
        });
    }
}

function lazyloadcjh()//鎵€鏈夌€戝竷鍔犺浇浜嬩欢
{

    $(".lazyloadcjh").each(function(index, element) {
        var vconfig=$(this).attr("config");
        var scrollstatus=$(this).attr("scrollstatus");//鍔ㄤ綔鐘舵€�
        if(typeof(vconfig)!="undefined"&&vconfig!=""&&(typeof(scrollstatus)=="undefined")||scrollstatus=="")
        {
            data =(new Function("","return "+vconfig))();//杞琷son
            var thisobjtop=$(this).css("top")=="auto"?$(this).offset().top:($(this).css("top")).replace("px","");
            switch (data["type"])
            {
                case "show_style"://鏄剧ずstyle
                    if((window_botton_top + 500)>thisobjtop)//鍙姞杞藉綋鍓嶅睆鍐呯殑
                    {
                        $(this).attr("style",$(this).attr("waitload_style"));
                        //$(this).attr("scrollstatus","1");//鏍囪瘑宸茬粡瀹屾垚!
                        $(this).removeClass("lazyloadcjh");
                        //document.title=index+":"+$(this).offset().top;
                        //logs("鍔犺浇搴曢儴"+$(this).css("background-image")+"澶у浘!"+(thisobjtop)+":"+gdt_top);
                    }
                    break;

                case "show_img"://鍔犺浇鍥剧墖
                    if((window_botton_top + 200)>thisobjtop)//鍙姞杞藉綋鍓嶅睆鍐呯殑
                    {
                        //logs("鑷姩鍔犺浇浜�"+$(this).attr("waitload_src"));
                        $(this).attr("src",$(this).attr("waitload_src"));
                        $(this).removeClass("lazyloadcjh");
                    }
                    break;

                case "default2click"://鑷姩鐐瑰嚮
                    if((window_botton_top + 200)>thisobjtop&&is_allow_autoload==true)
                    {
                        $(this).click();
                        $(this).removeClass("lazyloadcjh");
                        logs("鑷姩鐐瑰嚮浜�"+$(this).text());
                    }
                    break;
            }
        }
    });
}
//婊氬姩瑙嗗樊
function parallaxscrolling()
{


    /*$(".parallaxscrolling").each(function(index, element) {
        var vconfig=$(this).attr("config");
        data =(new Function("","return "+vconfig))();//杞琷son
        var default_top=data["defaulttop"];
        //var thisobjtop=$(this).css("top")=="auto"?$(this).offset().top:($(this).css("top")).replace("px","");
        //var gdt_top=document_scrollTop + 500;//棰勫姞杞�500px
        if((document_scrollTop+500)>=default_top && (document_scrollTop-500)<=default_top)
        {
            logs("寮€濮嬫粴鍔ㄨ宸�"+default_top+":"+(document_scrollTop+500));
            var newtop=(default_top-((document_scrollTop-default_top)*2)-800);
            if(newtop<data["mintop"])newtop=data["mintop"];
            $(this).css("top",newtop);
        }
        else
        {

        }

    });*/

}
function logs(s)
{
    //console.clear()
    console.info(s);
    $(".virtualsoc").text(s);
}

function tooltips(thiss,txt)
{
    layer.tips(txt, thiss, {
        guide: 3,
        style: ['background-color:#0a7a4c; color:#c7d6ca', '#0a7a4c'],
        time: 3
    });
}


var votecheck=new Array();
function chkvote()
{
    isok=true;
    if(votecheck.length>0)
    {
        $.each(votecheck,function(i,obj){
            objarray=obj.split("||");
            if(objarray[0]=="radio")
            {
                if($('input:radio[name='+objarray[1]+']:checked').val()==null){
                    alert("璇烽€夋嫨鈥�"+objarray[2]+"鈥濈殑閫夐」锛�");
                    $('input:radio[name='+objarray[1]+']:first').focus();
                    isok=false;
                    return false;
                }
            }
            if(objarray[0]=="checkbox")
            {
                if($('input:checkbox[class='+objarray[1]+']:checked').size()<1){
                    alert("璇烽€夋嫨鈥�"+objarray[2]+"鈥濈殑閫夐」锛�");
                    $('input:checkbox[class='+objarray[1]+']:first').focus();
                    isok=false;
                    return false;
                }
            }
        });
    }
    return isok;
    //return confirm("纭畾瑕佹彁浜ら€夋嫨鐨勫唴瀹瑰悧");
}

function readCookie(name)

{

    var cookieValue = "";

    var search = name + "=";

    if(document.cookie.length > 0)

    {

        offset = document.cookie.indexOf(search);

        if (offset != -1)

        {

            offset += search.length;

            end = document.cookie.indexOf(";", offset);

            if (end == -1) end = document.cookie.length;

            cookieValue = unescape(document.cookie.substring(offset, end))

        }

    }

    return cookieValue;

}

// Example:

// writeCookie("myCookie", "my name", 24);

// Stores the string "my name" in the cookie "myCookie" which expires after 24 hours.

function writeCookie(name, value, hours)

{

    var expire = "";

    if(hours != null)

    {

        expire = new Date((new Date()).getTime() + hours * 3600000);

        expire = "; expires=" + expire.toGMTString();

    }

    document.cookie = name + "=" + escape(value) + expire;

}

function  DateDiff(sDate1,  sDate2){    //sDate1鍜宻Date2鏄�2006-12-18鏍煎紡
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //杞崲涓�12-18-2006鏍煎紡
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //鎶婄浉宸殑姣鏁拌浆鎹负澶╂暟
    return  iDays
}