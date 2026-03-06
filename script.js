(function() {
    const POBFUS_LOGO = ` _______         __           ___                 
|_   __ \\       [  |        .' ..]                
  | |__) | .--.  | |.--.   _| |_  __   _   .--.   
  |  ___// .'\`\\ \\| '/'\`\\ \\'-| |-'[  | | | ( (\`\\]  
 _| |_   | \\__. ||  \\__/ |  | |   | \\_/ |, \`'.'.  
|_____|   '.__.'[__;.__.'  [___]  '.__.'_/([__) ) 
                                                  
     [ Pobfus 1.11.01 | CamBuscate 0.2.1 ]`;

    const ROASTS = [
        "your decompiler likes me~ too much...",
        "feed me to your poor decompiler senpai!!!~",
        "staring at my bytecode again? how lewd~",
        "is that a hook? how aggressive, senpai~"
    ];

    const generateBarcode = (l) => {
        let r = "I";
        for(let i=0; i<l; i++) r += "Il".charAt(Math.floor(Math.random() * 2));
        return r;
    };

    const generateFileName = () => {
        const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let r = "pobfus-";
        for(let i=0; i<25; i++) r += c.charAt(Math.floor(Math.random() * c.length));
        return r + ".lua";
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('logo').textContent = POBFUS_LOGO;

        const btnRun = document.getElementById('go');
        const btnCopy = document.getElementById('cp');
        const btnDown = document.getElementById('dl');
        const input = document.getElementById('in');
        const output = document.getElementById('out');
        const status = document.getElementById('status');

        btnRun.onclick = async () => {
            if (!input.value.trim()) return;
            
            btnRun.disabled = true;
            status.innerText = "CAMBUSCATE: VIRTUALIZING_STREAMS...";
            
            await new Promise(r => setTimeout(r, 1000));

            try {
                const key = Math.floor(Math.random() * 90) + 40;
                const bytes = input.value.split('');
                let stream = [];

                bytes.forEach((char, i) => {
                    stream.push("0x" + (char.charCodeAt(0) ^ key).toString(16).toUpperCase());
                    // The "Screaming Middle" Roast Injection
                    if (i % 8 === 0) {
                        const roast = ROASTS[Math.floor(Math.random() * ROASTS.length)];
                        stream.push(`"${roast}_${Math.random().toString(36).substring(7)}"`);
                    }
                });

                const v = {
                    env: generateBarcode(12),
                    out: generateBarcode(10),
                    tab: generateBarcode(14),
                    vm: generateBarcode(16)
                };

                // The MoonSec-Style Minified Brick Construction
                let lua = `--[[${POBFUS_LOGO}\n    [!] POBFUS_V1.11.01\n    [!] ENGINE: CAMBUSCATE_0.2.1]]\n`;
                
                // Anti-Decompiler Performance Slop
                for(let i=1; i<=3; i++) {
                    lua += `local P_${i}="";for i=1,350 do P_${i}=P_${i}.."${Math.random().toString(36).substring(7)}" end;`;
                }

                // Core Logic
                lua += `local ${v.env}=(getfenv(0) or _G);local ${v.out}="";local ${v.tab}={${stream.join(',')}};`;
                lua += `local function ${v.vm}(d,k)for _,v in pairs(d)do if type(v)=="\110\117\109\98\101\114"then `;
                lua += `${v.out}=${v.out}..${v.env}["\115\116\114\105\110\103"]["\99\104\97\114"](${v.env}["\98\105\116\51\50"]["\98\120\111\114"](v,k))`;
                lua += `else local _="${ROASTS[1]}" end end;`;
                lua += `local x,e=(loadstring or load)(${v.out});if x then local s,m=pcall(x)if not s then warn("\82\85\78\84\73\77\69\95\69\82\82: "..tostring(m))end else warn("\86\77\95\69\82\82: "..tostring(e))end end;`;
                lua += `${v.vm}(${v.tab},${key});`;

                // Table Termination Slop
                lua += `local ${generateBarcode(8)}={["\82\79\65\83\84"]="${ROASTS[2]}",["\74\85\78\75"]="${Math.random().toString(36).repeat(5)}"};`;

                output.value = lua;
                btnDown.style.visibility = "visible";
                status.innerText = "POBFUS: SUCCESS";
            } catch (e) {
                status.innerText = "ERROR: COMPILER_CRASH";
            } finally {
                btnRun.disabled = false;
            }
        };

        btnCopy.onclick = () => {
            output.select();
            document.execCommand('copy');
            status.innerText = "COPIED_TO_CLIPBOARD";
        };

        btnDown.onclick = () => {
            const blob = new Blob([output.value], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = generateFileName();
            a.click();
            status.innerText = "FILE_EXPORTED";
        };
    });
})();
