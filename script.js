const core = {
    log: (m) => {
        const l = document.getElementById('logs');
        const d = document.createElement('div');
        d.innerHTML = `[${new Date().toLocaleTimeString()}] <b>pobfus:</b> ${m}`;
        l.appendChild(d);
        l.scrollTop = l.scrollHeight;
    },

    fold: (n) => {
        const r = Math.floor(Math.random() * 40) + 10;
        return `((${n * r})/${r})`;
    },

    generateJunk: () => {
        const vars = ["_0x1a", "_0x9f", "_0xbb", "_0xcc", "_ptr", "_mem"];
        let junk = "";
        for(let i = 0; i < 3; i++) {
            const v = vars[Math.floor(Math.random() * vars.length)] + Math.floor(Math.random() * 99);
            junk += `local ${v}=${Math.random().toFixed(4)};`;
        }
        return junk;
    },

    commit: function() {
        const src = document.getElementById('in').value;
        if (!src.trim()) return;

        this.log("Initializing Obsidian Protection Pipeline...");

        setTimeout(() => {
            const k = 7;
            const kF = this.fold(k);
            const enc = btoa(src).split('').map(c => String.fromCharCode(c.charCodeAt(0) + k)).join('');

            const asciiHeader = `--[[\n    ....      ..                       ..                                .x+=:.\n  +^""888h. ~"888h               . uW8"         oec :                   z\`    ^%\n 8X.  ?8888X  8888f         u.   \`t888         @88888     x.    .          .   <k\n'888x  8888X  8888~   ...ue888b   8888   .     8"*88%   .@88k  z88u      .@8Ned8"\n'88888 8888X   "88x:  888R Y888r  9888.z88N    8b.     ~"8888 ^8888    .@^%8888"\n ` + "`" + `8888 8888X  X88x.   888R I888>  9888  888E  u888888>   8888  888R   x88:  ` + "`)8b." + `\n   ` + "`" + `*` + "`" + ` 8888X '88888X  888R I888>  9888  888E   8888R     8888  888R   8888N=*8888\n  ~` + "`" + `...8888X  "88888  888R I888>  9888  888E   8888P     8888  888R    %8"    R88\n   x8888888X.   ` + "`" + `%8" u8888cJ888   9888  888E   *888>     8888 ,888B .   @8Wou 9%\n  '%"*8888888h.   "   "*888*P"   .8888  888"   4888     "8888Y 8888"  .888888P` + "`" + `\n  ~\n]]\n`;

            const minifiedLogic = `return(function(...) ${this.generateJunk()}game:GetService("StarterGui"):SetCore("SendNotification",{Title="PRONAR.CC",Text="Obsidian Protocol: Active!",Duration=5})local _v="${enc}"local _k=${kF}local _d=function(x)local r=""for i=${this.fold(1)},#x do r=r..string.char(x:sub(i,i):byte()-_k)end return(game:GetService("\\072\\116\\116\\112\\083\\101\\114\\118\\105\\099\\101"):Base64Decode(r))end ${this.generateJunk()}local _p=newproxy(true)local _m=getmetatable(_p)_m.__index=function(_,k)return _G[k] or getfenv(0)[k]end _m.__metatable="Pronar.cc Locked"local _exec=loadstring(_d(_v))setfenv(_exec,setmetatable({},_m))return(function(f,...)return f(...)end)(_exec,select(${this.fold(1)},...))end)(...)`;

            document.getElementById('out').value = asciiHeader + minifiedLogic;
            this.log("SUCCESS: Decompiler Breaker Active. Build Finalized.");
        }, 700);
    }
};

window.onload = () => core.log("Pobfus x Pronar.cc Core Online.");
