let selectionModeActive = false;
let activeMenu = null;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleSelectionMode") {
    selectionModeActive = request.active;
    if (selectionModeActive) {
      enableSelectionMode();
    } else {
      disableSelectionMode();
    }
    sendResponse({ status: "ok" });
  }
});

function enableSelectionMode() {
  document.body.addEventListener("mouseover", handleMouseOver);
  document.body.addEventListener("mouseout", handleMouseOut);
  document.body.addEventListener("click", handleBubbleClick, true);
  document.addEventListener("keydown", handleKeyDown);
}

function disableSelectionMode() {
  document.body.removeEventListener("mouseover", handleMouseOver);
  document.body.removeEventListener("mouseout", handleMouseOut);
  document.body.removeEventListener("click", handleBubbleClick, true);
  document.removeEventListener("keydown", handleKeyDown);
  
  // Clean up any hover states
  const elements = document.querySelectorAll(".wa-converter-selectable");
  elements.forEach(el => el.classList.remove("wa-converter-selectable"));
  
  removeActiveMenu();
}

function handleMouseOver(e) {
  if (!selectionModeActive) return;
  const bubble = e.target.closest('[data-testid^="conv-msg-"]');
  if (bubble) {
    bubble.classList.add("wa-converter-selectable");
  }
}

function handleMouseOut(e) {
  const bubble = e.target.closest('[data-testid^="conv-msg-"]');
  if (bubble) {
    bubble.classList.remove("wa-converter-selectable");
  }
}

function handleKeyDown(e) {
  if (e.key === "Escape") {
    selectionModeActive = false;
    disableSelectionMode();
    // Notify popup if open
    chrome.runtime.sendMessage({ action: "selectionModeDisabled" }).catch(() => {});
  }
}

function handleBubbleClick(e) {
  if (!selectionModeActive) return;
  
  const bubble = e.target.closest('[data-testid^="conv-msg-"]');
  if (bubble) {
    e.preventDefault();
    e.stopPropagation();
    
    showContextMenu(bubble, e.pageX, e.pageY);
  }
}

function showContextMenu(bubble, x, y) {
  removeActiveMenu();
  
  const menu = document.createElement("div");
  menu.className = "wa-converter-menu";
  menu.style.left = `${x}px`;
  menu.style.top = `${y}px`;
  
  const optIncoming = document.createElement("div");
  optIncoming.className = "wa-converter-menu-item";
  optIncoming.innerText = "➡️ Convert to Incoming";
  optIncoming.addEventListener("click", () => {
    bubble.setAttribute("data-wa-type", "in");
    removeActiveMenu();
  });
  
  const optOutgoing = document.createElement("div");
  optOutgoing.className = "wa-converter-menu-item";
  optOutgoing.innerText = "⬅️ Convert to Outgoing";
  optOutgoing.addEventListener("click", () => {
    bubble.setAttribute("data-wa-type", "out");
    removeActiveMenu();
  });
  
  const optReset = document.createElement("div");
  optReset.className = "wa-converter-menu-item";
  optReset.innerText = "🔄 Reset";
  optReset.addEventListener("click", () => {
    bubble.removeAttribute("data-wa-type");
    removeActiveMenu();
  });
  
  const optCancel = document.createElement("div");
  optCancel.className = "wa-converter-menu-item cancel";
  optCancel.innerText = "Cancel";
  optCancel.addEventListener("click", () => {
    removeActiveMenu();
  });
  
  menu.appendChild(optIncoming);
  menu.appendChild(optOutgoing);
  menu.appendChild(optReset);
  menu.appendChild(optCancel);
  
  document.body.appendChild(menu);
  activeMenu = menu;
  
  // Close menu when clicking outside
  setTimeout(() => {
    document.addEventListener("click", closeMenuOnOutsideClick);
  }, 10);
}

function closeMenuOnOutsideClick(e) {
  if (activeMenu && !activeMenu.contains(e.target)) {
    removeActiveMenu();
  }
}

function removeActiveMenu() {
  if (activeMenu) {
    activeMenu.remove();
    activeMenu = null;
  }
  document.removeEventListener("click", closeMenuOnOutsideClick);
}
