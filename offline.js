document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('ipikkData', (result) => {
        const container = document.getElementById('offline-data');
        
        if (!result.ipikkData || Object.keys(result.ipikkData).length === 0) {
            container.innerHTML = '<p>Nenhum dado do iPikk encontrado no armazenamento local.</p>';
            return;
        }

        let html = '<h2>Dados do iPikk (offline)</h2>';
        for (const [key, value] of Object.entries(result.ipikkData)) {
            html += `
                <div class="data-item">
                    <div class="key">${key}:</div>
                    <div class="value">${value}</div>
                </div>
            `;
        }
        
        container.innerHTML = html;
    });
});