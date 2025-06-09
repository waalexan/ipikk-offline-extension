// Verifica status offline e recupera dados
chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.url.includes('ipikk.vercel.app') && !navigator.onLine) {
        handleOfflineMode();
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url.includes('ipikk.vercel.app') && !navigator.onLine) {
        handleOfflineMode();
    }
});

function handleOfflineMode() {
    chrome.tabs.query({url: "https://ipikk.vercel.app/*"}, (tabs) => {
        if (tabs[0]) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: getLocalStorageData
            }, (results) => {
                if (results && results[0]) {
                    const data = results[0].result;
                    chrome.storage.local.set({ipikkData: data}, () => {
                        chrome.tabs.create({url: chrome.runtime.getURL('offline.html')});
                    });
                }
            });
        }
    });
}

function getLocalStorageData() {
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        allData[key] = localStorage.getItem(key);
    }
    return allData;
}