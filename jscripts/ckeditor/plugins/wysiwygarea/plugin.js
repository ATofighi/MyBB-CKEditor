﻿
(function(){CKEDITOR.plugins.add('wysiwygarea',{init:function(editor){if(editor.config.fullPage){editor.addFeature({allowedContent:'html head title; style [media,type]; body (*)[id]; meta link [*]',requiredContent:'body'});}
editor.addMode('wysiwyg',function(callback){var src='document.open();'+
(CKEDITOR.env.ie?'('+CKEDITOR.tools.fixDomain+')();':'')+'document.close();';src=CKEDITOR.env.air?'javascript:void(0)':CKEDITOR.env.ie?'javascript:void(function(){'+encodeURIComponent(src)+'}())':'';var iframe=CKEDITOR.dom.element.createFromHtml('<iframe src="'+src+'" frameBorder="0"></iframe>');iframe.setStyles({width:'100%',height:'100%'});iframe.addClass('cke_wysiwyg_frame cke_reset');var contentSpace=editor.ui.space('contents');contentSpace.append(iframe);var useOnloadEvent=CKEDITOR.env.ie||CKEDITOR.env.gecko;if(useOnloadEvent)
iframe.on('load',onLoad);var frameLabel=editor.title,frameDesc=editor.lang.common.editorHelp;if(frameLabel){if(CKEDITOR.env.ie)
frameLabel+=', '+frameDesc;iframe.setAttribute('title',frameLabel);}
var labelId=CKEDITOR.tools.getNextId(),desc=CKEDITOR.dom.element.createFromHtml('<span id="'+labelId+'" class="cke_voice_label">'+frameDesc+'</span>');contentSpace.append(desc,1);editor.on('beforeModeUnload',function(evt){evt.removeListener();desc.remove();});iframe.setAttributes({'aria-describedby':labelId,tabIndex:editor.tabIndex,allowTransparency:'true'});!useOnloadEvent&&onLoad();if(CKEDITOR.env.webkit){var onResize=function(){contentSpace.setStyle('width','100%');iframe.hide();iframe.setSize('width',contentSpace.getSize('width'));contentSpace.removeStyle('width');iframe.show();};iframe.setCustomData('onResize',onResize);CKEDITOR.document.getWindow().on('resize',onResize);}
editor.fire('ariaWidget',iframe);function onLoad(evt){evt&&evt.removeListener();editor.editable(new framedWysiwyg(editor,iframe.$.contentWindow.document.body));editor.setData(editor.getData(1),callback);}});}});function onDomReady(win){var editor=this.editor,doc=win.document,body=doc.body;var script=doc.getElementById('cke_actscrpt');script&&script.parentNode.removeChild(script);script=doc.getElementById('cke_shimscrpt');script&&script.parentNode.removeChild(script);if(CKEDITOR.env.gecko){body.contentEditable=false;if(CKEDITOR.env.version<20000){body.innerHTML=body.innerHTML.replace(/^.*<!-- cke-content-start -->/,'');setTimeout(function(){var range=new CKEDITOR.dom.range(new CKEDITOR.dom.document(doc));range.setStart(new CKEDITOR.dom.node(body),0);editor.getSelection().selectRanges([range]);},0);}}
body.contentEditable=true;if(CKEDITOR.env.ie){body.hideFocus=true;body.disabled=true;body.removeAttribute('disabled');}
delete this._.isLoadingData;this.$=body;doc=new CKEDITOR.dom.document(doc);this.setup();if(CKEDITOR.env.ie){doc.getDocumentElement().addClass(doc.$.compatMode);editor.config.enterMode!=CKEDITOR.ENTER_P&&this.attachListener(doc,'selectionchange',function(){var body=doc.getBody(),sel=editor.getSelection(),range=sel&&sel.getRanges()[0];if(range&&body.getHtml().match(/^<p>(?:&nbsp;|<br>)<\/p>$/i)&&range.startContainer.equals(body)){setTimeout(function(){range=editor.getSelection().getRanges()[0];if(!range.startContainer.equals('body')){body.getFirst().remove(1);range.moveToElementEditEnd(body);range.select();}},0);}});}
if(CKEDITOR.env.webkit||(CKEDITOR.env.ie&&CKEDITOR.env.version>10)){doc.getDocumentElement().on('mousedown',function(evt){if(evt.data.getTarget().is('html')){setTimeout(function(){editor.editable().focus();});}});}
try{editor.document.$.execCommand('2D-position',false,true);}catch(e){}
try{editor.document.$.execCommand('enableInlineTableEditing',false,!editor.config.disableNativeTableHandles);}catch(e){}
if(editor.config.disableObjectResizing){try{this.getDocument().$.execCommand('enableObjectResizing',false,false);}catch(e){this.attachListener(this,CKEDITOR.env.ie?'resizestart':'resize',function(evt){evt.data.preventDefault();});}}
if(CKEDITOR.env.gecko||CKEDITOR.env.ie&&editor.document.$.compatMode=='CSS1Compat'){this.attachListener(this,'keydown',function(evt){var keyCode=evt.data.getKeystroke();if(keyCode==33||keyCode==34){if(CKEDITOR.env.ie){setTimeout(function(){editor.getSelection().scrollIntoView();},0);}
else if(editor.window.$.innerHeight>this.$.offsetHeight){var range=editor.createRange();range[keyCode==33?'moveToElementEditStart':'moveToElementEditEnd'](this);range.select();evt.data.preventDefault();}}});}
if(CKEDITOR.env.ie){this.attachListener(doc,'blur',function(){try{doc.$.selection.empty();}catch(er){}});}
var title=editor.document.getElementsByTag('title').getItem(0);title.data('cke-title',editor.document.$.title);if(CKEDITOR.env.ie)
editor.document.$.title=this._.docTitle;CKEDITOR.tools.setTimeout(function(){editor.fire('contentDom');if(this._.isPendingFocus){editor.focus();this._.isPendingFocus=false;}
setTimeout(function(){editor.fire('dataReady');},0);if(CKEDITOR.env.ie){setTimeout(function(){if(editor.document){var $body=editor.document.$.body;$body.runtimeStyle.marginBottom='0px';$body.runtimeStyle.marginBottom='';}},1000);}},0,this);}
var framedWysiwyg=CKEDITOR.tools.createClass({$:function(editor){this.base.apply(this,arguments);this._.frameLoadedHandler=CKEDITOR.tools.addFunction(function(win){CKEDITOR.tools.setTimeout(onDomReady,0,this,win);},this);this._.docTitle=this.getWindow().getFrame().getAttribute('title');},base:CKEDITOR.editable,proto:{setData:function(data,isSnapshot){var editor=this.editor;if(isSnapshot){this.setHtml(data);editor.fire('dataReady');}
else{this._.isLoadingData=true;editor._.dataStore={id:1};var config=editor.config,fullPage=config.fullPage,docType=config.docType;var headExtra=CKEDITOR.tools.buildStyleHtml(iframeCssFixes()).replace(/<style>/,'<style data-cke-temp="1">');if(!fullPage)
headExtra+=CKEDITOR.tools.buildStyleHtml(editor.config.contentsCss);var baseTag=config.baseHref?'<base href="'+config.baseHref+'" data-cke-temp="1" />':'';if(fullPage){data=data.replace(/<!DOCTYPE[^>]*>/i,function(match){editor.docType=docType=match;return'';}).replace(/<\?xml\s[^\?]*\?>/i,function(match){editor.xmlDeclaration=match;return'';});}
data=editor.dataProcessor.toHtml(data);if(fullPage){if(!(/<body[\s|>]/).test(data))
data='<body>'+data;if(!(/<html[\s|>]/).test(data))
data='<html>'+data+'</html>';if(!(/<head[\s|>]/).test(data))
data=data.replace(/<html[^>]*>/,'$&<head><title></title></head>');else if(!(/<title[\s|>]/).test(data))
data=data.replace(/<head[^>]*>/,'$&<title></title>');baseTag&&(data=data.replace(/<head>/,'$&'+baseTag));data=data.replace(/<\/head\s*>/,headExtra+'$&');data=docType+data;}else{data=config.docType+'<html dir="'+config.contentsLangDirection+'"'+' lang="'+(config.contentsLanguage||editor.langCode)+'">'+'<head>'+'<title>'+this._.docTitle+'</title>'+
baseTag+
headExtra+'</head>'+'<body'+(config.bodyId?' id="'+config.bodyId+'"':'')+
(config.bodyClass?' class="'+config.bodyClass+'"':'')+'>'+
data+'</body>'+'</html>';}
if(CKEDITOR.env.gecko){data=data.replace(/<body/,'<body contenteditable="true" ');if(CKEDITOR.env.version<20000)
data=data.replace(/<body[^>]*>/,'$&<!-- cke-content-start -->');}
var bootstrapCode='<script id="cke_actscrpt" type="text/javascript"'+(CKEDITOR.env.ie?' defer="defer" ':'')+'>'+'var wasLoaded=0;'+'function onload(){'+'if(!wasLoaded)'+'window.parent.CKEDITOR.tools.callFunction('+this._.frameLoadedHandler+',window);'+'wasLoaded=1;'+'}'+
(CKEDITOR.env.ie?'onload();':'document.addEventListener("DOMContentLoaded", onload, false );')+'</script>';if(CKEDITOR.env.ie&&CKEDITOR.env.version<9){bootstrapCode+='<script id="cke_shimscrpt">'+'window.parent.CKEDITOR.tools.enableHtml5Elements(document)'+'</script>';}
data=data.replace(/(?=\s*<\/(:?head)>)/,bootstrapCode);this.clearCustomData();this.clearListeners();editor.fire('contentDomUnload');var doc=this.getDocument();try{doc.write(data);}catch(e){setTimeout(function(){doc.write(data);},0);}}},getData:function(isSnapshot){if(isSnapshot)
return this.getHtml();else{var editor=this.editor,config=editor.config,fullPage=config.fullPage,docType=fullPage&&editor.docType,xmlDeclaration=fullPage&&editor.xmlDeclaration,doc=this.getDocument();var data=fullPage?doc.getDocumentElement().getOuterHtml():doc.getBody().getHtml();if(CKEDITOR.env.gecko&&config.enterMode!=CKEDITOR.ENTER_BR)
data=data.replace(/<br>(?=\s*(:?$|<\/body>))/,'');data=editor.dataProcessor.toDataFormat(data);if(xmlDeclaration)
data=xmlDeclaration+'\n'+data;if(docType)
data=docType+'\n'+data;return data;}},focus:function(){if(this._.isLoadingData)
this._.isPendingFocus=true;else
framedWysiwyg.baseProto.focus.call(this);},detach:function(){var editor=this.editor,doc=editor.document,iframe=editor.window.getFrame();framedWysiwyg.baseProto.detach.call(this);this.clearCustomData();doc.getDocumentElement().clearCustomData();iframe.clearCustomData();CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);var onResize=iframe.removeCustomData('onResize');onResize&&onResize.removeListener();iframe.remove();}}});function restoreDirty(editor){if(!editor.checkDirty())
setTimeout(function(){editor.resetDirty();},0);}
function iframeCssFixes(){var css=[];if(CKEDITOR.document.$.documentMode>=8){css.push('html.CSS1Compat [contenteditable=false]{min-height:0 !important}');var selectors=[];for(var tag in CKEDITOR.dtd.$removeEmpty)
selectors.push('html.CSS1Compat '+tag+'[contenteditable=false]');css.push(selectors.join(',')+'{display:inline-block}');}
else if(CKEDITOR.env.gecko){css.push('html{height:100% !important}');css.push('img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}');}
css.push('html{cursor:text;*cursor:auto}');css.push('img,input,textarea{cursor:default}');return css.join('\n');}})();CKEDITOR.config.disableObjectResizing=false;CKEDITOR.config.disableNativeTableHandles=true;CKEDITOR.config.disableNativeSpellChecker=true;CKEDITOR.config.contentsCss=CKEDITOR.getUrl('contents.css');