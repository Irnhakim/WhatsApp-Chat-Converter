document.addEventListener("DOMContentLoaded", () => {
  const toggleSelection = document.getElementById("toggleSelection");
  const statusBadge = document.getElementById("statusBadge");
  const toggleContainer = document.getElementById("toggleContainer");

  // Check if we are on WhatsApp Web
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab || !activeTab.url || !activeTab.url.includes("web.whatsapp.com")) {
      // Disable toggle if not on WhatsApp Web
      toggleSelection.disabled = true;
      statusBadge.innerText = "Error";
      statusBadge.className = "status-badge off";
      document.querySelector(".instructions").innerHTML = "<strong style='color:#f87171;'>This extension only works on WhatsApp Web (web.whatsapp.com).</strong>";
      return;
    }

    // Toggle switch click
    toggleSelection.addEventListener("change", () => {
      const isActive = toggleSelection.checked;
      updateStatusUI(isActive);
      
      // Send message to content script in active tab
      chrome.tabs.sendMessage(activeTab.id, {
        action: "toggleSelectionMode",
        active: isActive
      }).catch(err => {
        console.error("Failed to send message to WhatsApp Web. Please reload the page.", err);
        alert("Please refresh your WhatsApp Web page to start using this extension.");
        toggleSelection.checked = false;
        updateStatusUI(false);
      });
    });

    // Handle container click for better UX
    toggleContainer.addEventListener("click", (e) => {
      if (e.target !== toggleSelection && !toggleSelection.disabled) {
        toggleSelection.checked = !toggleSelection.checked;
        toggleSelection.dispatchEvent(new Event("change"));
      }
    });
  });

  // Listen for messages from content.js (e.g. ESC pressed)
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "selectionModeDisabled") {
      toggleSelection.checked = false;
      updateStatusUI(false);
    }
  });

  function updateStatusUI(isActive) {
    if (isActive) {
      statusBadge.innerText = "Active";
      statusBadge.className = "status-badge on";
    } else {
      statusBadge.innerText = "Disabled";
      statusBadge.className = "status-badge off";
    }
  }
});
