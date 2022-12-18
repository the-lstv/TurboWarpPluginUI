// ==UserScript==
// @name         TurboLoader
// @namespace    https://lstv.fun/
// @version      2
// @description  An an UI to quickly manage plugins, addons and themes.
// @author       LSTV
// @match        *://turbowarp.org/editor*
// @match        *://packager.turbowarp.org/*
// @icon         https://www.google.com/s2/favicons?domain=turbowarp.org
// @grant        none
// @license MIT
// ==/UserScript==


/*
Changelog (latest):
- New responsive UI (still experimental), upgraded few elements of the overall TW UI
- Upgraded loading method, + now proper plugin CDN with offline loading and version checking!
- 

Released Tuesday 30, August 2022 by LSTV at 11:41PM (Czechia)

Copyright (c) under www.LSTV.fun || LSTV.ml

License: MIT.
You are free to distribute, modify, or sell this code without written permission by the author,
with the only condition being: do not distribute without any change to the code under your own name without mention to LSTV.
May make a request to an API hosted by LSTV APIs, ExtraGon, or Github.
*/


var isPackager=location.host.includes("packager"),
repo='https://raw.githubusercontent.com/lukas-studio-tv/TurboWarpPluginUI/main/';

let Content={
    plugins:[
        {
            name:"Utils V2",
            id:10,
            description:`Multi-purpose plugin that fills many of the holes that
Scratch has. Adds many new operators, allows selecting
and reading files, fetching sites, executing scripts, adding
styles, changing cursors, rendering text/images and waay
more.`,
            color:"#507750",
            isRemote:true,
            latestMirror:"https://raw.githubusercontent.com/lukas-studio-tv/another-lstv-proxy/main/docs/ws-clone/ml/cdn/dock-snapshot-12422/uploaded-raw-content/hctUsfD2qeUtilsV2.js"
        },
        {
            name:"GameJolt API",
            id:11,
            description:`GJ API wrapper made for Scratch!
Allows you to get GJ profile details, add trophies,
use scoreboards, cloud storage and more cool features
by GameJolt for your game.`,
            color:"#2F7F6F",
            isRemote:true,
            latestMirror:"https://lukas-studio-tv.github.io/another-lstv-proxy/ws-clone/ml/cdn/dock-snapshot-12422/uploaded-raw-content/Xzy5wV6Q9WGJ%20API.js"
        },
        {
            name:"AudioStream",
            id:12,
            description:`Ever tought that the default audio blocks in Scratch are
just too weak? Fear no more with theese advanced ones!
You can now play audio from a file, skip in time,
play/pause, add filters, and speed up the song.
It has everything that Scratch does and more.`,
            color:"#A832A8",
            isRemote:true,
            latestMirror:"https://lstv.ml/cdn/dock/uploads/XzShH4Y6TbAudioStream.js"
        },
        {
            name:"JSONUtils",
            id:13,
            description:`JSON is amazing, simple, and powerfull.
Are you tired of lists in scratch and need something more?
JSONUtils got you covered!
Store better lists with keys, parse or generate JSON code,
and save game data for each user using localstorage.`,
            color:"#21C7FF",
            isRemote:true,
            latestMirror:""
        },
        {
            name:"ScratchZIP",
            id:14,
            description:`A plugin that adds full ZIP capability to scratch using
blocks.
Can create, compress & read ZIP archives using
interactive blocks.`,
            color:"#FEE75C",
            isRemote:true,
            latestMirror:""
        },
        {
            name:"OverlayGL",
            id:15,
            description:`Plugin for rendering powerful overlays.
For example, play YouTube or local videos, draw HTML,
view some websites, use code editors, unleash your
creativity.`,
            color:"#FF6A6A",
            isRemote:true,
            latestMirror:""
        },
        {
            name:"SimplyText",
            id:16,
            description:`Ever tought of the Scratch’es lack of any proper text
rendering? This plugin is for you then!
No more slow text draw engines!
It allows you to instantly render text, in any font and style.
Extended and upgraded version of the text block from
UtilsV2.`,
            color:"#161616",
            isRemote:true,
            latestMirror:""
        },
        {
            name:"QuickSand",
            id:17,
            description:`Need precise on-time calculations or graphics?
            Or feel like your game is just way too slow?
            The QuickSand engine allows you to add components
            that run outside of the ScratchVM so they aren’t limited by
            it. Perfect for, for example, rythm games, that need precise
            movement and images drawing. `,
            color:"linear-gradient(158.04deg, #6AC1FF 14.37%, #C349D7 87.19%)",
            isRemote:true,
            latestMirror:""
        },
        {
            name:"Turbocord",
            id:18,
            description:`This plugins allows you to integrate Discord APIs with
            your Scratch project. This means webhooks,
            OAuth, and with ARC also Rich Presence and bots.
            [ preview only at this moment ]`,
            color:"linear-gradient(156.38deg, #5865F2 15.21%, #2E38A8 86.57%)",
            isRemote:true,
            latestMirror:""
        },
        {
            name:"FetchAPI",
            id:19,
            description:`Fetch client (like fetchSync, Ajax or xhr), but for Scratch.
            Allows you to download/fetch/send data over to any
            server or URL of your choice.
            COMES WITH A FREE CORS-BYPASS PROXY!
            Features: GET, POST, PUT, DELETE etc, custom headers,
            ping and more.`,
            color:"#D08900",
            isRemote:true,
            latestMirror:""
        },
    ],
    themes:[
        {
            name:"AMSTheme",
            id:0,
            description:`Minimalistic, precise theme inspired by AMS studio.`,
            iconTransparency:false,
            color:"#151F0D",
            source:""
        },
    ],
    addons:[
        {
            name:"Horizontal sprite menu",
            description:"Converts your traditional grid menu to a compact horizontal one.",
            screenshots:[],
            main:()=>{
                //:sandbox
            }
        }
    ]
}

function TurboWarp(){
if(!O().has('#plui'))O().add(N('div',{id:'plui',className:'plmenu'}));
window.plTab="plugins";
window.setTab=function(t){
    S(O(".pltab_"+window.plTab),{display:"none"});
    S(O(".pltab_"+t),{display:"block"});
    window.plTab=t;
}
O('#plui').set([
    N('div',{className:'plheader',innerHTML:'<h4>TurboLoader</h4>'}),
    N('div',{className:'plcontent',inner:[
        N('div',{className:'pltabs',inner:[
            N('div',{className:'pltab active',innerHTML:'Plugins'}),
            N('div',{className:'pltab',innerHTML:'Addons'}),
            N('div',{className:'pltab',innerHTML:'Themes'})
        ]}),
        N('div',{className:'pltabc pltab_plugins',inner:[
            N('div',{className:'plist'})
        ]}),
        N('div',{className:'pltabc pltab_addons',inner:[
            N("div",{inner:[N("div",{inner:[
                N("img",{style:"width:140px;margin-bottom:15px",src:"https://ik.imagekit.io/3dicons/tr:w-200,h-200/v1/dynamic/color/tool-dynamic-color.png"}),
                N("h1",{style:"font-weight:900",innerHTML:"Sorry!"}),
                N("span",{style:"color:#868686",innerHTML:"I still need to polish a few<br>things around here.<br>I’ll let you know when you can enter!"})
            ]})],style:"display:flex;align-items:center;justify-content:center;text-align:center;height:100%"})
        ]}),
        N('div',{className:'pltabc pltab_themes',inner:[
            N('div',{className:'plist',inner:[
                //...
            ]}),
        ]}),
        N('div',{className:'plbuttonbar',inner:[
            N('button',{attr:['tw'],onclick:()=>{O(".plmenu").classList.remove("open")},innerHTML:"Close",style:S({background:'#fff',color:'#000'})})
        ]})
    ]}),
])
O(".pltab_themes").innerHTML=O(".pltab_addons").innerHTML//temporary, and i didnt use .set() because it for some reason steals the content instead of copying
Q('#plui .pltab').forEach(t=>t.onclick=function(){
    Q('#plui .pltab').map(e=>e.classList[e==this?'add':'remove']('active'));
    setTab(this.innerText.trim().toLowerCase())
})

//S(O('#plui'),{display:'block'})



O('.pltab_plugins .plist')?.set?.(Content.plugins.map(p=>{
    return N('div',{
        className:'plcard',
        inner:[
            N('div',{
                className:'plbanner',
                style:S({
                    background:p.color
                }),
                inner:[
                    N('img',{
                        attr:{
                            draggable:'false'
                        },
                        className:'plicon',
                        src:repo+'/data/plugin_resources/'+p.id+'.svg'
                    })
                ]
            }),
            N('h4',p.name),
            N('span',{innerHTML:p.description,style:S({
                "font-size":'10px'
            })}),
            N('div',{className:'plbuttonbar',inner:[
                (p.latestMirror?N('button',{attr:['tw','ls','fluent'],innerHTML:"Install",onclick:()=>installPlugin(p.latestMirror)}):N('button',{attr:['tw','ls','fluent','ls-gray'],style:S({background:'#444',color:'#fff'}),innerHTML:"Soon"}))
            ]})
        ]
    })
}))

async function installPlugin(url){
    //Checks versions, manages locally downloaded copies and downloads them.
    var m=modal({loading:!0,title:"Installing plugin",content:"Checking for plugin updates..."}),v;
    fetchSync(url+"/@version")("json")(async(d,p)=>{
        if(!d){
            m.element.get("span>span").set("Failed to check version")
        }
        if(window.localStorage["Plugin_"+btoa(url)]){
            if(!d){
                m.close();
                if(!await confirm("Couldn't check for updates of this plugin, but you have access to it offline.\nDo you want to load the offline version? (May be outdated)"))return;
            }
            await addPlugin(JSON.parse(localStorage["Plugin_"+btoa(url)])?.code);
        }else{
            let pl=await fetchAsync(url)("text");
            if(pl){
                localStorage["Plugin_"+btoa(url+"?v="+d?.version+"&cc="+(Math.round(Math.random()*9000)))]=JSON.stringify({version:d?.version,code:pl});
            }else{
                m.close();
                m=await alert("Couldn't download this plugin and there isn't a offline version available.\nPlease check your internet connection!")
            }
        }
    })

}
function addPlugin(code){
    //Actually imports the plugin.
    return new Promise((r,e)=>O().add(N("script",{innerHTML:code,onload:()=>{alert("The plugin was loaded sucessfully.\nCheck out your block pallete!");r()},onerror:e})));
}

setTimeout(() => {
    /*Adds the plugin menu button*/O("div.menu-bar_file-group_1_CHX").add(N("div",{className:"plbutton menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB",innerHTML:`<div><span>Plugins<div style=display:none class=plupdateind><h1 style=font-weight:900>NEW UPDATE</h1><span style=color:#868686>Good news! You got the<br>new update of TurboLoader!<br>Check it out!</span><img style=top:-35px;right:-45px;width:100px src="https://ugc.lstv.ml/sparkle_2.png?q2"><img style=bottom:-20px;left:-40px;width:80px src="https://ugc.lstv.ml/sparkle_1.png?q2"></div></span></div>`,onclick:()=>{O(".plmenu").classList.add("open");window.localStorage.updateChecked="true";O(".plupdateind").style.display="none"}}))
    if(!window.localStorage.updateChecked){O(".plupdateind").style.display="block"}
    setTab("plugins");
}, 800);
let d=()=>{
    document.documentElement.style.setProperty('--vw-scale', `${0.002*window.innerWidth}`);
}
d();
window.addEventListener('resize',d);


/*
    Following is just CSS for the UI
*/
O('#plugin_loader_styles').set(N('style',`
@import url('https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900');
@import url('https://cdn.lstv.ml/ls.css');

[ls],[ls-modal]{font-family:'Rubik',sans-serif}
[dialog_body],[ls-modal-nofilter]{min-height:85px;font-size:16px}
[dialog_body] span{word-break:break-word}
:root{
  --tw-color:#E44444;
  --accent:#E44444;--accent-tr:#E4444480;--accent-dark:#872a2a;--lstv-yellow:#FFE109;--lstv-red:#FF2828;--lstv-blue:#00D1FF
}

.plheader{display:flex;align-items:center;padding:0 12px;background:#fff1;position:absolute;top:0px;left:0px;right:0px;height:35px}
.plmenu{box-shadow:0 0 0 40vw #0006;background:#181818;color:#fff;font-family:'Rubik',sans-serif;width:765px;height:450px;display:none;position:fixed;z-index:10000;top:50%;left:50%;transform:translateX(-50%) translateY(-50%) scale(calc(max(1,min(1.3,var(--vw-scale))) - 0.2));border-radius:12px;border:3px solid #62626231;padding:0;padding-top:40px;overflow:hidden}
.plmenu h4{line-height:16px}
.plcontent{padding:15px;position:absolute;bottom:0;top:35px;right:0;left:0}
button[tw] {
    border: none;
    outline: none;
    border-radius: 7px;
    padding: 4px 15px;
    box-shadow: inset 0 0 0 2px #0006;
    font-size: 12px;
    min-width: 72px;
    background: var(--tw-color);
    color: #fff;
    cursor: pointer;
}
.plcard button[tw]{padding:6px 15px;width:90%}
.pl_preset{background:#333333;color:white;padding:10px;border-radius:5px;display:inline-block;cursor:pointer;margin:5px}
.plcspan{margin-right:8px;border-radius:300px;padding:0px;width:10px;height:10px;display:inline-block;}
[theme="light"] .plmenu,[theme="light"] .plcard,[theme="light"] [dialog_body]{background:#fff!important;color:#222}
[theme="light"] .plheader{background:#0001}
[theme="light"] .pltab{background:#e6e6e6}
[theme="light"] .pltab.active{background:#ffe8e8}
[theme="light"] .plupdateind{background:#fff;color:#222;box-shadow:0px 10px 40px 0 #00000042}
[theme="light"] textarea,[theme="light"] input,[theme="light"] .pl_preset{color:#222}
[theme="light"] [dialog_bottom]{background:#e3e3e3;border-top:0.1px solid #a7a7a7}
[dialog_bottom]{height:50px}
[ls-load]{width:27px;height:27px;border:7px solid var(--accent-tr);border-top-color:var(--accent)}
.plcard span{color:#999}
[theme="light"] .plcard span{color:#777}
.plmenu.open{display:block}
h1,h2,h3,h4,h5,h6{margin:0}
.pltabs{display:flex;justify-content:center;margin-bottom:10px}
.pltab{width:120px;padding:7px 0;text-align:center;margin-right:20px;position:relative;background:#151515;border-radius:70px;transition-duration:.2s;overflow:hidden;user-select:none;cursor:pointer}
.pltab:last-child{margin-right:0}
.pltab.active{background:#1F1F1F}
.pltab:after{content:"";transition-duration:.2s;position:absolute;bottom:-5px;left:35%;right:35%;height:3px;border-radius:10px;background:var(--tw-color)}
.pltab.active:after{bottom:1px}
.plcard {
    background:#131313;
    border-radius: 11px;
    width: 213px;
    height: 115px;
    position: relative;
    margin: 5px;
    box-shadow: 0 4px 5px #0005;
    padding: 9px;
    overflow: hidden;
    padding-top: 80px;
    padding-bottom: 15px;
    transition-duration: .2s;
    box-shadow: 0 4px 8px #0005, inset 0px -1px 0 0px #ffffff12;
    cursor:pointer;
    line-height:8.5px;
}
.plbanner {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    height: 70px;
    box-shadow: inset 0px -4px 17px 0 #000b, inset 0px 1px 0 0px #ffffff63;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.plbutton{
    position:relative;
}
.plupdateind{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 45px;
    padding: 20px 65px;
    background: #171717;
    box-shadow: inset 0 2px 0 0 #ffffff36, 0px 10px 40px 0 #000a;
    border-radius: 9px;
    font-family: Rubik;
    text-align: center;
    font-weight: 400;
    letter-spacing: 1px;
    z-index: 900;
}
.plupdateind:hover{
    outline:2px solid var(--tw-color)
}
.plupdateind img{
    position:absolute
}
.plist {
    display: flex;
    overflow: overlay;
    flex-wrap: wrap;
    bottom: 35px;
    top: 60px;
    position: absolute;
    padding-bottom: 50px;
}
.plicon {
    width: 32px;
    height: 32px;
    object-fit: contain;
}

/*temporary:*/
.pltab_themes,.pltab_addons{height:100%}

.pltabc{display:none}

.plbuttonbar{position:absolute;bottom:6px;right:6px;left:0;text-align:right}
.plcard .plbuttonbar{bottom:4px;right:0;left:0;text-align:center}
::-webkit-scrollbar{width:3px;height:3px}
::-webkit-scrollbar-track{background:none}
::-webkit-scrollbar-thumb{background:#ffF3;border-radius:10px}
@media(max-width:800px){.plmenu{width:520px;height:85%}}
@media(min-width:1400px){.plmenu{zoom:110%}}
@media(min-width:1600px){.plmenu{zoom:118%}}
`))
}
function TurboWarpPackager(){

}


/*
    You have reached the part where it all loads
*/


/*TinyFramework*/var TinyFramework={Q:(e,q)=>(e?.tagName&&!q?[e]:[...(e?.tagName?e:D()).querySelectorAll(e?.tagName?!q?'*':q:typeof e=='string'?e:'*')])?.map(r=>{Object.assign(r,{isElement:!0,attr(specific=!1){let a=r.attributes,c={};Object.keys(a).map(b=>c[a[b].nodeName]=a[b].nodeValue);return specific?c[specific]:c},get:(t='*')=>O(r,t),getChildern:q=>Q(r.query()+'>'+q||'*'),child:i=>r.children[i||0],getAll:(t='*')=>Q(r,t),add:(a='')=>{if(typeof a=='string'||a?.tagName)a=[a];a.forEach(i=>r[i?.tagName?'appendChild':'append'](i));return r.self},addOnce(a){if(!O('#'+a.id))r.add(a)},setStyle:(...a)=>S(r.self,...a),getStyle:_=>S(r.self),set:(...a)=>{r.innerHTML='';return r.add(...a)},has:(...a)=>{return !!a.find(l=>r.get(l))},watch:c=>E(r,c),parent:(n=0)=>r.tagName=='BODY'?r.parentElement:(n>0?O(r.parentElement).parent(n-1):r.parentElement),self:r,path:()=>{let p=[r],i=0;while(p[p.length-1]?.tagName!='HTML'){p.push(r.parent(i));i++}return p.reverse()},query:()=>r.path().map(r=>r.tagName+(r.className?'.'+r.className.replace(/\s/g,'.'):'')+(r.id?'#'+r.id:'')).join('>'),queryPath:r.query});return r.self}),O:(...e)=>{e=e.length<1?['body']:e;return Q(...e)[0]},D:()=>document,N:(e='div',o={})=>{let n=O(Object.assign(D().createElement(e),(typeof o=='string'?{innerHTML:o}:o)));if(Array.isArray(o?.attr)){o.attr={'Array':o.attr}}if(o?.attr){Object.keys(o.attr).forEach(k=>{if(k=='Array'){o.attr[k].map(_=>n.setAttribute(_,''));return}n.setAttribute(k,o.attr[k]||'')})}if(o?.inner||o?.content){n.add(o?.inner||o?.content)}return n},S:(e,s)=>!s?!e?O():(e.id!==void 0)?getComputedStyle(e):typeof e=='string'?O(e):Object.keys(e).map(f=>f+':'+e[f]).join(';'):(Array.isArray(e)?e:!e?[O()]:[e]).forEach(m=>{m=typeof m=='string'?O(m):m;Object.assign(m.style,s)}),E:(b,c)=>{if(typeof c!='function'){let _c=c,_b=b;c=()=>{try{S(Q(_b),_c)}catch(e){}};b=O()}new (window.MutationObserver||window.WebKitMutationObserver)(r=>{c([...r[0].addedNodes].map(n=>O(n)),[...r[0].removedNodes].map(n=>O(n)))}).observe(b,{childList:!0,subtree:!0});return O(b)}}
var fetchSync=(...a)=>b=>{let d=d=>{a[0]=a[1]?.bypass_cache?(a[0]+(a[0].includes('?')?'&':'?')+'cache='+btoa(Date.now()/(Math.random()*10)).replaceAll('=','')):a[0];a[0]=a[0].includes('://')||a[1].local?a[0]:'http://'+a[0];let ts=Date.now();try{fetch(...a).then(q=>q).then(async q=>{let _t="string"==typeof b?b:"text";d(_t=='ping'?(q.ok?(a[1]?.ping?(a[1]?.ping==await q.text()?Date.now()-ts:!1):Date.now()-ts):!1):await q[_t](),Date.now()-ts)}).catch(w=>d(!1))}catch(e){d(!1)}};return"string"==typeof b?a=>{d(a)}:void d(b)},fetchAsync=(...c)=>async(a)=>new Promise(b=>{fetchSync(...c)(a)(a=>{b(a)})});
if(!window?.Globalise){window.Globalise=(...b)=>b.map(a=>typeof(a)=='string'?(()=>window[a]=window?.[a]||null)():Array.isArray(a)?a.map(v=>window[v]=window?.[v]||null):Object.keys(a).map(v=>window[v]=a[v]))};
const {S,Q,O,D,E,N}=TinyFramework;
Globalise(TinyFramework,{modal:modal,fetchSync:fetchSync,fetchAsync:fetchAsync});
function modal(opt={}){
    opt=Object.assign({
        title:"Alert",
        content:"",
        cancelable:true,
        buttons:[
            {text:"OK"},
            {text:"Cancel",color:"gray"},
        ],
        loading:false,
        use:!1
    },opt);
    let element=N("div",{
        attr:{"ls-modal":"true"},
        className:"closed",
        style:opt.style,
        onclick:e=>{if(opt.cancelable&&O(e.target).attr("ls-modal"))close()},
        inner:[!opt.use?N('div',{
            inner:[
                N('span',{
                    inner:[N("b",opt?.title?opt.title+"<br>":""),N("span",opt.content.trim())]
                }),
                N('div',{
                    inner:opt.loading?[N("div",{attr:["ls-load"]})]:opt.buttons?.map?.((b,i)=>N('button',Object.assign({attr:["ls","fluent",b.color?"ls-"+b.color:'ls-blue'],className:"btn-index-"+i,innerHTML:b.text},(b?.element||{})))),
                    attr:["dialog_bottom"]
                })
            ],
            attr:["modal_body","dialog_body"]
        }):opt.use]
    });
    let close=function(ref){element.classList.add('closed');let id=ref?.className.includes("btn-index-")?(+ref?.className.replaceAll(/[a-z-]/g,"")):void 0;opt?.onclose?.(id);return id};
    element.getAll("button").forEach(e=>e.addEventListener("click",()=>close(e)))
    O().add(element);
    setTimeout(()=>{element.classList.remove('closed')},20);
    return {
        element:element,
        close:close,
        open:()=>element.classList.remove('closed')
    }
}
//comment following if you don't want to override default methods
Globalise({alert:(m,opt={})=>new Promise((r)=>modal(Object.assign({content:m,buttons:[{text:"OK"}],onclose:r},opt))),confirm:(m,opt={})=>new Promise((r)=>modal(Object.assign({content:m,cancelable:false,buttons:[{text:"OK"},{text:"Cancel",color:"gray"}],onclose:(b)=>r(!b)},opt))),prompt:(m,opt={})=>new Promise((r)=>modal(Object.assign({content:m+"<br><input type=text ls fluent>",buttons:[{text:"OK"},{text:"Cancel"}],onclose:r},opt)))})

if(!O().has('#plugin_loader_styles'))O().add(N('div',{id:'plugin_loader_styles'}));
if(!isPackager){TurboWarp()}else{TurboWarpPackager()}
