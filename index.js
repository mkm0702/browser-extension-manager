const container = document.querySelector(".extensions-grid");
const btnDefault = document.querySelector(".tabD");
const btnActive = document.querySelector(".tabA");
const btnInactive = document.querySelector(".tabI");

let allExtensions = [];

// Load JSON data only once
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    allExtensions = data;
    renderExtensions("all");
  });

// Main render function
function renderExtensions(filterType) {
  container.innerHTML = "";

  const filteredData = allExtensions.filter((ext) => {
    if (filterType === "active") return ext.isActive;
    if (filterType === "inactive") return !ext.isActive;
    return true; // for "all"
  });

  filteredData.forEach((ext) => {
    const card = document.createElement("div");
    card.classList.add("extension-card");

    const isActiveClass = ext.isActive ? "active" : "";

    card.innerHTML = `
      <div class="extension-header">
        <div class="extension-icon">
          <img src="${ext.logo}" />
        </div>
        <div class="extension-info">
          <div class="extension-name">${ext.name}</div>
          <div class="extension-description">${ext.description}</div>
        </div>
      </div>
      <div class="extension-footer">
        <button class="remove-btn">Remove</button>
        <div class="toggle-switch ${isActiveClass}"></div>
      </div>
    `;

    container.appendChild(card);
  });
}

// Event delegation for remove button
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn")) {
    const card = e.target.closest(".extension-card");
    const extName = card.querySelector(".extension-name").innerText;

    // Optionally: remove from data
    allExtensions = allExtensions.filter((ext) => ext.name !== extName);

    card.remove();
    console.log(`Removed: ${extName}`);
  }
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("toggle-switch")) {
    const toggleSwitch = e.target;

    const card = e.target.closest(".extension-card");

    const extName = card.querySelector(".extension-name").innerText;
    let cardDetails = allExtensions.find((ext)=> ext.name === extName);
    console.log(cardDetails);

    if(cardDetails.isActive == true){
      cardDetails.isActive = false;
      toggleSwitch.classList.remove("active");

    }else{
      cardDetails.isActive = true;
      toggleSwitch.classList.add("active");
      
    }
    console.log(cardDetails);
  }
});

// Button click handlers
btnDefault.addEventListener("click", () => {
  setActiveTab(btnDefault);
  renderExtensions("all");
});

btnActive.addEventListener("click", () => {
  setActiveTab(btnActive);
  renderExtensions("active");
});

btnInactive.addEventListener("click", () => {
  setActiveTab(btnInactive);
  renderExtensions("inactive");
});

// Utility to manage active tab classes
function setActiveTab(activeBtn) {
  [btnDefault, btnActive, btnInactive].forEach((btn) =>
    btn.classList.remove("active")
  );
  activeBtn.classList.add("active");
}
