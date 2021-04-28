// ==UserScript==
// @name         Swat's krunker cosmetics remover. (Release)
// @version      0.2
// @description  Removes all cosmetics of your choice.
// @author       Swat
// @run-at       document-start
// @match        *://krunker.io/*
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/msgpack-lite/0.1.26/msgpack.min.js
// ==/UserScript==

//
//  Want any things added/fixed? Make an issue on github, or message Swat#7165 on discord.
//

var usersettings = {
    //skins means both skins and models.
    "cosmetics":{
        "hats": false,
        "back_items": false,
        "knife_skins": false,
        "primary_weapon_skins": false,
        "secondary_weapon_skins": false,
        "shoes": false,
        "dyes": false,
        "waist_items": false,
        "faces": false,
    },
    "exclusives":{
        "verified_checkmarks": false,
        "partnered_checkmarks": false,
        "premium_checkmarks": false,
        "clan_tags": false,
        "challange_level_color": false,
        "colored_chat": false, //(Not working yet)
        "colored_hair": false,
        "colored_skin": false
    },
    //disabling colored skins, will also remove skin tints. You can set one global skin color which will apply to every krunker player.
    "set_yourself":{
        //"0", "1", "2", "3", "4" are lighter tints. ("3" is the original skin color.)
        //you can put multiple skintones for a random skintone, like this: "global_skin_color": ["0", "1", "2"]
        "global_skin_color": "3"
    }
}

//try increasing this value if the script gives you an error. (manual fix)
let debug_value = 39;

var _0x874a=["\x62\x75\x66\x66\x65\x72","\x70\x61\x72\x73\x65","\x64\x65\x63\x6F\x64\x65","\x57\x65\x62\x53\x6F\x63\x6B\x65\x74","\x6F\x6E\x6D\x65\x73\x73\x61\x67\x65","\x64\x61\x74\x61","\x73\x6C\x69\x63\x65","\x30","\x6C\x65\x6E\x67\x74\x68","\x6C\x6F\x67","\x68\x61\x74\x73","\x63\x6F\x73\x6D\x65\x74\x69\x63\x73","\x62\x61\x63\x6B\x5F\x69\x74\x65\x6D\x73","\x70\x72\x69\x6D\x61\x72\x79\x5F\x77\x65\x61\x70\x6F\x6E\x5F\x73\x6B\x69\x6E\x73","\x73\x65\x63\x6F\x6E\x64\x61\x72\x79\x5F\x77\x65\x61\x70\x6F\x6E\x5F\x73\x6B\x69\x6E\x73","\x6B\x6E\x69\x66\x65\x5F\x73\x6B\x69\x6E\x73","\x64\x79\x65\x73","\x73\x68\x6F\x65\x73","\x77\x61\x69\x73\x74\x5F\x69\x74\x65\x6D\x73","\x66\x61\x63\x65\x73","\x76\x65\x72\x69\x66\x69\x65\x64\x5F\x63\x68\x65\x63\x6B\x6D\x61\x72\x6B\x73","\x65\x78\x63\x6C\x75\x73\x69\x76\x65\x73","\x70\x61\x72\x74\x6E\x65\x72\x65\x64\x5F\x63\x68\x65\x63\x6B\x6D\x61\x72\x6B\x73","\x70\x72\x65\x6D\x69\x75\x6D\x5F\x63\x68\x65\x63\x6B\x6D\x61\x72\x6B\x73","\x63\x6C\x61\x6E\x5F\x74\x61\x67\x73","\x63\x68\x61\x6C\x6C\x61\x6E\x67\x65\x5F\x6C\x65\x76\x65\x6C\x5F\x63\x6F\x6C\x6F\x72","\x63\x6F\x6C\x6F\x72\x65\x64\x5F\x68\x61\x69\x72","\x63\x6F\x6C\x6F\x72\x65\x64\x5F\x73\x6B\x69\x6E","\x72\x61\x6E\x64\x6F\x6D","\x67\x6C\x6F\x62\x61\x6C\x5F\x73\x6B\x69\x6E\x5F\x63\x6F\x6C\x6F\x72","\x73\x65\x74\x5F\x79\x6F\x75\x72\x73\x65\x6C\x66","\x66\x6C\x6F\x6F\x72","\x69\x73\x41\x72\x72\x61\x79","\x54\x68\x65\x20\x77\x65\x62\x73\x6F\x63\x6B\x65\x74\x20\x69\x6E\x66\x6F\x72\x6D\x61\x74\x69\x6F\x6E\x20\x6F\x66\x20\x63\x6F\x73\x6D\x65\x74\x69\x63\x73\x20\x68\x61\x73\x20\x63\x68\x61\x6E\x67\x65\x64\x2C\x20\x53\x4F\x54\x54\x20\x63\x6F\x73\x6D\x65\x74\x69\x63\x73\x20\x63\x68\x61\x6E\x67\x65\x72\x20\x77\x69\x6C\x6C\x20\x6E\x6F\x20\x6C\x6F\x6E\x67\x65\x72\x20\x77\x6F\x72\x6B\x2C\x20\x70\x6C\x65\x61\x73\x65\x20\x6E\x6F\x74\x69\x66\x79\x20\x53\x77\x61\x74\x23\x37\x31\x36\x35\x20\x6F\x66\x20\x74\x68\x69\x73\x20\x65\x72\x72\x6F\x72\x20\x61\x6E\x64\x20\x64\x69\x73\x61\x62\x6C\x65\x20\x74\x68\x65\x20\x65\x78\x74\x65\x6E\x73\x69\x6F\x6E\x20\x75\x6E\x74\x69\x6C\x20\x61\x20\x66\x69\x78\x20\x68\x61\x73\x20\x62\x65\x65\x6E\x20\x61\x64\x64\x72\x65\x73\x73\x65\x64\x2E","\x65\x6E\x63\x6F\x64\x65","\x64\x65\x66\x69\x6E\x65\x50\x72\x6F\x70\x65\x72\x74\x79","\x61\x70\x70\x6C\x79"];function unpack(_0x87fax2){if(_0x87fax2 instanceof  DataView){_0x87fax2=  new Uint8Array(_0x87fax2[_0x874a[0]])}else {if(_0x87fax2 instanceof  ArrayBuffer){_0x87fax2=  new Uint8Array(_0x87fax2)}else {try{_0x87fax2= JSON[_0x874a[1]](_0x87fax2)}catch(err){}}};try{_0x87fax2= msgpack[_0x874a[2]](_0x87fax2)}catch(err){};return _0x87fax2}window[_0x874a[3]]=  new Proxy(WebSocket,{construct:function(_0x87fax3,_0x87fax4){var _0x87fax5= new _0x87fax3(..._0x87fax4);setTimeout(()=>{var _0x87fax6=_0x87fax5[_0x874a[4]];_0x87fax5[_0x874a[4]]= function(){let _0x87fax7=unpack(arguments[0][_0x874a[5]]),_0x87fax8= new Uint8Array(arguments[0][_0x874a[5]])[_0x874a[6]](-2);if(_0x87fax7[0]=== _0x874a[7]){if(debug_value% _0x87fax7[1][_0x874a[8]]|| debug_value=== _0x87fax7[1][_0x874a[8]]){console[_0x874a[9]](_0x87fax7[1][_0x874a[8]]/ debug_value);for(let _0x87fax9=0;_0x87fax9< _0x87fax7[1][_0x874a[8]]/ debug_value;_0x87fax9++){let _0x87faxa=_0x87fax9* debug_value;console[_0x874a[9]](_0x87faxa);if(!usersettings[_0x874a[11]][_0x874a[10]]){_0x87fax7[1][_0x87faxa+ 13]=  -1};if(!usersettings[_0x874a[11]][_0x874a[12]]){_0x87fax7[1][_0x87faxa+ 14]=  -1};if(!usersettings[_0x874a[11]][_0x874a[13]]){_0x87fax7[1][_0x87faxa+ 12][0]=  -1};if(!usersettings[_0x874a[11]][_0x874a[14]]){_0x87fax7[1][_0x87faxa+ 12][1]=  -1};if(!usersettings[_0x874a[11]][_0x874a[15]]){_0x87fax7[1][_0x87faxa+ 19]=  -1};if(!usersettings[_0x874a[11]][_0x874a[16]]){_0x87fax7[1][_0x87faxa+ 24]= 0};if(!usersettings[_0x874a[11]][_0x874a[17]]){_0x87fax7[1][_0x87faxa+ 31]=  -1};if(!usersettings[_0x874a[11]][_0x874a[18]]){_0x87fax7[1][_0x87faxa+ 32]=  -1};if(!usersettings[_0x874a[11]][_0x874a[19]]){_0x87fax7[1][_0x87faxa+ 36]=  -1};if(!usersettings[_0x874a[21]][_0x874a[20]]){_0x87fax7[1][_0x87faxa+ 25]= 0};if(!usersettings[_0x874a[21]][_0x874a[22]]){_0x87fax7[1][_0x87faxa+ 37]= 0};if(!usersettings[_0x874a[21]][_0x874a[23]]){_0x87fax7[1][_0x87faxa+ 29]= 0};if(!usersettings[_0x874a[21]][_0x874a[24]]){_0x87fax7[1][_0x87faxa+ 11]= 0};if(!usersettings[_0x874a[21]][_0x874a[25]]){_0x87fax7[1][_0x87faxa+ 26]= 0};if(!usersettings[_0x874a[21]][_0x874a[26]]){_0x87fax7[1][_0x87faxa+ 34]=  -1};if(!usersettings[_0x874a[21]][_0x874a[27]]){_0x87fax7[1][_0x87faxa+ 20]= 0};console[_0x874a[9]](usersettings[_0x874a[30]][_0x874a[29]][Math[_0x874a[31]](Math[_0x874a[28]]()* usersettings[_0x874a[30]][_0x874a[29]][_0x874a[8]])]);let _0x87faxb=usersettings[_0x874a[30]][_0x874a[29]][Math[_0x874a[31]](Math[_0x874a[28]]()* usersettings[_0x874a[30]][_0x874a[29]][_0x874a[8]])];_0x87fax7[1][_0x87faxa+ 20]= (Array[_0x874a[32]](usersettings[_0x874a[30]][_0x874a[29]])?_0x87faxb:usersettings[_0x874a[30]][_0x874a[29]])};console[_0x874a[9]](_0x87fax7)}else {alert(_0x874a[33])};let _0x87faxc= new Uint8Array([...msgpack[_0x874a[34]](_0x87fax7),..._0x87fax8]);Object[_0x874a[35]](arguments[0],_0x874a[5],{get:()=>{return _0x87faxc[_0x874a[0]]}});return _0x87fax6[_0x874a[36]](this,arguments)};return _0x87fax6[_0x874a[36]](this,arguments)}});return _0x87fax5}})