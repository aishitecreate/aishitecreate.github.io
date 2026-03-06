/**
 * POBFUS 1.11 // CORE_PROTECTOR
 * ENGINE: CAMBUSCATE 0.2.1
 * [!] PRODUCTION BUILD - ANTI-LEAK ENABLED
 */

(function(_0xPOBFUS) {
    // Barcode Generator for Lua variables
    const _0xBC = (l) => { 
        let r = "I"; 
        for(let i=0; i<l; i++) r += "Il".charAt(Math.floor(Math.random() * 2)); 
        return r; 
    };

    // UI String Decryption (XOR 0x6F)
    const _0xS = (h) => h.split(',').map(b => String.fromCharCode(parseInt(b, 16) ^ 0x6F)).join('');

    // Randomized Alphanumeric Noise
    const _0xSCREAM = (len) => {
        const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let r = "";
        for(let i=0; i<len; i++) r += c.charAt(Math.floor(Math.random() * c.length));
        return r;
    };

    // Roast Database
    const _0xROASTS = [
        "your decompiler likes me~ too much...",
        "feed me to your poor decompiler senpai!!!~",
        "staring at my bytecode again? how lewd~",
        "is that a hook? how aggressive, senpai~",
        "your decompiler is blushing at this complexity~"
    ];

    const _STR = {
        logo: ` _______         __           ___                 \n|_   __ \\       [  |        .' ..]                \n  | |__) | .--.  | |.--.   _| |_  __   _   .--.   \n  |  ___// .'\`\\ \\| '/'\`\\ \\'-| |-'[  | | | ( (\`\\]  \n _| |_   | \\__. ||  \\__/ |  | |   | \\_/ |, \`'.'.  \n|_____|   '.__.'[__;.__.'  [___]  '.__.'_/([__) ) \n                                                  \n     [ Pobfus 1.11 | CamBuscate 0.2.1 ]`,
        run: _0xS("3C,20,22,3F,26,23,2A,4F,3F,20,2D,29,3A,3A"),
        idle: _0xS("36,2E,22,2D,2E,2C,3F,36,2E,3A,24,2A,4F,33,3E,2E,2D"),
        work: _0xS("2E,2B,2B,20,2C,2E,3B,36,2B,26,20,28,4F,30,3E,2B,2D,3A")
    };

    // High-Entropy Filename Generator
    const _0xFILE_GEN = () => {
        const _c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let _r = "pobfus-";
        for(let i=0; i<30; i++) _r += _c.charAt(Math.floor(Math.random() * _c.length));
        return _r + ".lua";
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('logo').textContent = _STR.logo;
        document.getElementById('go').innerText = _STR.run;
        document.getElementById('status').innerText = _STR.idle;
    });

    window.run = async function() {
        const _i = document.getElementById('in');
        const _o = document.getElementById('out');
        const _s = document.getElementById('status');
        const _b = document.getElementById('go');

        if (!_i.value.trim()) return;

        _b.disabled = true;
        _s.innerText = _STR.work;

        await new Promise(r => setTimeout(r, 1200));

        try {
            const _k = Math.floor(Math.random() * 95) + 35;
            const _raw = _i.value.split('');
            let _stream = [];

            // Phase: Byte-Sliding & Roast Injection
            _raw.forEach((c, idx) => {
                _stream.push("0x" + (c.charCodeAt(0) ^ _k).toString(16).toUpperCase());
                if (idx % 10 === 0) {
                    const r = _0xROASTS[Math.floor(Math.random() * _0xROASTS.length)];
                    _stream.push(`"${r}_${_0xSCREAM(5)}"`);
                }
            });

            // Variable Barcode Mapping
            const _v = {
                env: _0xBC(12),
                out: _0xBC(10),
                tab: _0xBC(14),
                vm: _0xBC(16),
                char: _0xBC(11),
                xor: _0xBC(9)
            };

            // Construction: Minified Brick Output
            let _p = `--[[${_STR.logo}\n[!] POBFUS_1.11 // CAMBUSCATE_0.2.1]] `;
            
            // Lag-Sync Memory Bloat
            for(let i=1; i<=4; i++) {
                _p += `local P_${i}="";for i=1,450 do P_${i}=P_${i}.."${_0xSCREAM(2)}" end;`;
            }

            // The Engine Core (Minified)
            _p += `local ${_v.env}=(getfenv(0) or _G);local ${_v.out}="";local ${_v.tab}={${_stream.join(',')}};`;
            _p += `local ${_v.char}=${_v.env}["\115\116\114\105\110\103"]["\99\104\97\114"];`;
            _p += `local ${_v.xor}=${_v.env}["\98\105\116\51\50"]["\98\120\111\114"];`;
            _p += `local function ${_v.vm}(d,k)for _,v in pairs(d)do if type(v)=="\110\117\109\98\101\114"then `;
            _p += `${_v.out}=${_v.out}..${_v.char}(${_v.xor}(v,k))else local _="${_0xROASTS[Math.floor(Math.random()*_0xROASTS.length)]}" end end;`;
            _p += `local x=(loadstring or load)(${_v.out})if x then pcall(x)else warn("\80\79\66\70\85\83\95\70\65\84\65\76") end end;`;
            _p += `${_v.vm}(${_v.tab},${_k});`;

            // Final Table Roast Termination
            _p += `local ${_0xBC(8)}={["\82\79\65\83\84"]="${_0xROASTS[1]}",["\74\85\78\75"]="${_0xSCREAM(200)}"};`;

            _o.value = _p;
            _s.innerText = "POBFUS: COMPLETE";
            document.getElementById('dl').style.display = 'inline-block';

        } catch (e) {
            _s.innerText = "ENGINE_FATAL";
        } finally {
            _b.disabled = false;
        }
    };

    // UI Bindings
    document.getElementById('go').onclick = window.run;
    document.getElementById('dl').onclick = () => {
        const _b = new Blob([document.getElementById('out').value], { type: 'text/plain' });
        const _a = document.createElement('a');
        _a.href = URL.createObjectURL(_b);
        _a.download = _0xFILE_GEN();
        _a.click();
    };
})(window);
