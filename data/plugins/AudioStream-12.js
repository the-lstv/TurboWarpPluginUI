/*
Experimental extension for Scratch.
*/

const icon="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTYuMTU4NjgiIGhlaWdodD0iMTE2LjE1ODY4IiB2aWV3Qm94PSIwLDAsMTE2LjE1ODY4LDExNi4xNTg2OCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTM2MC43NDQxOSwtMTA3LjUwODkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTM2Mi43NDQxOSwxNjUuNTg4MjRjMCwtMzAuOTcxNzYgMjUuMTA3NTcsLTU2LjA3OTM0IDU2LjA3OTM0LC01Ni4wNzkzNGMzMC45NzE3NiwwIDU2LjA3OTM0LDI1LjEwNzU3IDU2LjA3OTM0LDU2LjA3OTM0YzAsMzAuOTcxNzYgLTI1LjEwNzU3LDU2LjA3OTM0IC01Ni4wNzkzNCw1Ni4wNzkzNGMtMzAuOTcxNzYsMCAtNTYuMDc5MzQsLTI1LjEwNzU3IC01Ni4wNzkzNCwtNTYuMDc5MzR6IiBmaWxsPSIjYmE0NWFjIiBzdHJva2U9IiNhODM5OWIiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNNDIxLjM5MDIsMTM4LjY0MDk5djUzLjg5Mzc1YzAsMy40MzkzNCAtNC4xNjEyMiw1LjEzMzM1IC02LjU3MjI5LDIuNzIyMjhsLTE0LjI3MjMyLC0xNC4yNjkxMWgtMTYuMzcyMThjLTIuMTI3MTMsMCAtMy44NTAwMSwtMS43MjQ0OCAtMy44NTAwMSwtMy44NTAwMXYtMjMuMTAwMDdjMCwtMi4xMjcxMyAxLjcyMjg4LC0zLjg1MDAxIDMuODUwMDEsLTMuODUwMDFoMTYuMzcyMThsMTQuMjcyMzIsLTE0LjI2OTExYzIuNDA3ODYsLTIuNDA3ODYgNi41NzIyOSwtMC43MjAyNyA2LjU3MjI5LDIuNzIyMjh6TTQ0My41NjQ2NywxOTAuNjUxNDRjLTEuOTI1MDEsMS4yMzIgLTQuMjY4NywwLjQ2NTIxIC01LjMxMzAyLC0xLjE5NjcxYy0xLjEzNzM2LC0xLjgxMTExIC0wLjYwNjM4LC00LjIwNjE0IDEuMTg4NjksLTUuMzUxNTJjNi4zNzY1OCwtNC4wNzI5OSAxMC4xODMyOCwtMTAuOTkzMzkgMTAuMTgzMjgsLTE4LjUxNTM1YzAsLTcuNTIxOTYgLTMuODA2NywtMTQuNDQyMzYgLTEwLjE4MzI4LC0xOC41MTUzNWMtMS43OTUwNywtMS4xNDY5OCAtMi4zMjYwNSwtMy41NDIwMSAtMS4xODg2OSwtNS4zNTE1MmMxLjEzNzM2LC0xLjgwOTUxIDMuNTE3OTUsLTIuMzQyMDkgNS4zMTMwMiwtMS4xOTY3MWM4LjYxNjAxLDUuNTAyMzEgMTMuNzU4OTgsMTQuODcyMjggMTMuNzU4OTgsMjUuMDYzNThjMCwxMC4xOTI5MSAtNS4xNDI5NywxOS41NjEyNyAtMTMuNzU4OTgsMjUuMDYzNTh6TTQ0MS45MjUyMSwxNjUuNTg2MjZjMCw1LjExNDEgLTIuODEzNzIsOS44MzgzOCAtNy4zNDIyOSwxMi4zMzI4N2MtMS44NTQ0MiwxLjAxODY1IC00LjE5OTcyLDAuMzU0NTIgLTUuMjMxMiwtMS41MTU5NGMtMS4wMjUwNywtMS44NjI0NCAtMC4zNDY1LC00LjIwMjkzIDEuNTE1OTQsLTUuMjMxMmMyLjA2OTM4LC0xLjEzNzM2IDMuMzU1OTMsLTMuMjc3MzIgMy4zNTU5MywtNS41ODQxMmMwLC0yLjMwNTE5IC0xLjI4NjU1LC00LjQ0Njc2IC0zLjM1NzUzLC01LjU4NDEyYy0xLjg2MjQ0LC0xLjAyODI3IC0yLjU0MTAxLC0zLjM2ODc2IC0xLjUxNTk0LC01LjIzMTJjMS4wMjk4OCwtMS44NjI0NCAzLjM3MzU3LC0yLjUzMTM4IDUuMjMxMiwtMS41MTU5NGM0LjUzMDE4LDIuNDkyODggNy4zNDM5LDcuMjE1NTYgNy4zNDM5LDEyLjMyOTY2eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTM5Ni4wMjk0MSwxNjUuNzY5MjNoMTcuOTQxMTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzRlMDBmZiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNNDA1LDE1Ni4zMTE3MXYxOC45MTUwMyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNGUwMGZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PC9zdmc+";
function am_el(id){return document.getElementById(id);}
/*Source*/
var soundFile = document.createElement("audio");
soundFile.src="";
soundFile.crossorigin=true;
document.body.appendChild(soundFile);
soundFile.preservesPitch=false;


/*AudioAPI*/
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

/*AudioContext*/
const track = audioContext.createMediaElementSource(soundFile);

/*Nodes, filters, basically everything*/
const gainNode = audioContext.createGain();
const pannerOptions = {pan: 0};
const panner = new StereoPannerNode(audioContext, pannerOptions);

const filter1 = audioContext.createBiquadFilter();
filter1.type="lowpass";
const filter2 = audioContext.createBiquadFilter();
filter2.type="highpass";
const filter3 = audioContext.createBiquadFilter();
filter3.type="bandpass";
const filter4 = audioContext.createBiquadFilter();
filter4.type="lowshelf";
const filter5 = audioContext.createBiquadFilter();
filter5.type="highshelf";
const filter6 = audioContext.createBiquadFilter();
filter6.type="peaking";
const filter7 = audioContext.createBiquadFilter();
filter7.type="notch";
const filter8 = audioContext.createBiquadFilter();
filter8.type="allpass";

const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);


track.connect(gainNode).connect(panner).connect(analyser).connect(audioContext.destination);


var am_global_loop, am_global_volume=1,pv_f="0";
class AudioStream {
  constructor(runtime) {
    this.runtime = runtime
  }
  getInfo() {
    return {
      "id": "audiostr",
      "name": "AudioStream ðŸŽµ",
      "color1": '#ba45ac',
      "color2": '#a8399b',
      "color3": '#942c88',
	  "menuIconURI": icon,
      "blocks": [
	    {
          "opcode": 'am_playfromurl',
          "blockType": "command",
          "text": 'load sound [URL]',
          "arguments": {
            "URL": {
              "type": "string",
              "defaultValue": 'http://lstv.ml/cdn/dock/uploads/GlassBreaking.mp3'
            }
          }
        },
		{
          "opcode": 'am_songDuration',
          "blockType": "reporter",
          "text": 'sound duration',
          "arguments": {}
        },
		{
          "opcode": 'am_getanalyser',
          "blockType": "reporter",
          "text": 'get analyser bufferLength',
          "arguments": {}
        },
		{
          "opcode": 'am_analyserfft',
          "blockType": "command",
          "text": 'set analyser fftSize to [VAL] (must be power of 2!)',
          "arguments": {
				"VAL": {
				  "type": "number",
				  "defaultValue": '256'
				}
			}
        },
		{
          "opcode": 'am_setvolume',
          "blockType": "command",
          "text": 'set volume to [VAL]',
          "arguments": {
            "VAL": {
              "type": "number",
              "defaultValue": '1.0'
            }
          }
        },
		{
          "opcode": 'am_setpitch',
          "blockType": "command",
          "text": 'set speed/pitch to [VAL]',
          "arguments": {
            "VAL": {
              "type": "number",
              "defaultValue": '0'
            }
          }
        },
		{
          "opcode": 'am_setppitch',
          "blockType": "command",
          "text": 'preservesPitch [VAL]',
          "arguments": {
            "VAL": {
              "type": "Boolean",
              "defaultValue": 'false'
            }
          }
        },
		{
          "opcode": 'am_setstereo',
          "blockType": "command",
          "text": 'set pan to [VAL] (-1 to 1)',
          "arguments": {
            "VAL": {
              "type": "number",
              "defaultValue": '0'
            }
          }
        },
		{
          "opcode": 'am_setfilter',
          "blockType": "command",
          "text": 'filter [FIL] set frequency [FQ] quality [Q]',
          "arguments": {
            "FIL": {
              "type": "string",
              "defaultValue": 'lowpass',
			  "menu":"filtersmenu"
            },
            "Q": {
              "type": "number",
              "defaultValue": '0'
            },
            "FQ": {
              "type": "number",
              "defaultValue": '440'
            }
          }
        },
		{
          "opcode": 'am_toglefilter',
          "blockType": "command",
          "text": 'filter [FIL] [STATE]',
          "arguments": {
            "FIL": {
              "type": "string",
              "defaultValue": 'lowpass',
			  "menu":"filtersmenu"
            },
            "STATE": {
              "type": "string",
              "defaultValue": 'connect',
			  "menu":"connectOrDisconnect"
            }
          }
        },
		{
          "opcode": 'am_freset',
          "blockType": "command",
          "text": 'reset all filters',
          "arguments": {}
        },
		{
          "opcode": 'am_connect',
          "blockType": "command",
          "text": 'connect [STRING] to track [TRACK]',
          "arguments": {
            "STRING": {
              "type": "string",
              "defaultValue": 'filter1'
            },
            "TRACK": {
              "type": "string",
              "defaultValue": 'track'
            }
          }
        },
		{
          "opcode": 'am_disconnect',
          "blockType": "command",
          "text": 'disconnect [STRING] from track [TRACK]',
          "arguments": {
            "STRING": {
              "type": "string",
              "defaultValue": 'filter1'
            },
            "TRACK": {
              "type": "string",
              "defaultValue": 'track'
            }
          }
        },
		{
          "opcode": 'am_skipToTime',
          "blockType": "command",
          "text": 'skip to time [VAL]',
          "arguments": {
            "VAL": {
              "type": "number",
              "defaultValue": '0.01'
            }
          }
        },
		{
          "opcode": 'am_songCurrent',
          "blockType": "reporter",
          "text": 'current time',
          "arguments": {}
        },
	    {
          "opcode": 'am_stop',
          "blockType": "command",
          "text": 'stop all sounds',
          "arguments": {}
        },
	    {
          "opcode": 'am_hasStopped',
          "blockType": "Boolean",
          "text": 'has stopped',
          "arguments": {}
        },
	    {
          "opcode": 'am_pause',
          "blockType": "command",
          "text": 'pause',
          "arguments": {}
        },
	    {
          "opcode": 'am_resume',
          "blockType": "command",
          "text": 'resume',
          "arguments": {}
        },
	    {
          "opcode": 'am_isPaused',
          "blockType": "Boolean",
          "text": 'is paused',
          "arguments": {}
        },
      ],
      "menus": {
		"filtersmenu": [{
          "text": "lowpass",
          value: "lowpass"
        }, {
          "text": "highpass",
          value: "highpass"
        }, {
          "text": "bandpass",
          value: "bandpass"
        }, {
          "text": "lowshelf",
          value: "lowshelf"
        }, {
          "text": "highshelf",
          value: "highshelf"
        }, {
          "text": "peaking",
          value: "peaking"
        }, {
          "text": "notch",
          value: "notch"
        }, {
          "text": "allpass",
          value: "allpass"
        }],
		"connectOrDisconnect": [{
          "text": "connect",
          value: "connect"
        }, {
          "text": "disconnect",
          value: "disconnect"
        }]
	  }
    };
  }

  am_playfromurl({URL}) {
	soundFile.src = URL;
  }
  am_stop() {
	soundFile.currentTime = 99999999999999999999;
  }
  am_resume() {
	soundFile.play();
  }
  am_pause() {
	soundFile.pause();
  }
  am_skipToTime({VAL}) {
	soundFile.currentTime=VAL;
  }
  am_setpitch({VAL}) {
	pv_f="0";
	/*Calculate the pitch effect (For example from 300 to 7, -300 to 0.5)*/
	if(VAL<0){
		if(VAL<-659){
			pv_f=0.1;
		} else {
			pv_f=1-Math.abs(VAL)/700;
		}
	} else {
		if(VAL>700){
			pv_f=15;
		} else {
			pv_f=VAL/50+1;
		}
	}
	soundFile.defaultPlaybackRate=pv_f;
	soundFile.playbackRate=pv_f;
  }
  am_setvolume({VAL}) {
	am_global_volume=VAL;
	if(am_global_volume>1){soundFile.volume=1}else if(am_global_volume<0){soundFile.volume=0}else{soundFile.volume=am_global_volume};
  }
  am_setstereo({VAL}) {
	panner.pan.value = VAL;
  }
  am_setppitch({VAL}) {
	soundFile.preservesPitch=VAL;
  }
  am_setfilter({FIL,FQ,Q}) {
	  if (FIL==="lowpass"){
		  filter1.frequency.value = FQ;
		  filter1.Q.value = Q;
	  }else if (FIL==="highpass"){
		  filter2.frequency.value = FQ;
		  filter2.Q.value = Q;
	  }else if (FIL==="bandpass"){
		  filter3.frequency.value = FQ;
		  filter3.Q.value = Q;
	  }else if (FIL==="lowshelf"){
		  filter4.frequency.value = FQ;
		  filter4.Q.value = Q;
	  }else if (FIL==="highshelf"){
		  filter5.frequency.value = FQ;
		  filter5.Q.value = Q;
	  }else if (FIL==="peaking"){
		  filter6.frequency.value = FQ;
		  filter6.Q.value = Q;
	  }else if (FIL==="notch"){
		  filter7.frequency.value = FQ;
		  filter7.Q.value = Q;
	  }else if (FIL==="allpass"){
		  filter8.frequency.value = FQ;
		  filter8.Q.value = Q;
	  }
  }
  am_toglefilter({FIL,STATE}) {
	  if (FIL==="lowpass"){
		if(STATE==="connect"){track.connect(filter1)}else{filter1.disconnect()}
	  }else if (FIL==="highpass"){
		if(STATE==="connect"){track.connect(filter2)}else{filter2.disconnect()}
	  }else if (FIL==="bandpass"){
		if(STATE==="connect"){track.connect(filter3)}else{filter3.disconnect()}
	  }else if (FIL==="lowshelf"){
		if(STATE==="connect"){track.connect(filter4)}else{filter4.disconnect()}
	  }else if (FIL==="highshelf"){
		if(STATE==="connect"){track.connect(filter5)}else{filter5.disconnect()}
	  }else if (FIL==="peaking"){
		if(STATE==="connect"){track.connect(filter6)}else{filter6.disconnect()}
	  }else if (FIL==="notch"){
		if(STATE==="connect"){track.connect(filter7)}else{filter7.disconnect()}
	  }else if (FIL==="allpass"){
		if(STATE==="connect"){track.connect(filter8)}else{filter8.disconnect()}
	  }
  }
  am_freset() {
		  filter1.frequency.value = FQ;
		  filter1.Q.value = 0;
		  filter2.frequency.value = FQ;
		  filter2.Q.value = 0;
		  filter3.frequency.value = FQ;
		  filter3.Q.value = 0;
		  filter4.frequency.value = FQ;
		  filter4.Q.value = 0;
		  filter5.frequency.value = FQ;
		  filter5.Q.value = 0;
		  filter6.frequency.value = FQ;
		  filter6.Q.value = 0;
		  filter7.frequency.value = FQ;
		  filter7.Q.value = 0;
		  filter8.frequency.value = FQ;
		  filter8.Q.value = 0;
  }
  am_connect({STRING}){
    var utl2_theInstructions = "return "+STRING;
    var F=new Function (utl2_theInstructions);
    track.connect(F());
  }
  am_disconnect({STRING}){
    var utl2_theInstructions = "return "+STRING;
    var F=new Function (utl2_theInstructions);
    F().disconnect;
  }
  am_analyserfft({VAL}) {
	analyser.fftSize = VAL;
  }
  am_songDuration() {
	return soundFile.duration;
  }
  am_getanalyser() {
	analyser.getByteTimeDomainData(dataArray);
	return JSON.stringify(dataArray);
  }
  am_songCurrent() {
	return soundFile.currentTime;
  }
  am_hasStopped() {
	return soundFile.ended;
  }
  am_isPaused() {
	return soundFile.paused;
  }
}

(function() {
  var extensionInstance = new AudioStream(window.vm.extensionManager.runtime)
  var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
  window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()
