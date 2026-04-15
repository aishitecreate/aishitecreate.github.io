async function processStep(currentUrl, step) {
    const logBox = document.getElementById('log');
    logBox.innerHTML += `<div class="relay-status">[STEP ${step}] Querying Relay Engine...</div>`;

    // Switch to the updated Bypass.city endpoint which is currently the most reliable for PlatoRelay
    const apiEndpoint = `https://api.bypass.city/bypass?url=${encodeURIComponent(currentUrl)}`;
    
    // Maintain your recommended CORS Proxy format
    const proxiedUrl = `https://corsproxy.io/?url=${encodeURIComponent(apiEndpoint)}`;

    try {
        const response = await fetch(proxiedUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // This header sometimes helps engines bypass the 'Bot' check
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        // If the proxy returns a 404 or the API is down, response.ok will be false
        if (!response.ok) {
            throw new Error(`HTTP_${response.status}: Engine endpoint moved or offline.`);
        }

        const data = await response.json();

        // Bypass.city returns 'destination' or 'result'
        const finalUrl = data.destination || data.result || (data.query && data.query.destination);

        if (finalUrl) {
            // PlatoRelay/Auth links often require 2-3 steps
            if (finalUrl.includes("auth.platorelay") || finalUrl.includes("checkpoint")) {
                logBox.innerHTML += `<div class="relay-status">[WAIT] Relay handshake in progress. Retrying step...</div>`;
                // 3 second delay to prevent 'Too Many Requests' errors
                setTimeout(() => processStep(finalUrl, step + 1), 3000);
            } else {
                logBox.innerHTML += `<div style="color:var(--success)">[DONE] Sequence complete. Link Decrypted.</div>`;
                logBox.innerHTML += `<a href="${finalUrl}" target="_blank" class="final-link">${finalUrl}</a>`;
            }
        } else {
            logBox.innerHTML += `<div style="color:#f85149">[ERR] Engine returned invalid data.</div>`;
        }
    } catch (e) {
        logBox.innerHTML += `<div style="color:#f85149">[FATAL] ${e.message}</div>`;
        logBox.innerHTML += `<div style="font-size:10px; color:#8b949e;">Try refreshing the original link before pasting.</div>`;
    }
        }
