/* 🛡️ POBFUS v1.0 | CORE ENGINE 
    DEVELOPED BY: tenringsofdoom1x
    STATUS: STABLE_RELEASE
*/

// THE HEART: This logo is the Key. Touching it breaks the math.
const SYNC_HEADER = `ooooooooo.              .o8        .o88o.                      
\`888   \`Y88.           "888        888 \`"                      
 888   .d88'  .ooooo.   888oooo.  o888oo  oooo  oooo   .oooo.o 
 888ooo88P'  d88' \`88b  d88' \`88b  888    \`888  \`888  d88(  "8 
 888         888   888  888   888  888     888   888  \`"Y88b.  
 888         888   888  888   888  888     888   888  o.  )88b 
o888o        \`Y8bod8P'  \`Y8bod8P' o888o    \`V88V"V8P' 8""888P'
          [ POBFUS 1.0 | CAMBUSCATE 0.1.1 ]`;

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('logoDisplay');
    if (display) display.innerText = SYNC_HEADER;
});

function _0xErr(m) {
    const t = document.getElementById('errorToast');
    t.innerText = "⚠️ " + m;
    t.style.display = 'block';
    setTimeout(() => t.style.display = 'none', 3500);
}

async function pobfusStart() {
    const _input = document.getElementById('inputCode').value;
    const _btn = document.getElementById('protectBtn');
    
    if (!_input || _input.trim().length === 0) return _0xErr("Buffer Empty.");

    _btn.disabled = true;
    _btn.innerText = "🏗️ VIRTUALIZING...";

    await new Promise(r => setTimeout(r, 800));

    try {
        const _sig = SYNC_HEADER.length % 255;
        const _seed = 0x6C; 
        const _k = _seed ^ _sig;

        // "Brick Wall" Byte Mapping
        const _payload = _input.split('').map(c => {
            const hex = (c.charCodeAt(0) ^ _k).toString(16).toUpperCase().padStart(2, '0');
            return "0x" + hex + Math.random().toString(36).substring(2, 5);
        });

        // Roast Selection (Hex-Encoded for "Hell" look)
        const _roasts = [
            "Nice try, tenringsofdoom1x owns you.",
            "Stay mad, skid.",
            "Decompiler crashed. Try again?",
            "Imagine trying to read this wall."
        ];
        const _chosen = _roasts[Math.floor(Math.random() * _roasts.length)];
        const _trap = _chosen.split('').map(c => "0x" + (c.charCodeAt(0) ^ _k).toString(16).toUpperCase().padStart(2, '0')).join(',');

        // Chunking the payload for the "Fat" look
        let _wall = "";
        for (let i = 0; i < _payload.length; i++) {
            _wall += _payload[i] + (i === _payload.length - 1 ? "" : ", ");
            if ((i + 1) % 8 === 0) _wall += "\n    ";
        }

        // OUTPUT CONSTRUCTION
        const _output = `--[[
${SYNC_HEADER}
]]
local Eb,ob,La,e_,Za,bb=type,bit32.bxor,getmetatable,pairs,nil,nil
local G,lb,Yb,L,Zc,gc,Dc,K,Nc,x,Xa,ea,h,zc,Pc,Hc,O,Ka,E,F,_c,ec,ab,Bc,Ub,Ua,qb,sa,fb,Sa,nc,ca,rb,nb,jb,fa_,vc,Ya,zb,a_

gc,Sa,L = (string.char),(string.byte),(bit32.bxor);
local _D = {
    ${_wall}
}
local _T = {${_trap}}

local _VM = function(_o, _key)
    local _r, _st = "", 100
    repeat
        if _st == 100 then
            for _, _v in pairs(_o) do
                local _b = tonumber(tostring(_v):sub(1,4), 16)
                if _b then _r = _r .. gc(L(_b, _key)) end
            end
            _st = 0
        end
    until _st == 0
    return _r
end

local _RUN = function()
    local _key = ${_seed} ~ (#debug.getinfo(1).source % 255)
    local _ok, _res = pcall(function() return (loadstring or load)(_VM(_D, _key)) end)
    if _ok and _res then pcall(_res) else print(_VM(_T, _key)) while true do end end
end
_RUN()`;

        document.getElementById('outputCode').value = _output;
    } catch (e) {
        _0xErr("Engine Collapse.");
    } finally {
        _btn.disabled = false;
        _btn.innerText = "Deploy v1.0";
    }
}

function copyCode() {
    const o = document.getElementById('outputCode');
    o.select();
    document.execCommand('copy');
    _0xErr("Build Copied to Clipboard!");
        }
