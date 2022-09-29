/*
Based on SheepTester's Utilities plugin.
Tested on TurboWarp.
Made by LSTV | License MIT
Verzion: 2.23.7 (1.6 2022)
First update: 1/12/2021

List of changes made:
- Rewritten to work as unsandboxed plugin (Allowing access to window and vm)
  (That means that you now have to use ?plugin_load=url in SheepTester's GUI, or paste this code to console to load into different mods.)
  (Or use my TurboWarp plugin loader UI, that constains this and more extensions in presets and auto updates.)

- Added blocks (cca 22);
	Basic blocks;
    - String (Just returns whatewer you put in. Usefull only to make your code smaller and cleaner.)
	- isValidJson (Boolean that returns true if the JSON entered is valid.)
	- consoleLog (Logs something to conosle. Supports info/error/warning/aHTXAPI. aHTXAPI is used to comunicate between Android app and HTML.)
	- ProjectLocationURL (Gets the current URL)
	- Set/Get temporary variable (Returns/Changes a temporary variable)
	- setCursor (Changes cursor. none= hidden, auto= visible and so on. Can be used for importing custom cursors from data URI.)
	- Custom CSS (Adds CSS style. Not very usefull in most cases.)
	- Eval (Runs JavaScript. Returns errors to "last eval/js error")
	- EvalString (Runs as JS function and returns the output. (example: return 'hi' returns hi.) Returns errors to "last eval/js error")
	- last eval/js error (When an error occurs in eval block, it gets written here.)
	
	File blocks;
	- requestOpenFile (Shows text file upload dialog, then returns its data to 'fileResult'. Supports setting custom CSS)
		- fully customizable
	- openFile (Opens file picker. Returns it's text content)
	- openFileData (Opens file picker, then converts the content to data URI - so it can be used to import images, audio, etc.)
	- fileResult (The file result)
	  + you can select wich files to allow - for example image/* only allows image files.
	- fileName (The name of the picked file)
	- downloadFile (Tries to download a file with content and name (example: 'hi', 'hi.txt'))
	
	Runtime blocks:
	- greenFlag (Calls the green flag.)
	- setUsername (Changes the username.)
	
	[EXPERIMENTAL] Costume blocks:
	Introduction: these temporarily update costume of a sprite to something you choose. If you draw on that costume in the editor, it reverts back to the 
	original sprite. The "Sprite" is the number of the sprite you want to update on. 0 is stage, 1 is the first sprite on the list and so on.
	The "Costume" number is the costume number-1 (0 is the first costume in the sprite.)
	- setSvg (Allows to set the SVG of a costume. Only for experienced people who know what are they doing.)
	- setImage (Displays image from a data URI. You can set the image scale and blur effect. To draw an image from a file selected by user, use openFileData block and then set the data URI to fileResult.)
	- renderText (Uses SVG to render text on a costume. You can set custom font, color, size. Only use if you know how, this block may be really tricky.)
*/

/* ICONS: https://fontawesome.com/license */

const u2icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADTUlEQVRIS63VTWgUZxgH8P+7Mzsf+2U2SrPJKBoEA1WKUMzupaKHpgoetadCnaBN9FRaLLRQEW17KKIed1V21dJLbU/FRqiixx219NDaVi+NmnWNZT+cze7Ozsf7yoxEYpnMRJI5DQzP+5v3P8/7DEHANVHM7iXAVyAkwQCNgZYjDp3KH7jzZ1DdwmckBLirrE29KQgcTNOBZTrQdYP2es631LSPnp34zQqDlgTIcvTlOowxNBsG6o3uHw6he899eOt+EBIGeBHxUW5ElDjEYwKSKdFbzzAsVB61/q4lWlsvv3/XXAwJBOaL9pe29slE3MgoOSHF+N0DAwnwfASNehe1WudkYVw7sixgYfFkMXtSikU/VZQU3LhmHjVZ17Sz59Tbt/2QJe3glUIGMnEhe3PgjcR2Ny5dN/Df0873ebX8gS/wshUBUMK+PKveuhzWGZPF0fdiceHq4FAK3a6FyoyuFca13GKA14ruw8qM/ldhXNscBnz03duDUSY83jCchu04ePBvs5ZXtTW+wGQpW12/IZ1xP9r0dAM9g2bOH9Rmg5DDpW0ZwvFVD7CpW1ctqNqQP1DM/ZJRErvdFqw+bqHdMccKqvZr4AEsbdsVj4lTbkTttolqtXWloGp7FtlB7uv+1fIX6bSM9pyJJ9W5a3m1PAYC5ou4H7mUvT44mNwZTwio17to1Dsn8qp21Bc4cGl0WCLcP+vW9wkRQrxddNrW6cyw9NmxnTfthUX7ftgs9LcTP8dkfmxIWeW16cOHTdO22EheLU8v2qYTxezn6bT8zeo1MS/T2dk5GB3rHgNOMd6+SsFxnE3eJcAnohwdUZQkQAjqtTYadePHwri2L/CgHbuxg3/ywPhdUZJbJOnF3GnpPS9fw7ABAkgij3h8flS46REYPRvVig5KoebV8oXAg3bw4ugmjkV+6u+Xt/T1SSDE/wy6sTxrdiHHBYgCH4q8ssqLjOPHZYk/kkiKEUHg4Y5qBgbLpDBNG62W5Rhde4rjsGdISUEUgxHf1zx0MfsWdTBGCHIAeQeABbAyBdPmfziTpdz+SASlMOT1Z9GCoJeCLAtwrTBk2UAYsiKAH+JN2YreXDHg/wilzJ3Oz1YUmEcYY2fce0LIx88BFi6vvp70RPYAAAAASUVORK5CYII=";
const icon_download="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwLDAsNTEyLDUxMiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTY0LDc2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI4MCwtNzZoODBjMTMuMywwIDI0LDEwLjcgMjQsMjR2MTY4aDg3LjdjMTcuOCwwIDI2LjcsMjEuNSAxNC4xLDM0LjFsLTE1Mi4xLDE1Mi4yYy03LjUsNy41IC0xOS44LDcuNSAtMjcuMywwbC0xNTIuMywtMTUyLjJjLTEyLjYsLTEyLjYgLTMuNywtMzQuMSAxNC4xLC0zNC4xaDg3Ljh2LTE2OGMwLC0xMy4zIDEwLjcsLTI0IDI0LC0yNHpNNTc2LDMwMHYxMTJjMCwxMy4zIC0xMC43LDI0IC0yNCwyNGgtNDY0Yy0xMy4zLDAgLTI0LC0xMC43IC0yNCwtMjR2LTExMmMwLC0xMy4zIDEwLjcsLTI0IDI0LC0yNGgxNDYuN2w0OSw0OWMyMC4xLDIwLjEgNTIuNSwyMC4xIDcyLjYsMGw0OSwtNDloMTQ2LjdjMTMuMywwIDI0LDEwLjcgMjQsMjR6TTQ1MiwzODhjMCwtMTEgLTksLTIwIC0yMCwtMjBjLTExLDAgLTIwLDkgLTIwLDIwYzAsMTEgOSwyMCAyMCwyMGMxMSwwIDIwLC05IDIwLC0yMHpNNTE2LDM4OGMwLC0xMSAtOSwtMjAgLTIwLC0yMGMtMTEsMCAtMjAsOSAtMjAsMjBjMCwxMSA5LDIwIDIwLDIwYzExLDAgMjAsLTkgMjAsLTIweiIvPjwvZz48L2c+PC9zdmc+";
const icon_openfile="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzODQiIGhlaWdodD0iNTEyIiB2aWV3Qm94PSIwLDAsMzg0LDUxMiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyOCw3NikiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0zNzYsODRoMTM2djMyOGMwLDEzLjMgLTEwLjcsMjQgLTI0LDI0aC0zMzZjLTEzLjMsMCAtMjQsLTEwLjcgLTI0LC0yNHYtNDY0YzAsLTEzLjMgMTAuNywtMjQgMjQsLTI0aDIwMHYxMzZjMCwxMy4yIDEwLjgsMjQgMjQsMjR6TTQyOC40MywyNDguNjVsLTk2LjQyLC05NS43Yy02LjY1LC02LjYxIC0xNy4zOSwtNi42MSAtMjQuMDQsMGwtOTYuNDIsOTUuN2MtMTAuMTQsMTAuMDcgLTMuMDEsMjcuMzYgMTEuMjcsMjcuMzZoNjUuMTh2ODBjMCw4Ljg0IDcuMTYsMTYgMTYsMTZoMzJjOC44NCwwIDE2LC03LjE2IDE2LC0xNnYtODBoNjUuMThjMTQuMjgsMCAyMS40LC0xNy4yOSAxMS4yNSwtMjcuMzZ6TTUxMiw0NS45djYuMWgtMTI4di0xMjhoNi4xYzYuNCwwIDEyLjUsMi41IDE3LDdsOTcuOSw5OGM0LjUsNC41IDcsMTAuNiA3LDE2Ljl6Ii8+PC9nPjwvZz48L3N2Zz4=";
function u2_el(id){return document.getElementById(id);}
var u2_loadJS=function(a,e,n){var t=document.createElement("script");t.src=a,t.onload=e,t.onreadystatechange=e,n.appendChild(t)};
var temp_var_1='',
  temp_var_2='',
  temp_var_3='',
  temp_var_4='',
  geturl = window.location.href,
  utl2_spritescount,
  isSandboxed,
  utl2CustomCSS = document.createElement("style"),
  utl2OwnCSS = document.createElement("style"),
  utl2OpenFileDialog = document.createElement("div"),
  utl2_evalerr="",
  u2_file_loaded="Nothing opened yet",
  u2_file_name="Nothing opened yet";
utl2CustomCSS.id="u2customCSS";
utl2OpenFileDialog.id="u2_open_filter";
utl2OpenFileDialog.innerHTML=`
<div class="win-filter" id="win-filter">
<div id="u2_open_box" class="u2_centeredVH u2_centeredH"><div>
<h2 id="u2_open_title"></h2><br>
<form id="u2_fileform"><input id="u2_open_fu" type='file' /><input id="u2_data_open_fu" type='file' /></form>
<label for="u2_open_fu" class="u2_open_csUpload">Open file</label>&nbsp;&nbsp;<button onclick='u2_el("win-filter").style.display="none";u2_el("u2_open_box").style.display="none";'>Cancel</button><br>
</div></div>`;
var u2_open_dialog_defaultcss=`
h1,h2,h3,h4{padding:0px;margin:0px;}
input[type="file"] {display: none;}
.u2_centeredVH{text-align:center;display:flex;justify-content:center;align-items:center;}
.u2_open_csUpload, button{border:none;font-size:10px;cursor:pointer;padding:10px;border-radius:10px;background:#2050ee;color:white;}
#u2_open_box{z-index:55;background:#FFF;border:2px #666 solid;border-radius:15px;padding:15px;display:none;color:#000;}
#win-filter{z-index:50;position:fixed;top:0px;bottom:0px;left:0px;right:0px;background:rgba(0,0,0,0.5);display:none;justify-content:center;align-items:center;}`;
utl2OwnCSS.innerHTML=u2_open_dialog_defaultcss;
document.body.appendChild(utl2CustomCSS);
document.body.appendChild(utl2OwnCSS);
document.body.appendChild(utl2OpenFileDialog);
if (typeof window === "undefined" || !window.vm) {
  isSandboxed = true;
} else {
  isSandboxed = false;
}
class Utilities {
  constructor(runtime) {
    this.runtime = runtime
  }
  getInfo() {
    return {
      "id": "utilities",
      "name": "UtilitiesV2",
      "color1": '#8BC34A',
      "color2": '#7CB342',
      "color3": '#689F38',
      "menuIconURI": u2icon,
      "blocks": [{
          "opcode": 'isExactly',
          "blockType": "Boolean",
          "text": 'is [A] exactly [B]?',
          "arguments": {
            "A": {
              "type": "string",
              "defaultValue": 'apple'
            },
            "B": {
              "type": "string",
              "defaultValue": 'APPLE'
            }
          }
        },
        {
          "opcode": 'isLessOrEqual',

          "blockType": "Boolean",

          "text": '[A] <= [B]',
          "arguments": {
            "A": {
              "type": "number"
            },
            "B": {
              "type": "number",
              "defaultValue": 50
            }
          }
        },
        {
          "opcode": 'isMoreOrEqual',

          "blockType": "Boolean",

          "text": '[A] >= [B]',
          "arguments": {
            "A": {
              "type": "number"
            },
            "B": {
              "type": "number",
              "defaultValue": 50
            }
          }
        },
        {
          "opcode": 'trueBlock',
          "blockType": "Boolean",
          "text": 'true'
        },
        {
          "opcode": 'falseBlock',
          "blockType": "Boolean",
          "text": 'false'
        },
        {
          "opcode": 'exponent',

          "blockType": "reporter",

          "text": '[A] ^ [B]',
          "arguments": {
            "A": {
              "type": "number"
            },
            "B": {
              "type": "number"
            }
          }
        },
        {
          "opcode": 'pi',
          "blockType": "reporter",
          "text": 'pi'
        },
        {
          "opcode": 'ternaryOperator',

          "blockType": "reporter",

          "text": 'if [A] then [B] else [C]',
          "arguments": {
            "A": {
              "type": "Boolean"
            },
            "B": {
              "type": "string",
              "defaultValue": 'banana'
            },
            "C": {
              "type": "string",
              "defaultValue": 'apple'
            }
          }
        },
        {
          "opcode": 'letters',

          "blockType": "reporter",

          "text": 'letters [START] to [END] of [STRING]',
          "arguments": {
            "START": {
              "type": "number",
              "defaultValue": 5
            },
            "END": {
              "type": "number",
              "defaultValue": 7
            },
            "STRING": {
              "type": "string",
              "defaultValue": 'red apple'
            }
          }
        },
        {
          "opcode": 'currentMillisecond',
          "blockType": "reporter",
          "text": 'current millisecond'
        },
        {
          "opcode": 'fetchFrom',

          "blockType": "reporter",

          "text": 'get content from [URL]',
          "arguments": {
            "URL": {
              "type": "string",
              "defaultValue": 'https://translate-service.scratch.mit.edu/translate?language=eo&text=hello'
            }
          }
        },
        {
          "opcode": 'parseJSON',

          "blockType": "reporter",

          "text": '[PATH] of [JSON_STRING]',
          "arguments": {
            "PATH": {
              "type": "string",
              "defaultValue": 'fruit/apples'
            },
            "JSON_STRING": {
              "type": "string",
              "defaultValue": '{"fruit": {"apples": 2, "bananas": 3}, "total_fruit": 5}'
            }
          }
        },
        {
          "opcode": 'utl2_isValidJson',
          "blockType": "Boolean",
          "text": 'is valid json [json]',
          "arguments": {
            "json": {
              "type": "string",
              "defaultValue": '{}'
            }
          }
        },
        {
          "opcode": 'stringToBoolean',

          "blockType": "Boolean",

          "text": '[STRING]',
          "arguments": {
            "STRING": {
              "type": "string",
              "defaultValue": 'true'
            }
          }
        },
        {
          "opcode": 'justString',

          "blockType": "reporter",

          "text": '[STRING]',
          "arguments": {
            "STRING": {
              "type": "string",
              "defaultValue": 'string'
            }
          }
        },
        {
          "opcode": 'evalString',

          "blockType": "reporter",

          "text": 'eval [STRING]',
          "arguments": {
            "STRING": {
              "type": "string",
              "defaultValue": 'string'
            }
          }
        },
        {
          "opcode": 'consoleLogString',

          "blockType": "command",

          "text": 'consoleLog [STRING]',
          "arguments": {
            "STRING": {
              "type": "string",
              "defaultValue": 'hello world'
            }
          }
        },
        {
          "opcode": 'getCurrentURL',
          "blockType": "reporter",
          "text": 'getProjectLocationURL'
        },
        {
          "opcode": 'temporaryVariableSet',

          "blockType": "command",

          "text": 'setVariable [eventType] to [STRING]',
          "arguments": {
            "STRING": {
              "type": "string",
              "defaultValue": 'apple'
            },
            "eventType": {
              "type": "string",
              "defaultValue": '1'
            }
          },
        },
        {
          "opcode": 'temporaryVariableGet',

          "blockType": "reporter",

          "text": 'getVariable [eventType]',
          "arguments": {
			"eventType": {
              "type": "string",
              "defaultValue": '1'
            }
		  }
        },
        {
          "opcode": 'regexReplace',

          "blockType": "reporter",

          "text": 'replace [STRING] using the rule [REGEX] with [NEWSTRING]',
          "arguments": {
            "STRING": {
              "type": "string",
              "defaultValue": 'bananas are awesome. i like bananas.'
            },
            "REGEX": {
              "type": "string",
              "defaultValue": 'banana'
            },
            "NEWSTRING": {
              "type": "string",
              "defaultValue": 'apple'
            }
          }
        },
		{
          "opcode": 'utl2setCursor',
          "blockType": "command",
          "text": 'set cursor [STRING]',
          "arguments": {
			"STRING": {
              "type": "string",
              "defaultValue": 'none'
            }
		  }
        },
		{
          "opcode": 'utl2loadCustomCSS',
          "blockType": "command",
          "text": 'custom CSS [STRING]',
          "arguments": {
			"STRING": {
              "type": "string",
              "defaultValue": 'body{cursor:auto}'
            }
		  }
        },
		{
          "opcode": 'utl2eval',
          "blockType": "command",
          "text": 'JS [STRING]',
          "arguments": {
			"STRING": {
              "type": "string",
              "defaultValue": 'alert("hello world");'
            }
		  }
        },
		{
          "opcode": 'utl2evalerror',
          "blockType": "reporter",
          "text": 'last eval/js error',
          "arguments": {}
        },
		{
          "opcode": 'requestOpenFile',
          "blockType": "command",
          "text": 'openFileDialog | title: [A] CSS (optional): [B] | (as text) | accept files: [ALW]',
		  "blockIconURI": icon_openfile,
          "arguments": {
			"A": {
              "type": "string",
              "defaultValue": 'Open file'
            },
			"B": {
              "type": "string",
              "defaultValue": ''
            },
			"ALW": {
              "type": "string",
              "defaultValue": ''
            }
		  }
        },
		{
          "opcode": 'openFile',
		  "blockIconURI": icon_openfile,
          "blockType": "command",
          "text": 'openFile | (as text) | accept files: [ALW]',
          "arguments": {
			"ALW": {
              "type": "string",
              "defaultValue": ''
            }
		  }
        },
		{
          "opcode": 'openFileData',
		  "blockIconURI": icon_openfile,
          "blockType": "command",
          "text": 'openFile | (as data URI) | accept files: [ALW]',
          "arguments": {
			"ALW": {
              "type": "string",
              "defaultValue": 'image/*'
            }
		  }
        },
        {
          "opcode": 'u2_fileOpenResult',
          "blockType": "reporter",
          "text": 'fileResult',
          "arguments": {}
        },
        {
          "opcode": 'u2_fileName',
          "blockType": "reporter",
          "text": 'fileName',
          "arguments": {}
        },
		{
          "opcode": 'utl2downloadFile',
		  "blockIconURI": icon_download,
          "blockType": "command",
          "text": 'downloadFile | text: [text] filename: [filename]',
          "arguments": {
			"text": {
              "type": "string",
              "defaultValue": 'hello world'
            },
			"filename": {
              "type": "string",
              "defaultValue": 'hi.txt'
            }
		  }
        },
		{
          "opcode": 'utl2changeUsername',
          "blockType": "command",
          "text": 'set username to [username]',
          "arguments": {
			"username": {
              "type": "string",
              "defaultValue": 'Jon'
            }
		  }
        },
		{
          "opcode": 'utl2_greenFlag',
          "blockType": "command",
          "text": 'greenFlag',
          "arguments": {}
        },
		{
          "opcode": 'utl2_setSVG',
          "blockType": "command",
          "text": 'EXPERIMENTAL: set svg for sprite n. [t] costume n. [c] svg [svg]',
          "arguments": {
			"t": {
              "type": "string",
              "defaultValue": '1'
            },
			"c": {
              "type": "string",
              "defaultValue": '0'
            },
			"svg": {
              "type": "string",
              "defaultValue": '<svg></svg>'
            }
		  }
        },
		{
          "opcode": 'utl2_loadIMG',
          "blockType": "command",
          "text": 'EXPERIMENTAL: set image for sprite n. [t] costume n. [c] from data URI/link [uri] size [size] blur effect [blurfx]',
          "arguments": {
			"t": {
              "type": "string",
              "defaultValue": '1'
            },
			"c": {
              "type": "string",
              "defaultValue": '0'
            },
			"uri": {
              "type": "string",
              "defaultValue": 'uri'
            },
			"size": {
              "type": "string",
              "defaultValue": '150'
            },
			"blurfx": {
              "type": "string",
              "defaultValue": '0'
            }
		  }
        },
		{
          "opcode": 'utl2_showText',
          "blockType": "command",
          "text": 'EXPERIMENTAL: render text on sprite n. [t] costume index [c] text [text] color [co] size [sz] font family [f] | custom font (read http://i--i.cf/l/s1) [cf]',
          "arguments": {
			"t": {
              "type": "string",
              "defaultValue": '1'
            },
			"c": {
              "type": "string",
              "defaultValue": '0'
            },
			"text": {
              "type": "string",
              "defaultValue": 'Hello'
            },
			"co": {
              "type": "string",
              "defaultValue": '#000000'
            },
			"sz": {
              "type": "string",
              "defaultValue": '40'
            },
			"f": {
              "type": "string",
              "defaultValue": 'Sans Serif'
            },
			"cf": {
              "type": "string",
              "defaultValue": 'none'
            }
		  }
        },
      ],
      "menus": {
        "tvarsMenu": [{
          "text": "Variable1",
          value: 1
        }, {
          "text": "Variable2",
          value: 2
        }, {
          "text": "Variable3",
          value: 3
        }, {
          "text": "Variable4",
          value: 4
        }],
      }
    };
  }

  isExactly({A,B}) {
    return A === B;
  }

  isLessOrEqual({A,B}) {
    return A <= B;
  }

  isMoreOrEqual({A,B}) {
    return A >= B;
  }

  trueBlock() {
    return true;
  }

  falseBlock() {
    return false;
  }

  exponent({A,B}) {
    return Math.pow(A, B);
  }

  pi() {
    return Math.PI;
  }

  getCurrentURL() {
    return geturl;
  }

  ternaryOperator({A,B,C}) {
    return A ? B : C;
  }

  letters({STRING,START,END}) {
    return STRING.slice(Math.max(1, START) - 1, Math.min(STRING.length, END));
  }

  currentMillisecond() {
    return Date.now() % 1000;
  }

  fetchFrom({URL}) {
    return fetch(URL).then(res => res.text()).catch(err => '');
  }

  parseJSON({PATH,JSON_STRING}) {
    try {
      const path = PATH.toString().split('/').map(prop => decodeURIComponent(prop));
      if (path[0] === '') path.splice(0, 1);
      if (path[path.length - 1] === '') path.splice(-1, 1);
      let json;
      try {
        json = JSON.parse(' ' + JSON_STRING);
      } catch (e) {
        return e.message;
      }
      path.forEach(prop => json = json[prop]);
      if (json === null) return 'null';
      else if (json === undefined) return '';
      else if (typeof json === 'object') return JSON.stringify(json);
      else return json.toString();
    } catch (err) {
      return '';
    }
  }

  stringToBoolean({STRING}) {
    return STRING;
  }

  justString({STRING}) {
    return STRING;
  }
  
  evalString({STRING}) {
	try{
    var utl2_theInstructions = STRING;
    var F=new Function (utl2_theInstructions);
    return(F());
	}catch(e){utl2_evalerr=e;return utl2_evalerr;}
  }

  consoleLogString({STRING}) {
    console.log(STRING);
  }

  temporaryVariableSet({STRING,eventType}) {
    if (eventType == 1) {
      temp_var_1 = STRING;
    } else if (eventType == 2) {
      temp_var_2 = STRING;
    } else if (eventType == 3) {
	  temp_var_3 = STRING;
	} else {
	  temp_var_4 = STRING;
	}
  }

  temporaryVariableGet({eventType}) {
    return temp_var_1;
	if (eventType == 1) {
      return temp_var_1;
    } else if (eventType == 2) {
      return temp_var_2;
    } else if (eventType == 3) {
	  return temp_var_3;
	} else {
	  return temp_var_4;
	}
	return "error";
  }

  regexReplace({STRING,REGEX,NEWSTRING}) {
    return STRING.toString().replace(new RegExp(REGEX, 'gi'), NEWSTRING);
  }
  utl2setCursor({STRING}) {
    document.body.style.cursor=STRING;
  }
  utl2loadCustomCSS({STRING}) {
    utl2CustomCSS.innerHTML=STRING;
  }
  requestOpenFile({A,B,ALW}) {
	u2_el("u2_open_fu").accept=ALW;
	u2_el("u2_open_title").innerHTML=A;
	if(B.includes("u2_open_box")){utl2OwnCSS.innerHTML=B;}else{utl2OwnCSS.innerHTML=u2_open_dialog_defaultcss;}
	u2_el("u2_fileform").reset();u2_el("win-filter").style.display="flex";u2_el("u2_open_box").style.display="flex";
  }
  u2_fileOpenResult() {
	return u2_file_loaded;
  }
  u2_fileName() {
	try {
	return decodeURI(u2_file_name);
	} catch(e) {
	return u2_file_name;
	}
  }
  openFile({ALW}) {
	u2_el("u2_open_fu").accept=ALW;
	u2_el("u2_open_fu").click();
  }
  openFileData({ALW}) {
	u2_el("u2_data_open_fu").accept=ALW;
	u2_el("u2_data_open_fu").click();
  }
  utl2eval({STRING}) {
	try{
	eval(STRING);
	}catch(e){utl2_evalerr=e}
  }
  utl2downloadFile({filename, text}) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
  }
  utl2changeUsername({username}) {
	this.runtime.ioDevices.userData._username=username;
  }
  utl2_greenFlag({username}) {
	this.runtime["greenFlag"]()
  }
  utl2_isValidJson({json}) {
	try{var validatethisjson=JSON.parse(json);return true;}catch(e){return false;}
  }
  utl2_setSVG({t,c,svg}) {
	try{
	properSetSVG(t,c,svg);
	}catch(e){console.error(e)}
  }
  utl2_showText({t,c,text,co,f,cf,sz}) {
	try{
	var cfont="";
	if(cf==="none"){}else{cfont="<style>"+cf+"</style>"}
	properSetSVG(t, c, `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="608.54883" height="27.375" viewBox="0,0,608.54883,27.375">
	<g transform="translate(-15.98013,-164.26875)">
	<g data-paper-data="{&quot;isPaintingLayer&quot;:true}" fill="`+co+`" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="Sans Serif" font-weight="normal" font-size="40" text-anchor="start" style="mix-blend-mode: normal">`+cfont+`
	<text transform="translate(16.23013,185.76875) scale(0.5,0.5)" font-size="`+sz+`" xml:space="preserve" fill="`+co+`" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="`+f+`" text-anchor="start" style="mix-blend-mode: normal">
	<tspan x="0" dy="0">`+text+`</tspan></text></g></g></svg>`);
	}catch(e){console.error(e)}
  }
  utl2_loadIMG({t,c,uri,size,blurfx}) {
	try{properSetSVG(t, c, `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewbox="0,0,11,11" width="90" height="90"><defs><filter id="f1" x="0" y="0"><feGaussianBlur in="SourceGraphic" stdDeviation="`+blurfx+`"/></filter></defs><g><image filter="url(#f1)" width="`+size+`" height="`+size+`" transform="scale(1,1)" xlink:href="`+uri+`"/></g></svg>`);
	}catch(e){console.error(e)}
  }
  utl2evalerror(){
	return utl2_evalerr;
  }
}

function properSetSVG(t, c, svg){
const ps_sp=vm.runtime.targets[t];
const ps_cs=ps_sp.sprite.costumes[c];
vm.runtime.renderer.updateSVGSkin(ps_cs.skinId, svg);
ps_cs.bitmapResolution = 1;
vm.emitTargetsUpdate();
}

function u2_dataFileLoad(e){var a,n=e.target.files,t=new FileReader;t.onload=(a=n[0],function(e){
	u2_file_loaded=e.target.result;u2_file_name=escape(a.name);u2_el("u2_fileform").reset();
}),t.readAsDataURL(n[0])}u2_el("u2_data_open_fu").addEventListener("change",u2_dataFileLoad,!1);

function u2_fileLoad(e){var a,n=e.target.files,t=new FileReader;t.onload=(a=n[0],function(e){
	u2_file_loaded=e.target.result;u2_file_name=escape(a.name);u2_el("u2_fileform").reset();u2_el("win-filter").style.display="none";u2_el("u2_open_box").style.display="none";
}),t.readAsText(n[0])}u2_el("u2_open_fu").addEventListener("change",u2_fileLoad,!1);


(function() {
  var extensionInstance = new Utilities(window.vm.extensionManager.runtime)
  var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
  window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()
