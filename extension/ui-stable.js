// ==UserScript==
// @name         Plugin Loader UI
// @namespace    https://lstv.ml/
// @version      0.5.1
// @description  Adds an UI to quickly manage plugins. Comes with 5 cool presets.
// @author       LSTV
// @match        https://turbowarp.org/editor*
// @match        *://packager.turbowarp.org/*
// @icon         https://www.google.com/s2/favicons?domain=turbowarp.org
// @grant        none
// @license MIT
// ==/UserScript==


/*
Changelog (latest):
- Lightmode support
- Replaced RequestNetwork component with much more modern fetchSync
- Cleaned code and adapted to ES 2022 standards
- Fixed most found bugs
- Fixed and enhanced UI

Released Tuesday 30, August 2022 by LSTV at 11:41PM (Czechia)

Copyright (c) under www.LSTV.fun || LSTV.ml

License: MIT.
You are free to distribute, modify, or sell this code without written permission by the author,
with the only condition being: do not distribute without any change to the code under your own name without mention to LSTV.
May make a request to an API hosted by LSTV APIs, ExtraGon, or Github.
*/

const presets=[
    {
        name:"UtilsV2",
        id:10,
        isRemote:true,
        url:"https://raw.githubusercontent.com/lukas-studio-tv/another-lstv-proxy/main/docs/ws-clone/ml/cdn/dock-snapshot-12422/uploaded-raw-content/hctUsfD2qeUtilsV2.js",
        color:"lime"
    },
    {
        name:"GameJoltAPI [Beta]",
        id:11,
        isRemote:true,
        url:"https://lukas-studio-tv.github.io/another-lstv-proxy/ws-clone/ml/cdn/dock-snapshot-12422/uploaded-raw-content/Xzy5wV6Q9WGJ%20API.js",
        color:"#2f7f6f"},
    {
        name:"AudioStream",
        id:12,
        isRemote:true,
        url:"https://lstv.ml/cdn/dock/uploads/XzShH4Y6TbAudioStream.js",
        color:"purple"
    },
    {
        name:"JSONUtils [Link temp. broken]",
        id:13,
        isRemote:true,
        url:"b2",
        color:"#21c7ff"
    },
    {
        name:"ScratchZip [Link temp. broken]",
        id:14,
        isRemote:true,
        url:"b3",
        color:"yellow"
    }
];


var isPackager=location.host.includes("packager"),
    isLightMode,
    Q=(q='body')=>[...document.querySelectorAll(q)],S=(s='body')=>document.querySelector(s),D=()=>document,N=(e='div',o={})=>Object.assign(document.createElement(e),(typeof o=='string'?{innerHTML:o}:o));
window.S=S;window.Q=Q;window.D=D;window.N=N;



window.cPluginID="";
window.addEventListener('load',()=>{
    S().appendChild(N('style',{
        innerHTML:`
            .pltitle{background:#2d2d2d;position:absolute;top:0px;left:0px;right:0px;height:40px;}
            .plmenu{display:none;text-align:center;position:fixed;z-index:99;top:90px;left:50%;transform:translateX(-50%);border-radius:5px;border:5px solid rgba(93,93,93,.6);padding:0;padding-top:40px;user-select:none}
            .plmenuix{padding:15px;background:#111111}
            .plbutton{background:#fd4c4c;border-radius:5px;padding:10px;border:none}
            .pltextarea{resize:none;height:100px;width:90%}
            .plinput,.pltextarea{color:white;border:1px solid #2d2d2d;border-radius:5px;outline:none;background:#1e1e1e;padding:9px}
            .pl_preset{background:#333333;color:white;padding:10px;border-radius:5px;display:inline-block;cursor:pointer;margin:5px}
            .plcspan{margin-right:8px;border-radius:300px;padding:0px;width:10px;height:10px;display:inline-block;}
            [theme="light"] .plmenuix{background:#fff}
            [theme="light"] .pltitle,[theme="light"] textarea,[theme="light"] input,[theme="light"] .pl_preset{background:gainsboro;color:#000}
        `,
        className:"pluginUIStyle"
    }));
    window.plRefreshPluginPresets=()=>{
        let container=S(isPackager?".pk_preset_c":".pl_preset_c");
        container.innerHTML="";
        presets.forEach(e=>{
            let button=N('div',{
                className:'pl_preset',
                innerHTML:isPackager?`<i class="bi bi-${(twp_ta.value.includes(e.url.substring(3,e.url.length))?"trash-fill":"plus-square")}" style="color:${e.color};margin-right:7px;"></i>${e.name}`:`<span class="plcspan" style="background:${e.color}"></span>${e.name}`
            })
            button.onclick=function(){ //need to set this separately so we can get a reference to the button inside
                if(isPackager){
                    addTWPPlugin(e,this);return
                }
                loadPlugin(e);
            };
            container.appendChild(button)
        });
    }
    let fetchSync=(...a)=>b=>{let d=d=>{a[0]=a[1]?.bypass_cache?(a[0]+(a[0].includes('?')?'&':'?')+'cache='+btoa(Date.now()/(Math.random()*10)).replaceAll('=','')):a[0];a[0]=a[0].includes('://')||a[1].local?a[0]:'http://'+a[0];let ts=Date.now();try{fetch(...a).then(q=>q).then(async q=>{let _t="string"==typeof b?b:"text";d(_t=='ping'?(q.ok?(a[1]?.ping?(a[1]?.ping==await q.text()?Date.now()-ts:!1):Date.now()-ts):!1):await q[_t](),Date.now()-ts)}).catch(w=>d(!1))}catch(e){d(!1)}};return"string"==typeof b?a=>{d(a)}:void d(b)},fetchAsync=(...c)=>async(a)=>new Promise(b=>{fetchSync(...c)(a)(a=>{b(a)})});
    if(!isPackager){
        var plbtn = N('div',{
            className:"menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB",
            innerHTML:'<div><span>Plugins</span></div>'
        }),
        elm=N('div',{
            className:"plmenu",
            innerHTML:`
            <h1 class="pltitle">Load a custom plugin</h1>
            <div class="plmenuix"><br>
            <h3>Option 1: Select one of your presets to load:</h3><div class="pl_preset_c"></div><br><br>
            <h3>Option 2: Paste the extension code here:</h3><br><textarea class='pltextarea'></textarea><br><button onclick='window.loadPlugin(S(".pltextarea").value)' class='plbutton' style="width:92%;">Load</button><br><br>
            <h3>Option 3: Or load from an URL</h3><br><br><input type='text' class='plinput' placeholder='Enter an plugin URL'><button onclick='window.loadPlugin("[R]"+S(".plinput").value)' class='plbutton'>Load</button><br><br><button onclick='S(".plmenu").style.display="none";' class='plbutton' style="color:black;background:white;">Cancel</button></div></div>`
        })
        window.loadPlugin = function(pl) {
            if (typeof pl=='object'&&pl.isRemote) {
                window.cPluginID=pl.url;
                fetchSync(pl.url,{bypass_cache:true,local:true})('text')(r=>{
                    loadPlugin(r);
                })
            }else{
                try{
                    S().appendChild(N('script',pl))
                    console.log('just done the magic!')
                    S(".plmenu").style.display="none";
                    alert("Plugin loaded. You should now see it in your blocks pallete");
                }catch(e){
                    alert("Error loading plugin:\n"+e)
                }
            }
        }
        setTimeout(function() {
            S("div.menu-bar_file-group_1_CHX").appendChild(plbtn);
            plbtn.onclick=(e)=>{
                S(".plmenu").style.display="block";
                S(".plinput").value="";
                S(".pltextarea").value="";
                plRefreshPluginPresets();
            }
            document.body.append(elm);
        },800);
    }else{
        setTimeout(function(){
            var plcat=`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"><div class="card svelte-1qy2cex" style="border-top: 6px solid #F00"><div><h2>Plugins [BETA]</h2><i>Added by the plugin loader UI</i><br>You can add more presets in the script's preset configuration.<br>With this addon you can simply add or remove plugins!<br>+ It (should) save your plugins for this project - even after refresh and with offline access.<br><br><div class="pk_preset_c"><i>Your presets should be displayed here.</i></div></div></div>`;
            window.plAppendToPackager=function(){
                if(!Q(".card")[4]){setTimeout(function(){plAppendToPackager()},250)}else{Q(".card")[4].outerHTML+=plcat;window.twp_ta=Q("textarea")[2];
                    //Project load event!!
                    if(/start\:(.*?)raw\.git(.*?)\]|start\:(.*?)lstv\.ml\/cdn(.*?)\]/gis.test(twp_ta.value)){
                        alert("You are seeing this message because it seems like you have used an older version of the plugin UI on this project.\nBecause i am now storing the plugins in a bit better way that also supports updates, i had to reset the plugins for all projects.\nDon't worry, just select the ones you need again in the plugins category!\n\nIt shoud now actually appear :p");
                        twp_ta.value='';
                    }
                if(!twp_ta.value.includes("/* The plugin UI")){twp_ta.value+="/* The plugin UI will add plugins here! Feel free to add your own code, but make sure you do not interrupt the comment blocks indicating plugin start and plugin end.*/\n\n\n"};window.plRefreshPluginPresets();}
            }
            plAppendToPackager();
            window.addTWPPlugin=function(plugin,element){
                window.cPluginSRC=element.querySelector("i");
                window.cPluginID='__plugin__'+plugin.id;
                if(twp_ta.value.includes(cPluginID)){
                    removeTWPPlugin(cPluginID);
                }else{
                    fetchSync(plugin.url,{bypass_cache:true,local:true})('text')(r=>{
                        twp_ta.value+="/*![loader][start:"+cPluginID+"]!*/"+r+"/*![loader][end:"+cPluginID+"]!*/";
                        var evt=new Event('input');twp_ta.dispatchEvent(evt);//Simulates manual input to force saving the plugin into the current project
                        cPluginSRC.classList.remove("bi-plus-square");
                        cPluginSRC.classList.add("bi-trash-fill");
                    })
                }
            }
            window.removeTWPPlugin=function(id){
                Q("textarea")[2].value=Q("textarea")[2].value.replace(new RegExp('\\/\\*\\!\\[loader\]\\[start\\:'+id+'\\]\\!\\*\\/(.*?)\\/\\*\\!\\[loader\]\\[end\\:'+id+'\\]\\!\\*\\/', 'is'),"");
                cPluginSRC.classList.add("bi-plus-square");
                cPluginSRC.classList.remove("bi-trash-fill");
            }
        },2400);
    }
})
