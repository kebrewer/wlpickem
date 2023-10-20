const on = () => {
  document.getElementById("overlay").style.display = "block";
}

const off = () => {
  document.getElementById("overlay").style.display = "none";
}

const getCount = function (category) {
  let retObj = {};

  if (category.includes("begin")) {
    retObj.beginners = document.querySelectorAll(
      `${category}:checked`
    ).length;
  }

  if (category.includes("new")) {
    retObj.new = document.querySelectorAll(`${category}:checked`).length;
  }

  if (category.includes("old")) {
    retObj.old = document.querySelectorAll(`${category}:checked`).length;
  }

  if (category.includes("trio")) {
    retObj.trios = document.querySelectorAll(`${category}:checked`).length;
  }

  if (category.includes("walkers")) {
    retObj.walkers = document.querySelectorAll(
      `${category}:checked`
    ).length;
  }

  return retObj;
};

const iMax = 3;
const categoryInputList = [
  ".begin-item-list",
  ".new-item-list",
  ".old-item-list",
  ".trio-item-list",
  ".walkers-item-list",
];

const applyCheckboxRules = cateory => {
  document.querySelectorAll(cateory).forEach((chk) => {
    chk.addEventListener("click", function (e) {
      if (document.querySelectorAll(`${cateory}:checked`).length > iMax) {
        e.preventDefault();
        let alertmessage = document.getElementById("alertmsg");
        alertmessage.classList.add("active");
        alertmessage.scrollIntoView();

        setTimeout(() => alertmessage.classList.remove("active"), 2500);
        return false;
      }
    });
  });
}

const validInputs = () => {
  const output = categoryInputList.map(getCount);

  const invalidCategories = output.filter((cat) => {
    for (const [key, value] of Object.entries(cat)) {
      if (value < iMax) {
        return true;
      }
    }
  });

  const displayFaultyCat = invalidCategories.map((category) => {
    for (const [key, value] of Object.entries(category)) {
      let categoryLabel = "";

      switch (key) {
        case "beginners":
          categoryLabel = "Begin - Beginners Category";
          break;
        case "new":
          categoryLabel = "New - New School Category";
          break;
        case "old":
          categoryLabel = "Old - Old School Category";
          break;
        case "trios":
          categoryLabel = "Trios - Trio Category";
          break;
        case "walkers":
          categoryLabel = "Walkers - Walkers Category";
          break;
      }

      return categoryLabel;
    }
  });

  if (displayFaultyCat.length > 0) {
    let modalContentDiv = document.getElementById("listofcategories");
    modalContentDiv.innerHTML = "";

    for (i = 0; i < displayFaultyCat.length; ++i) {
      let li = document.createElement("li");
      li.innerText = displayFaultyCat[i];
      modalContentDiv.appendChild(li);
    }
    submitModal.showModal();
  } else {
    //alert("will make a backend call to submit data");
    const template = document.getElementById("stripebttn");
    const firstClone = template.content.cloneNode(true);
    document.getElementById("maincontent").innerHTML = "";
    document.getElementById("maincontent").append(firstClone);
  }
}

// categoryInputList.forEach((cateory) => applyCheckboxRules(cateory));