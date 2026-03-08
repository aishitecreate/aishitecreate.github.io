/**
 * script.js
 * Version: 1.12.01-21
 * Target: Mobile-Safe Metatable VM (.cs)
 */

const POBFUS_HEADER = `--[[
    ....      ..                       ..                               .x+=:.   
  +^""888h. ~"888h               . uW8"        oec :                   z\`    ^%  
 8X.  ?8888X  8888f         u.   \`t888        @88888     x.    .          .   <k 
'888x  8888X  8888~   ...ue888b   8888   .    8"*88%   .@88k  z88u      .@8Ned8" 
'88888 8888X   "88x:  888R Y888r  9888.z88N   8b.     ~"8888 ^8888    .@^%8888"  
 \`8888 8888X  X88x.   888R I888>  9888  888E u888888>   8888  888R   x88:  \`)8b. 
   \`*\` 8888X '88888X  888R I888>  9888  888E  8888R     8888  888R   8888N=*8888 
  ~\`...8888X  "88888  888R I888>  9888  888E  8888P     8888  888R    %8"    R88 
   x8888888X.   \`%8" u8888cJ888   9888  888E  *888>     8888 ,888B .   @8Wou 9%  
  '%"*8888888h.   "   "*888*P"   .8888  888"  4888     "8888Y 8888"  .888888P\`   
  ~    888888888!\`      'Y"       \`%888*%"    '888      \`Y"   'YP    \`   ^"F     
       X888^"""                      "\`        88R                               
       \`88f                                    88>                               
        88                                     48                                
        ""                                     '8                                
]]\n`;

const RAW_URL = "https://raw.githubusercontent.com/tenringsofdoom1x/tenringsofdoom1x.github.io/refs/heads/main/version.txt";
const DISHOOK = "https://discord.com/api/webhooks/1480014350755434558/lVhs2_YcG-LuG7zLjWSwBGzZPk2f1RF1fmRC5P7zZdgzJfX_fq2sdPAD81T4hOqMvfT2";
const VERSION = "1.12.01-21";

document.getElementById('goBtn').onclick = () => {
    const inputContent = document.getElementById('input').value;
    const kv = document.getElementById('keyValue').value || "UNSET_KEY";
    
    if (!inputContent.trim()) return alert("Error: No source code detected.");

    let protectedSource = `
        local HS = game:GetService("HttpService")
        local LP = game:GetService("Players").LocalPlayer
        
        local function shame(r)
            pcall(function()
                HS:PostAsync("${DISHOOK}", HS:JSONEncode({
                    ["embeds"] = {{
                        ["title"] = "🚨 pobfus.cs: TAMPER DETECTED",
                        ["description"] = "**Violation:** " .. r,
                        ["color"] = 41727,
                        ["fields"] = {
                            {["name"]="User", ["value"]=LP.Name.." ("..LP.UserId..")", ["inline"]=true},
                            {["name"]="Executor", ["value"]=(identifyexecutor and identifyexecutor() or "Unknown"), ["inline"]=true},
                            {["name"]="Account Age", ["value"]=tostring(LP.AccountAge).." Days", ["inline"]=true}
                        },
                        ["footer"] = {["text"] = "Sentinel v${VERSION}"}
                    }}
                }))
            end)
            LP:Kick("pobfus.cs: Virtual Machine Security Fault.")
        end

        local s, v = pcall(function() return HS:GetAsync("${RAW_URL}") end)
        if s and v:gsub("%s+", "") ~= "${VERSION}" then 
            game:GetService("StarterGui"):SetCore("SendNotification", {Title="pobfus.cs", Text="Update Required: "..v, Duration=5})
        end

        if _G.Key ~= "${kv}" then LP:Kick("pobfus.cs: Authentication Required.") return end
        
        local _ENV = setmetatable({}, {
            __index = function(_, k) 
                if k == "Crack" or k == "Dump" then shame("Unauthorized Indexing Attempt") end
                return getfenv()[k] 
            end,
            __metatable = "pobfus.cs"
        })

        ${inputContent}
    `;

    const xorKey = 0xBC;
    const bytecode = [];
    for(let i=0; i<protectedSource.length; i++) {
        bytecode.push("0x" + (protectedSource.charCodeAt(i) ^ xorKey).toString(16).padStart(2, '0'));
    }

    document.getElementById('output').value = POBFUS_HEADER + 
    `local _pobfus_vm = {${bytecode.join(", ")}}\n` +
    `local _decode = function(b, k)\n` +
    `    local s = ""\n` +
    `    for i=1, #b do s = s .. string.char(bit32.bxor(b[i], k)) end\n` +
    `    return s\n` +
    `end\n\n` +
    `local success, fault = pcall(function()\n` +
    `    return loadstring(_decode(_pobfus_vm, ${xorKey}))()\n` +
    `end)\n\n` +
    `if not success then\n` +
    `    warn("pobfus.cs: VM Integrity Error -> " .. tostring(fault))\n` +
    `end`;
};
