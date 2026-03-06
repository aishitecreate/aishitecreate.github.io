(function() {
    const iel = document.getElementById('in');
    const oel = document.getElementById('out');
    const log = document.getElementById('log');
    const upInput = document.getElementById('up');
    const mob = document.getElementById('mob');

    const push = (t) => { 
        log.innerText = `> ${t}`; 
        setTimeout(() => { if(log.innerText === `> ${t}`) log.innerText = ''; }, 4000);
    };

    // --- the auto-minify engine ---
    const minifyLogic = (src) => {
        return src
            .replace(/--\[\[[\s\S]*?\]\]/g, '') // remove multi-line comments
            .replace(/--.*$/gm, '')             // remove single-line comments
            .replace(/\s+/g, ' ')               // collapse whitespace
            .trim();
    };

    const todec = (s) => s.split('').map(c => "\\" + c.charCodeAt(0)).join('');
    
    const handleFile = (file) => {
        if (!file) return;
        const ext = file.name.split('.').pop().toLowerCase();
        if (['lua', 'js', 'txt'].indexOf(ext) === -1) return push("err_type_refused");
        const reader = new FileReader();
        reader.onload = (f) => { iel.value = f.target.result; push("stream_imported"); };
        reader.readAsText(file);
    };

    upInput.onchange = (e) => { handleFile(e.target.files[0]); upInput.value = ''; };

    iel.addEventListener('dragover', (e) => { e.preventDefault(); iel.style.background = "#111"; });
    iel.addEventListener('dragleave', () => { iel.style.background = ""; });
    iel.addEventListener('drop', (e) => {
        e.preventDefault();
        iel.style.background = "";
        handleFile(e.dataTransfer.files[0]);
    });

    // --- core processing ---
    document.getElementById('go').onclick = () => {
        let src = iel.value.trim();
        if(!src) return push("err_buffer_null");

        push("minifying_stream...");
        
        setTimeout(() => {
            try {
                // step 1: auto-minify
                src = minifyLogic(src);
                push("building_void...");

                // step 2: godly virtualization
                const k = Math.floor(Math.random() * 45) + 32;
                const d = Array.from(src).map(x => x.charCodeAt(0) ^ k).join(',');
                const h = todec("pobfus: logic active");

                let res = `--[[\n    pobfus // v1.11.05\n    auto-minified godly build\n]]\n\n`;
                res += `task.spawn(function() while task.wait(120) do print("${h}") end end);\n\n`;
                res += `local _0x_mem = {${d}}; \n`;
                res += `local _success, _error = pcall(function() \n`;
                
                if (mob && mob.checked) {
                    res += `    local _0x_buf = {}; for _, v in pairs(_0x_mem) do table.insert(_0x_buf, string.char(bit32.bxor(v, ${k}))) end; local _0x_str = table.concat(_0x_buf); \n`;
                } else {
                    res += `    local _0x_str = ""; for _, v in pairs(_0x_mem) do _0x_str = _0x_str .. string.char(bit32.bxor(v, ${k})) end; \n`;
                }
                
                res += `    local _0x_env = setmetatable({}, { \n`;
                res += `        __index = function(_, k) \n`;
                res += `            if k == "debug" or k == "getfenv" then return function() end end; \n`;
                res += `            return (getgenv and getgenv()[k] or _G[k]) \n`;
                res += `        end, \n`;
                res += `        __metatable = "locked" \n`;
                res += `    }); \n`;
                
                res += `    local _0x_vm = loadstring(_0x_str); \n`;
                res += `    setfenv(_0x_vm, _0x_env); \n`;
                res += `    task.spawn(_0x_vm); \n`;
                res += `end); \n`;
                
                oel.value = res; 
                push("build_complete");
            } catch (e) { 
                push("build_fault");
            }
        }, 1200);
    };

    document.getElementById('cp').onclick = () => {
        if(!oel.value) return push("err_empty");
        navigator.clipboard.writeText(oel.value); 
        push("buffer_copied");
    };

    document.getElementById('dl').onclick = () => {
        if(!oel.value) return push("err_empty");
        const blob = new Blob([oel.value], {type: "text/plain"});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = "pobfus_build.lua";
        a.click();
        push("file_dispatched");
    };

    document.getElementById('cl').onclick = () => {
        iel.value = ""; oel.value = ""; push("buffer_purged");
    };
})();
