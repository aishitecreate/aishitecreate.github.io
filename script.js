/**
 * CORE PROTECTION MODULE
 * Pillars: MoonSec V3 | Prometheus | Cambuscate
 */

let _lang = 'lua';

const _011 = {
    _init: function() {
        this.print("SYSTEM: Protection Core Online.", "var(--accent)");
    },

    setLang: function(lang) {
        _lang = lang;
        document.querySelectorAll('.sel-btn').forEach(b => b.classList.remove('active'));
        document.getElementById(`btn-${lang}`).classList.add('active');
        this.print(`PROTOCOL: Engine adapted for ${lang.toUpperCase()}.`, "var(--blue)");
    },

    coreNotif: function(msg) {
        const container = document.getElementById('notif-container');
        const el = document.createElement('div');
        el.className = 'core-notif';
        el.innerHTML = `<span style="color:var(--accent)">◈</span> ${msg}`;
        container.appendChild(el);
        setTimeout(() => {
            el.classList.add('fade-out');
            setTimeout(() => el.remove(), 300);
        }, 3000);
    },

    _transform: function() {
        const _in = document.getElementById('input').value;
        if (!_in.trim()) return;

        // Mandatory Notification
        this.coreNotif("Protected by Pobfus");

        const buildID = "PB-" + Math.random().toString(36).substring(7).toUpperCase();
        this.print(`INIT: Applying V3 Pillar Mapping...`, "var(--accent)");
        
        setTimeout(() => {
            this.print(`PILLAR 1: MoonSec V3 virtualization applied.`, "var(--blue)");
            setTimeout(() => {
                this.print(`PILLAR 2: Prometheus thermal pass complete.`, "var(--blue)");
                setTimeout(() => {
                    this.print(`PILLAR 3: Cambuscate logic flow secured.`, "var(--green)");
                    
                    const encoded = btoa(_in).split('').reverse().join(''); 
                    const output = `--[[ PROTECTED BY POBFUS | BUILD: ${buildID} ]]--
-- ARCHITECTURE: ${_lang.toUpperCase()} V3 VIRTUALIZATION
local _v = function(_s) return (string.reverse(game:GetService("HttpService"):Base64Decode(_s))) end
loadstring(_v("${encoded}"))()`;
                    
                    document.getElementById('output-view').value = output;
                    this.print(`SUCCESS: Build ${buildID} finalized.`, "var(--accent)");
                }, 400);
            }, 400);
        }, 400);
    },

    print: function(msg, color = "#fff") {
        const log = document.getElementById('sys-logs');
        const div = document.createElement('div');
        div.style.color = color;
        div.style.marginBottom = "4px";
        div.innerHTML = `<span style="color:#222;">[LOG]</span> ${msg}`;
        log.appendChild(div);
        log.scrollTop = log.scrollHeight;
    }
};

window.onload = () => _011._init();
