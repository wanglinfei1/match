/**
 * Created by linfei6 on 2018/2/26.
 */
var ijax = function(url,data,cb){
  var body = document.body;
  var suffix = Math.abs((new Date()).getTime()) + '_' + Math.round(Math.random() * 1e8);
  var id = "ijax_iframe_"+suffix;
  var styleHidden = ' style="position:absolute;top:-9999px;height:0px;overflow:hidden;" ';
  //$('<iframe'+ styleHidden +'frameborder="0" name="'+id+'" id="'+id+'"></iframe>');
  var ifm = document.createElement("iframe")
  ifm.style="position:absolute;top:-9999px;height:0px;overflow:hidden;";
  ifm.setAttribute('frameborder',0);
  ifm.setAttribute('name',id);
  ifm.setAttribute('id',id);
  data.callback = 'ijax_'+suffix;
  var inputHtml = (function(data){
    var html = [];
    for(var name in data){
      var val = data[name];
      html.push('<textarea type="hidden" name="'+name+'" >'+val+'</textarea>');
    }
    return html.join('');
  })(data);
  window['ijax_'+suffix] = function(msg){
    if(typeof cb === 'function'){
      cb(msg);
    }
    setTimeout(function(){
      body.removeChild(ifm);
      body.removeChild(form);
    },1e3);
  };
  //var form = $('<form'+ styleHidden +'action="'+url+'?callback=ijax_'+suffix+'" method="post" target="'+id+'">'+inputHtml+'</form>');
  var form = document.createElement("form");
  form.style="position:absolute;top:-9999px;height:0px;overflow:hidden;";
  form.setAttribute('action',url+'?callback=ijax_'+suffix);
  form.setAttribute('method','post');
  form.setAttribute('target',id);
  form.innerHTML=inputHtml;
  body.appendChild(ifm);
  body.appendChild(form);
  form.submit();
  return {
    inputHtml: inputHtml,
    form: form,
    iframe: ifm,
    callback: window['ijax_'+suffix]
  };
}

export default ijax;
