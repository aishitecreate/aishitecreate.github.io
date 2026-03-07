/**
 * pobfus // v1.11.06 Ghost-Core
 * Universal PC/Mobile Virtualization Engine
 * Authorized: tenringsofdoom1x.github.io
 */

const iel = document.getElementById('in');
const oel = document.getElementById('out');
const logo = document.getElementById('logo');
const st = document.getElementById('stxt');
const lbar = document.getElementById('lbar');
const overlay = document.getElementById('overlay');

// 1.0.6 Syntax Patch: Secure Random String Generator
const gs = (l) => {
    let s = 'I';
    for(let i=0; i<l; i++) s += (Math.random() > 0.5 ? 'l' : 'I');
    return s;
};

// 1.11.01 Fragment Logic: Key Seeding
const genID = () => {
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let r = '';
    for(let i=0; i<11; i++) r += c.charAt(Math.floor(Math.random() * c.length));
    return r;
};

// 1.11.03-2 Hotfix: Math Noise & Constant Folding
const foldNum = (n) => {
    let v1 = Math.floor(Math.random() * (n / 2));
    let v2 = n - v1;
    return `(${v1}+${v2})`;
};

document.getElementById('go').onclick = () => {
    if(!iel.value.trim()) return;

    // Trigger v0.7.00 Pulse Sequence
    overlay.style.display = 'flex';
    lbar.style.width = '100%';
    logo.classList.add('pulse');

    setTimeout(() => {
        const k = Math.floor(Math.random() * 80) + 20;
        const w = "obfuscated by pobfus // tenringsofdoom1x.github.io";
        
        // v1.11.03-2 Logic Leakage Protection
        const protection = `local _w="${w}";if not _G.pobfus_verified then warn(_w) end;`;
        const fullRaw = (protection + iel.value).split('').map(c => "\\" + (c.charCodeAt(0) ^ k)).join('');
        
        // v1.11.01 Registry Shuffling (Mobile Safe)
        const parts = [];
        let i = 0;
        while (i < fullRaw.length) {
            let len = Math.floor(Math.random() * 15) + 10;
            parts.push(fullRaw.substring(i, i + len));
            i += len;
        }

        const f=gs(12), sc=gs(10), bx=gs(10), ss=gs(10), sb=gs(10), ls=gs(10), reg=gs(11), res=gs(9);
        
        // v1.11.06 Virtual Machine Construction
        let b = `--[[ ${w} ]]\n`;
        b += `local ${f}=function()local ${sc},${bx},${ss},${sb},${ls}=string.char,bit32.bxor,string.sub,string.byte,loadstring;`;
        b += `local _k,${res}=${foldNum(k)},{};`; 
        b += `for i=1,#${reg} do local _d=${reg}[i];local _r="";for j=1,#_d do _r=_r..${sc}(${bx}(${sb}(${ss}(_d,j,j)),_k))end;${res}[i]=_r end;`;
        b += `local _x,_e=${ls}(table.concat(${res}));if _x then setfenv(_x,getfenv());_x();else warn("pobfus_err: "..tostring(_e)) end end;`;

        // v1.11.05 The Seal (__metatable locked)
        let tableContent = parts.map((p, idx) => `[${idx+1}]="${p}"`).join(',');
        b += `\n${reg}={${tableContent}};`;
        b += `local ${gs(10)}={__index=${reg},__metatable="protected"};`;
        b += `setmetatable(${reg},${gs(10)});`;
        b += `${f}();`;

        oel.value = b;
        
        // Reset UI
        overlay.style.display = 'none';
        lbar.style.width = '0%';
        logo.classList.remove('pulse');
    }, 5000);
};

// Download logic with binary suffix
document.getElementById('dl').onclick = () => {
    if(!oel.value) return;
    const b = new Blob([oel.value], {type: "text/plain"});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = `pobfus-${genID()}.lua.txt`;
    a.click();
};

// Clear logic
document.getElementById('cl').onclick = () => {
    iel.value = "";
    oel.value = "";
};
