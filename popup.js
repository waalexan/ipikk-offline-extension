document.addEventListener('DOMContentLoaded', function() {
    // Atualiza status de conexão
    updateConnectionStatus();
    
    // Verifica status periodicamente
    setInterval(updateConnectionStatus, 5000);

    // Botão para visualizar página offline
    document.getElementById('viewOfflinePage').addEventListener('click', function() {
        chrome.tabs.create({ url: chrome.runtime.getURL('offline.html') });
    });

    // Botão para limpar cache
    document.getElementById('clearCache').addEventListener('click', function() {
        chrome.storage.local.clear(function() {
            alert('Cache offline limpo com sucesso!');
        });
    });

    // Carrega configurações salvas
    chrome.storage.sync.get(['autoOffline', 'notifications'], function(data) {
        document.getElementById('autoOffline').checked = data.autoOffline !== false;
        document.getElementById('notifications').checked = data.notifications !== false;
    });

    // Salva configurações quando alteradas
    document.getElementById('autoOffline').addEventListener('change', function() {
        chrome.storage.sync.set({ autoOffline: this.checked });
    });

    document.getElementById('notifications').addEventListener('change', function() {
        chrome.storage.sync.set({ notifications: this.checked });
    });
});

function updateConnectionStatus() {
    const statusElement = document.getElementById('status');
    
    if (navigator.onLine) {
        statusElement.textContent = 'Status: Online';
        statusElement.className = 'status online';
    } else {
        statusElement.textContent = 'Status: Offline - Modo offline ativado';
        statusElement.className = 'status offline';
    }
}