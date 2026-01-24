import AbstractView from './AbstractView.js';
import { getCouplesData } from "../stores/couples-store.js";
import { getVotePercentageData } from "../stores/vote-percentage-store.js";


export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Landing');
    this.iMax = 3;
    this.categoryInputList = [
      ".begin-item-list",
      ".new-item-list",
      ".old-item-list",
      ".trio-item-list",
      ".walkers-item-list",
    ];
  }

  // Usage in your class (e.g., in constructor or an async init method)
  async initialize() {
    try {
      this.couplesData = await getCouplesData();
      // Now you can use this.couplesData in your rendering logic
    } catch (err) {
      console.error(err);
    }

    try {
      this.votePercentageData = await getVotePercentageData();
      // Now you can use this.couplesData in your rendering logic
    } catch (err) {
      console.error(err);
    }
  }

  enableListeners(){
    this.enabletablisteners();
  }

  enabletablisteners() {
    const tabs = document.querySelector(".tabwrapper");
    const tabButton = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tabcontent");
  
    tabs.onclick = (e) => {
      const id = e.target.dataset.id;
      if (id) {
        tabButton.forEach((btn) => {
          btn.classList.remove("tab-active");
        });
        e.target.classList.add("tab-active");
  
        contents.forEach((content) => {
          content.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
      }
    };
  }

  calculateValuePercentages(data) {
    const counts = {};
    let total = 0;
  
    data.forEach(entry => {
      const selection = entry.selection;
      Object.values(selection).forEach(category => {
        ["1st", "2nd", "3rd"].forEach(place => {
          const value = category[place];
          if (value) {
            counts[value] = (counts[value] || 0) + 1;
            total++;
          }
        });
      });
    });
  
    const percentages = {};
    Object.entries(counts).forEach(([value, count]) => {
      percentages[value] = ((count / total) * 100).toFixed(2);
    });
  
    return percentages;
  }

  showButton(){
    const bttn =`
    <div style="text-align: center" class="mt-6 mb-4">
      <button id="selectionBtton" class="btn btn-primary">
      <a href="#selection" data-link> Start Here! </a>
      </button>
    </div>`;
    return bttn;
  }
  
  // Example usage:
  // const result = calculateValuePercentages(yourArray);
  // console.log(result);

  generateCoupleRows(jsonData,percentages) {
    Object.keys(jsonData).forEach(category => {
      const rows = [];
      const arr = jsonData[category];
      arr.forEach((item, idx) => {
        rows.push(`
          <tr>
            <th>${idx + 1}</th>
            <td>${item.female.firstName} ${item.female.lastName} & ${item.male.firstName} ${item.male.lastName}</td>
            <td>
              <span>${Math.round(percentages[item.coupleId]) + "%"}</span>
              <progress class="progress progress-primary w-56" value="${Math.round(percentages[item.coupleId])}" max="100"></progress>
            </td>
          </tr>
        `);
        // Insert advertisement after 10th row or at the end if less than 10
        if (idx === 9 || (arr.length < 10 && idx === arr.length - 1)) {
          rows.push(`
            <tr>
              <td class="advertisement" colspan="4" style="text-align:center;">
                <div class="flex flex-col w-full border-opacity-50">
                  <div class="divider">Advertisement</div>
                  <div class="advertisement_${category}"></div>
                  <div class="divider">Advertisement</div>
                </div>
              </td>
            </tr>
          `);
        }
      });
      this[category] = `
        <div class="overflow-x-auto tabcontent ${category === 'beginners' ? 'active' : ''}" id="${category}">
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>Couples</th>
                <th>Fans Favorite to Place</th>
              </tr>
            </thead>
            <tbody>
              ${rows.join('')}
            </tbody>
          </table>
        </div>
      `;
    });
  }

  async getHtml() {
    const percentages = this.calculateValuePercentages(this.votePercentageData);
    this.generateCoupleRows(this.couplesData, percentages);
    return `
    <div class="stepperwrapper" style="display: none">
      <ul class="steps" style="z-index: -100">
        <li data-content="B" class="step step-primary">Beg</li>
        <li data-content="N" class="step step-primary">New</li>
        <li data-content="O" class="step step-primary">Old</li>
        <li data-content="T" class="step">Trio</li>
        <li data-content="W" class="step">Walkers</li>
      </ul>
    </div>
   ${this.showButton()}
    <dialog id="submitModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">
          Please select 3 couples in the following categories!
        </h3>
        <p class="py-4" id="listofcategories"></p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
    <div class="selectionrules">
      Submit Your Picks to have your chances to win $500!
    </div>
    <div style="height: 30px"><span class="filler">spacer</span></div>
    <div class="tabwrapper">
      <div class="tabs">
        <a class="tab tab-lifted tab-active" data-id="beginners">Begin</a>
        <a class="tab tab-lifted" data-id="new_school">New</a>
        <a class="tab tab-lifted" data-id="old_school">Old</a>
        <a class="tab tab-lifted" data-id="trios">Trios</a>
        <a class="tab tab-lifted" data-id="walkers">Walkers</a>
      </div>
    </div>
    <div class="alertmsg" id="alertmsg">
      <div class="alert alert-warning">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>You can only selected three couples!</span>
      </div>
    </div>

    <!--Beginners Contestants-->
    ${this.beginners}
    <!--New School Contestants-->
    ${this.new_school}
    <!--Old School Contestants-->
    ${this.old_school}
    <!--Trio Contestants-->
    ${this.trios}
    <!--Walkers Contestants-->
    ${this.walkers}

    ${this.showButton()}
    `;
  }
}
