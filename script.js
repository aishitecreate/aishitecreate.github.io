/**
 * Pobfus 0.8 Beta - CamBuscate Engine
 * Lead Developer: tenringsofdoom1x
 */

const ASCII_LOGO = String.raw`
ooooooooo.              .o8        .o88o.                      
` + "`" + `888   ` + "`" + `Y88.           "888        888 ` + "`" + `"                      
 888   .d88'  .ooooo.   888oooo.  o888oo  oooo  oooo   .oooo.o 
 888ooo88P'  d88' ` + "`" + `88b  d88' ` + "`" + `88b  888    ` + "`" + `888  ` + "`" + `888  d88(  "8 
 888         888   888  888   888  888     888   888  ` + "`" + `"Y88b.  
 888         888   888  888   888  888     888   888  o.  )88b 
o888o        ` + "`" + `Y8bod8P'  ` + "`" + `Y8bod8P' o888o    ` + "`" + `V88V"V8P' 8""888P'`;

const VERSION_TAG = "\n          [ ENGINE: CAMBUSCATE 0.1 | V0.8 BETA ]";

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    const logoDisplay = document.getElementById('logoDisplay');
    if (logoDisplay) {
        logoDisplay.innerText = ASCII_LOGO + VERSION_TAG;
    }
    // Anti-Inspect Protection
    document.addEventListener('contextmenu', e => e.preventDefault());
});

/**
 * Generates a unique, high-entropy ID for filenames
 */
function generateId(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#@';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Main Obfuscation Engine
 */
function pobfusStart() {
    const input = document.getElementById('inputCode').value;
    if (!input) {
        alert("System Error: No source code detected in buffer.");
        return;
    }

    // CamBuscate 0.1 Integrity Logic
    // This links the decryption key to the exact byte length of the logo
    const logoSig = (ASCII_LOGO + VERSION_TAG).length % 255;
    const internalSeed = 0x4B; 
    const finalKey = internalSeed ^ logoSig;

    // XOR Virtualization
    const bytes = input.split('').map(c => c.charCodeAt(0) ^ finalKey);
    const vmName = "_0x" + Math.random().toString(36).substring(7);

    const outputVM = `--[[
${ASCII_LOGO}
${VERSION_TAG}
]]
local ${vmName} = function()
    local _data = {${bytes.join(',')}}
    local _sig = #debug.getinfo(1).source % 255
    local _k = ${internalSeed} ~ _sig
    local _res = ""
    for i=1, #_data do _res = _res .. string.char(_data[i] ~ _k) end
    local _f = loadstring or load
    local _ok, _exec = pcall(_f(_res))
    if not _ok then 
        warn("POBFUS V0.8: TAMPER DETECTED") 
        while true do end 
    end
end
pcall(${vmName})`;

    document.getElementById('outputCode').value = outputVM;
    console.log(`[POBFUS] Build successful. Entropy Key: ${finalKey}`);
}

/**
 * Clipboard & File Handling
 */
function copyToClipboard() {
    const el = document.getElementById('outputCode');
    if (!el.value) return;
    
    navigator.clipboard.writeText(el.value).then(() => {
        // Optional: Trigger a GitHub-style tooltip or toast here
        alert("Successfully copied to clipboard.");
    });
}

function downloadFile() {
    const content = document.getElementById('outputCode').value;
    if (!content) return;

    const uniqueId = generateId(16);
    const fileName = `pobfus-${uniqueId}.lua`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    
    console.log(`[FS] File Exported: ${fileName}`);
        }
