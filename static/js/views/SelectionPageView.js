import AbstractView from "./AbstractView.js";
import { getCouplesData } from "../stores/couples-store.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Selection");
  }

  enableListeners(){
    this.enableButtonListeners();

    const categorys = ["beginners", "new_school", "old_school", "trios", "walkers"];
    categorys.forEach(category => this.addDropdownListeners(category));
  }


  enableButtonListeners(){
    document.querySelectorAll("#selectionBtton").forEach((bttn) => {
     bttn.addEventListener("click", this.showPaymentPage.bind(this));
    })
   }

   showPaymentPage(){
  const template = document.getElementById('stripebttn');
      const firstClone = template.content.cloneNode(true);
      document.getElementById('maincontent').innerHTML = '';
      document.getElementById('maincontent').append(firstClone);
   }

   submitSelections(){ 
    // Assume you have a MongoDB collection called userSelections
    const userId = "user123"; // Replace with actual user id -- this will be a phone number
    const selection = {
      beginners: { "1st": "B12", "2nd": "B08", "3rd": "B21" },
      new_school: { "1st": "NS04", "2nd": "NS11", "3rd": "NS02" },
      old_school: { "1st": "OS07", "2nd": "OS01", "3rd": "OS12" },
      trios: { "1st": "T03", "2nd": "T09", "3rd": "T01" },
      walkers: { "1st": "W05", "2nd": "W02", "3rd": "W11" }
    };

    const payload = {
      userId,
      selection
    };

    // Save or update in MongoD
    
    /*
    await db.collection('userSelections').updateOne(
      { userId: userId },
      { $set: payload },
      { upsert: true }
    );
    */



      //Example of how the data will be stored in database
      // {
      //   "_id": ObjectId("665f7c2e8b3e2a1a2b123456"),
      //   "userId": "user123",
      //   "selection": {
      //     "beginners": { "1st": "B12", "2nd": "B08", "3rd": "B21" },
      //     "new_school": { "1st": "NS04", "2nd": "NS11", "3rd": "NS02" },
      //     "old_school": { "1st": "OS07", "2nd": "OS01", "3rd": "OS12" },
      //     "trios": { "1st": "T03", "2nd": "T09", "3rd": "T01" },
      //     "walkers": { "1st": "W05", "2nd": "W02", "3rd": "W11" }
      //   }
      // }


   }

   formatCategoryLabel(category) {
    const formatted = category.charAt(0).toUpperCase() + category.slice(1);
    if (formatted === "New_school") return "New School";
    if (formatted === "Old_school") return "Old School";
    return formatted;
  }

  // Save selections to sessionStorage
  saveSelections(category, selections) {
    sessionStorage.setItem(`selections_${category}`, JSON.stringify(selections));
  }

// Load selections from sessionStorage
  loadSelections(category) {
    const data = sessionStorage.getItem(`selections_${category}`);
    return data ? JSON.parse(data) : { "1st": "", "2nd": "", "3rd": "" };
  }

  // Render dropdowns with preselected values
  renderDropdowns(couplesJson, category) {
    const places = ["1st", "2nd", "3rd"];
    const coupleList = couplesJson[category] || [];
    const selections = this.loadSelections(category);

    return `
      <div class="selectedcategoryLabel">${this.formatCategoryLabel(category)}</div>
      <div class="selectcategory">
        ${places.map((place, idx) => `
          <div class="dropdownrow${idx % 2 === 0 ? ' divbackground' : ''}"> 
            <label class="selectlabel" for="${category}_${place}">${place} Place</label>
            <div class="catdropdown">
              <select class="select select-primary w-full max-w-xs" id="${category}_${place}">
                <option disabled ${!selections[place] ? 'selected' : ''}>Select A Couple</option>
                ${coupleList.map((c, i) => {
                  const val = `Couple ${i + 1}: ${c.male.firstName} ${c.male.lastName} & ${c.female.firstName} ${c.female.lastName}`;
                  return `<option value="${val}" ${selections[place] === val ? 'selected' : ''}>${val}</option>`;
                }).join('\n')}
              </select>
            </div>
          </div>
        `).join('\n')}
      </div>
    `;
  }

  addDropdownListeners(category) {
    const places = ["1st", "2nd", "3rd"];
    places.forEach(place => {
      const select = document.getElementById(`${category}_${place}`);
      if (select) {
        select.addEventListener('change', (event) => {
          this.handleSelectionChange(category, place, event.target.value);
        });
      }
    });
  }

  // Handler for dropdown change
// handleSelectionChange(category, place, value) {
//   const selections = this.loadSelections(category);
//   selections[place] = value;
//   this.saveSelections(category, selections);
// }

handleSelectionChange(category, place, value) {
  const selections = this.loadSelections(category);

  // Check if value is already selected in another place
  const isDuplicate = Object.entries(selections).some(
    ([key, val]) => key !== place && val === value
  );

  if (isDuplicate) {
    alert("This couple has already been selected for another place in this category.");
    // Optionally, reset the dropdown to its previous value
    const select = document.getElementById(`${category}_${place}`);
    if (select) select.value = selections[place] || "Select A Couple";
    return;
  }

  selections[place] = value;
  this.saveSelections(category, selections);
}


  async getHtml() {
    const couplesJson = await getCouplesData();
    return `

    <div class="rulelist">
      <ul class="steps steps-vertical">
      <li class="step step-primary">
      <a onclick="selectionPop.showModal()" class="inline-flex items-center gap-1">
        Review how to win the $500?
      </a>
    </li>
        <li class="step step-primary">Select Your Winners Below</li>
        <li class="step step-primary">Pay $5 to Enter your Choices</li>
        <li class="step step-primary">Receive Confirmation Code</li>
      </ul>
    </div>

    <div style="text-align: center">
    <button id="selectionBtton" class="btn btn-primary mt-10 mb-10">
      Pick Your Choices
    </button>
  </div>

    <!--CATEGORY BEGINNERS----------------------------->
    ${this.renderDropdowns(couplesJson, "beginners")}

    <!--CATEGORY NEW SCKOOL----------------------------->
    ${this.renderDropdowns(couplesJson, "new_school")}

    <!--CATEGORY OLD SCKOOL----------------------------->
    ${this.renderDropdowns(couplesJson, "old_school")}

    <!--CATEGORY TRIOS SCKOOL----------------------------->
    ${this.renderDropdowns(couplesJson, "trios")}

    <!--CATEGORY WALKERS SCKOOL----------------------------->
    ${this.renderDropdowns(couplesJson, "walkers")}


    <div style="text-align: center">
    <button id="selectionBtton" class="btn btn-primary mt-10">
      Pick Your Choices
    </button>
    <br><br>
  </div>

  <dialog id="selectionPop" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <p class="py-4">Press ESC key or click on ✕ button to close</p>
        <div class="contentwrapper">
          <pickem-rules></pickem-rules>
        </div>
      </div>
    </dialog>
    `;
  }
}
