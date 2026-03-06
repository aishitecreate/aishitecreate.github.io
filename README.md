# 🛡️ Pobfus v1.0.61 | The Monolith
### *High-Density Virtualization & Environment Spoofing*

[![Version](https://img.shields.io/badge/Release-v1.0.61--Stable-238636?style=for-the-badge&logo=github)](https://github.com/tenringsofdoom1x/Pobfus)
[![Build](https://img.shields.io/badge/Build-Lag--Sync_Enabled-7289DA?style=for-the-badge&logo=roblox)](https://tenringsofdoom1x.github.io/)
[![Status](https://img.shields.io/badge/Status-Operational-0078D4?style=for-the-badge)](https://tenringsofdoom1x.github.io/)

---

## 🧪 Legacy vs. Monolith (The v0.8 Evolution)

Before the **Monolith** architecture, Pobfus relied on a lighter, more transparent hex-mapping system. Below is the original interface from the 0.8 era:

![Legacy Interface](webpic.png)

### 🏗️ What changed in v1.0.61?
* **From Hex to Virtualization:** v0.8 was a simple encoder. v1.0.61 is a **Virtual Machine** that simulates execution logic.
* **Chaos-Pulse Injection:** We no longer produce clean hex. We now "Scream" between every 3rd byte with alphanumeric noise to break de-obfuscation patterns.
* **Lag-Sync Tiering:** Added a `v1-v5` memory-bloat sequence that makes the script feel "heavy" when executed in-game.

---

## 🧬 Technical Architecture

### 1. Multi-Stage Lag-Sync (v1 - v5)
The engine generates 5 distinct memory-allocation layers. When executed in Roblox, it forces the Lua VM to concatenate thousands of junk strings, creating a signature 1-second "hitch."



### 2. Environment Spoofing (`_genv`, `_renv`)
To confuse static analysis tools, the Monolith maps its own internal environment table:
* **_genv / _renv:** Redirected to the global registry or a safe-mock.
* **_fenv:** Used to fetch `string.char` and `bit32` at runtime, preventing simple "Search & Replace" de-obfuscation.



---

## 🚀 Pro-Features
* **Dual-Identity:** Randomly switches between two high-fidelity ASCII headers on load.
* **Table Shuffler:** Randomly allocates and wipes 800+ table entries upon execution to stress the Garbage Collector.
* **Bit-Register Slop:** Injects 15+ useless `bit32` math operations to bloat the header logic.

---

## 🛠️ Installation & Usage
1. **Host:** Upload `index.html`, `script.js`, and `webpic.png` (for the README) to your GitHub Repo.
2. **Deploy:** Enable GitHub Pages for your root domain.
3. **Protect:** Paste your code, hit **Protect Source**, and download your `.lua` file.

---

## ⚖️ License & Credits
Developed by **tenringsofdoom1x**. 
*Monolith v1.0.61 - The Final Brick Wall.*
