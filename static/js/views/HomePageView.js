import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Homepage');
    this.iMax = 3;
    this.categoryInputList = [
      ".begin-item-list",
      ".new-item-list",
      ".old-item-list",
      ".trio-item-list",
      ".walkers-item-list",
    ];
  
  }

  enableListeners(){
    this.enableButtonListeners();
    this.enableCheckboxListeners();
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

  getCount(category) {
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
  }


  applyCheckboxRules(cateory) {
    const maxNum = this.iMax;
    document.querySelectorAll(cateory).forEach((chk) => {
      chk.addEventListener("click", function (e) {
        if (document.querySelectorAll(`${cateory}:checked`).length > maxNum) {
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

  validInputs() {
    const output = this.categoryInputList.map(this.getCount);

    const invalidCategories = output.filter((cat) => {
      for (const [key, value] of Object.entries(cat)) {
        if (value < this.iMax) {
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

      for (let i = 0; i < displayFaultyCat.length; ++i) {
        let li = document.createElement("li");
        li.innerText = displayFaultyCat[i];
        modalContentDiv.appendChild(li);
      }
      submitModal.showModal();
    } else {
      //alert("will make a backend call to submit data");
      const template = document.getElementById('stripebttn');
      const firstClone = template.content.cloneNode(true);
      document.getElementById('maincontent').innerHTML = '';
      document.getElementById('maincontent').append(firstClone);
    }
  }

  enableCheckboxListeners(){
    this.categoryInputList.forEach((cateory) => this.applyCheckboxRules(cateory));
  }

  enableButtonListeners(){
//    document.querySelectorAll("#selectionBtton").forEach((bttn) => {
//     bttn.addEventListener("click", this.validInputs.bind(this));
//    })
  }

  async getHtml() {
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
    <div style="text-align: center">
      <button id="selectionBtton" class="btn btn-primary">
      <a href="#selection" data-link>Enter Here to Play</a>
      </button>
    </div>
    <dialog id="submitModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">
          Please select 3 couples in the following categories!
        </h3>
        <p class="py-4" id="listofcategories"></p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn"><a href="#selection" data-link>Close</a></button>
          </form>
        </div>
      </div>
    </dialog>

    <div style="height: 30px"><span class="filler">spacer</span></div>
    <div class="tabwrapper">
      <div class="tabs">
        <a class="tab tab-lifted tab-active" data-id="beg">Begin</a>
        <a class="tab tab-lifted" data-id="new">New</a>
        <a class="tab tab-lifted" data-id="old">Old</a>
        <a class="tab tab-lifted" data-id="trio">Trios</a>
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
    <div class="overflow-x-auto tabcontent active" id="beg">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Couples</th>
            <th>Fans Favorite to Place</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <th>1</th>
            <td>Audi Fortaine & Robert Walker</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <tr>
            <th>2</th>
            <td>Anajanae Wilson & Corey Marshall</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 3 -->
          <tr>
            <th>3</th>
            <td>Royce Banks & Jittaun Priest</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="30"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 4 -->
          <tr>
            <th>4</th>
            <td>Zakar Ali & Vicki Henning</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="70"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 5 -->
          <tr>
            <th>5</th>
            <td>Tori Robinson & Charlsie Hylicks</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 6 -->
          <tr>
            <th>6</th>
            <td>Taylar Raymond & Kevin Dockery</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 7-->
          <tr>
            <th>7</th>
            <td>Bobby Taylor & Sharon Bolden</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 8 -->
          <tr>
            <th>8</th>
            <td>Tabitha Hicks & Jamie Graham</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <tr>
            <td colspan="4" text-align="center">
              <div class="flex flex-col w-full border-opacity-50">
                <div class="divider">Advertisement</div>
                <div class="advertisement1"></div>
                <div class="divider">Advertisement</div>
              </div>
            </td>
          </tr>
          <!-- row 9 -->
          <tr>
            <th>9</th>
            <td>James Birganns & Juanita Ceaser</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 10 -->
          <tr>
            <th>10</th>
            <td>Andre Blackwell & Lady Margrette</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 11 -->
          <tr>
            <th>11</th>
            <td>Ed Donaldsonn & Danielle Woodard</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 12 -->
          <tr>
            <th>12</th>
            <td>Drew Alexander & Ann Hunter</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 13 -->
          <tr>
            <th>13</th>
            <td>Sherry Gorder & Westside Mike</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 14 -->
          <tr>
            <th>14</th>
            <td>Chemesha Grannt & Mark Alexander</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 15 -->
          <tr>
            <th>15</th>
            <td>Stuart Clark & Candace Haydenn</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 16 -->
          <tr>
            <th>16</th>
            <td>Maurice "SMOKE" AND Danitra</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 17 -->
          <tr>
            <th>17</th>
            <td>Darnell Smith & Msv Lovestostep</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 18 -->
          <tr>
            <th>18</th>
            <td>Selwyne Hodges & Nicole Wilburn</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 19 -->
          <tr>
            <th>19</th>
            <td>Reice Turner & Audrey Freeman</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 20 -->
          <tr>
            <th>20</th>
            <td>Mariska J. Lee & Quies Martin</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>

    <!--New School Contestants-->
    <div class="overflow-x-auto tabcontent" id="new">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Couples</th>
            <th>Fans Favorite to Place</th>
            
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <th>1</th>
            <td>Audi Fortaine & Robert Brewer</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <tr>
            <th>2</th>
            <td>Anajanae Wilson & Corey Marshall</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 3 -->
          <tr>
            <th>3</th>
            <td>Royce Banks & Jittaun Priest</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="30"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 4 -->
          <tr>
            <th>4</th>
            <td>Zakar Ali & Vicki Henning</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="70"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 5 -->
          <tr>
            <th>5</th>
            <td>Tori Robinson & Charlsie Hylicks</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 6 -->
          <tr>
            <th>6</th>
            <td>Taylar Raymond & Kevin Dockery</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 7-->
          <tr>
            <th>7</th>
            <td>Bobby Taylor & Sharon Bolden</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 8 -->
          <tr>
            <th>8</th>
            <td>Tabitha Hicks & Jamie Graham</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <tr>
            <td colspan="4" text-align="center">
              <div class="flex flex-col w-full border-opacity-50">
                <div class="divider">Advertisement</div>
                <div class="advertisement2"></div>
                <div class="divider">Advertisement</div>
              </div>
            </td>
          </tr>
          <!-- row 9 -->
          <tr>
            <th>9</th>
            <td>James Birganns & Juanita Ceaser</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 10 -->
          <tr>
            <th>10</th>
            <td>Andre Blackwell & Lady Margrette</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 11 -->
          <tr>
            <th>11</th>
            <td>Ed Donaldsonn & Danielle Woodard</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 12 -->
          <tr>
            <th>12</th>
            <td>Drew Alexander & Ann Hunter</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 13 -->
          <tr>
            <th>13</th>
            <td>Sherry Gorder & Westside Mike</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 14 -->
          <tr>
            <th>14</th>
            <td>Chemesha Grannt & Mark Alexander</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 15 -->
          <tr>
            <th>15</th>
            <td>Stuart Clark & Candace Haydenn</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 16 -->
          <tr>
            <th>16</th>
            <td>Maurice "SMOKE" AND Danitra</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 17 -->
          <tr>
            <th>17</th>
            <td>Darnell Smith & Msv Lovestostep</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 18 -->
          <tr>
            <th>18</th>
            <td>Selwyne Hodges & Nicole Wilburn</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 19 -->
          <tr>
            <th>19</th>
            <td>Reice Turner & Audrey Freeman</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 20 -->
          <tr>
            <th>20</th>
            <td>Mariska J. Lee & Quies Martin</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>

    <!--Old School Contestants-->
    <div class="overflow-x-auto tabcontent" id="old">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Couples</th>
            <th>Fans Favorite to Place</th>
            
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <th>1</th>
            <td>Audi Fortaine & Robert Walker</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <tr>
            <th>2</th>
            <td>Anajanae Wilson & Corey Marshall</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 3 -->
          <tr>
            <th>3</th>
            <td>Royce Banks & Jittaun Priest</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="30"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 4 -->
          <tr>
            <th>4</th>
            <td>Zakar Ali & Vicki Henning</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="70"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 5 -->
          <tr>
            <th>5</th>
            <td>Tori Robinson & Charlsie Hylicks</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 6 -->
          <tr>
            <th>6</th>
            <td>Taylar Raymond & Kevin Dockery</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 7-->
          <tr>
            <th>7</th>
            <td>Bobby Taylor & Sharon Bolden</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 8 -->
          <tr>
            <th>8</th>
            <td>Tabitha Hicks & Jamie Graham</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <tr>
            <td colspan="4" text-align="center">
              <div class="flex flex-col w-full border-opacity-50">
                <div class="divider">Advertisement</div>
                <div class="advertisement3"></div>
                <div class="divider">Advertisement</div>
              </div>
            </td>
          </tr>
          <!-- row 9 -->
          <tr>
            <th>9</th>
            <td>James Birganns & Juanita Ceaser</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 10 -->
          <tr>
            <th>10</th>
            <td>Andre Blackwell & Lady Margrette</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 11 -->
          <tr>
            <th>11</th>
            <td>Ed Donaldsonn & Danielle Woodard</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 12 -->
          <tr>
            <th>12</th>
            <td>Drew Alexander & Ann Hunter</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 13 -->
          <tr>
            <th>13</th>
            <td>Sherry Gorder & Westside Mike</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 14 -->
          <tr>
            <th>14</th>
            <td>Chemesha Grannt & Mark Alexander</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 15 -->
          <tr>
            <th>15</th>
            <td>Stuart Clark & Candace Haydenn</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 16 -->
          <tr>
            <th>16</th>
            <td>Maurice "SMOKE" AND Danitra</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 17 -->
          <tr>
            <th>17</th>
            <td>Darnell Smith & Msv Lovestostep</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 18 -->
          <tr>
            <th>18</th>
            <td>Selwyne Hodges & Nicole Wilburn</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 19 -->
          <tr>
            <th>19</th>
            <td>Reice Turner & Audrey Freeman</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 20 -->
          <tr>
            <th>20</th>
            <td>Mariska J. Lee & Quies Martin</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>

    <!--Trio Contestants-->
    <div class="overflow-x-auto tabcontent" id="trio">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Couples</th>
            <th>Fans Favorite to Place</th>
            
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <th>1</th>
            <td>Audi Fortaine & Robert Walker</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <tr>
            <th>2</th>
            <td>Anajanae Wilson & Corey Marshall</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 3 -->
          <tr>
            <th>3</th>
            <td>Royce Banks & Jittaun Priest</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="30"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 4 -->
          <tr>
            <th>4</th>
            <td>Zakar Ali & Vicki Henning</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="70"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 5 -->
          <tr>
            <th>5</th>
            <td>Tori Robinson & Charlsie Hylicks</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 6 -->
          <tr>
            <th>6</th>
            <td>Taylar Raymond & Kevin Dockery</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 7-->
          <tr>
            <th>7</th>
            <td>Bobby Taylor & Sharon Bolden</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 8 -->
          <tr>
            <th>8</th>
            <td>Tabitha Hicks & Jamie Graham</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <tr>
            <td colspan="4" text-align="center">
              <div class="flex flex-col w-full border-opacity-50">
                <div class="divider">Advertisement</div>
                <div class="advertisement4"></div>
                <div class="divider">Advertisement</div>
              </div>
            </td>
          </tr>
          <!-- row 9 -->
          <tr>
            <th>9</th>
            <td>James Birganns & Juanita Ceaser</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 10 -->
          <tr>
            <th>10</th>
            <td>Andre Blackwell & Lady Margrette</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 11 -->
          <tr>
            <th>11</th>
            <td>Ed Donaldsonn & Danielle Woodard</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 12 -->
          <tr>
            <th>12</th>
            <td>Drew Alexander & Ann Hunter</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 13 -->
          <tr>
            <th>13</th>
            <td>Sherry Gorder & Westside Mike</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 14 -->
          <tr>
            <th>14</th>
            <td>Chemesha Grannt & Mark Alexander</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 15 -->
          <tr>
            <th>15</th>
            <td>Stuart Clark & Candace Haydenn</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 16 -->
          <tr>
            <th>16</th>
            <td>Maurice "SMOKE" AND Danitra</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 17 -->
          <tr>
            <th>17</th>
            <td>Darnell Smith & Msv Lovestostep</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 18 -->
          <tr>
            <th>18</th>
            <td>Selwyne Hodges & Nicole Wilburn</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 19 -->
          <tr>
            <th>19</th>
            <td>Reice Turner & Audrey Freeman</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 20 -->
          <tr>
            <th>20</th>
            <td>Mariska J. Lee & Quies Martin</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>

    <!--Walkers Contestants-->
    <div class="overflow-x-auto tabcontent" id="walkers">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>Couples</th>
            <th>Fans Favorite to Place</th>
            
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr>
            <th>1</th>
            <td>Audi Fortaine & Robert Walker</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <tr>
            <th>2</th>
            <td>Anajanae Wilson & Corey Marshall</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 3 -->
          <tr>
            <th>3</th>
            <td>Royce Banks & Jittaun Priest</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="30"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 4 -->
          <tr>
            <th>4</th>
            <td>Zakar Ali & Vicki Henning</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="70"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 5 -->
          <tr>
            <th>5</th>
            <td>Tori Robinson & Charlsie Hylicks</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 6 -->
          <tr>
            <th>6</th>
            <td>Taylar Raymond & Kevin Dockery</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 7-->
          <tr>
            <th>7</th>
            <td>Bobby Taylor & Sharon Bolden</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 8 -->
          <tr>
            <th>8</th>
            <td>Tabitha Hicks & Jamie Graham</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <tr>
            <td colspan="4" text-align="center">
              <div class="flex flex-col w-full border-opacity-50">
                <div class="divider">Advertisement</div>
                <div class="advertisement5"></div>
                <div class="divider">Advertisement</div>
              </div>
            </td>
          </tr>
          <!-- row 9 -->
          <tr>
            <th>9</th>
            <td>James Birganns & Juanita Ceaser</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 10 -->
          <tr>
            <th>10</th>
            <td>Andre Blackwell & Lady Margrette</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 11 -->
          <tr>
            <th>11</th>
            <td>Ed Donaldsonn & Danielle Woodard</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 12 -->
          <tr>
            <th>12</th>
            <td>Drew Alexander & Ann Hunter</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 13 -->
          <tr>
            <th>13</th>
            <td>Sherry Gorder & Westside Mike</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 14 -->
          <tr>
            <th>14</th>
            <td>Chemesha Grannt & Mark Alexander</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 15 -->
          <tr>
            <th>15</th>
            <td>Stuart Clark & Candace Haydenn</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 16 -->
          <tr>
            <th>16</th>
            <td>Maurice "SMOKE" AND Danitra</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 17 -->
          <tr>
            <th>17</th>
            <td>Darnell Smith & Msv Lovestostep</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 18 -->
          <tr>
            <th>18</th>
            <td>Selwyne Hodges & Nicole Wilburn</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 19 -->
          <tr>
            <th>19</th>
            <td>Reice Turner & Audrey Freeman</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
          <!-- row 20 -->
          <tr>
            <th>20</th>
            <td>Mariska J. Lee & Quies Martin</td>
            <td>
              <span style="padding-right: 5px">10%</span
              ><progress
                class="progress progress-primary w-56"
                value="10"
                max="100"
              ></progress>
            </td>
            
          </tr>
        </tbody>
      </table>
    </div>

    <div style="height: 30px"><span class="filler">spacer</span></div>
    <div style="text-align: center">
    <button id="selectionBtton" class="btn btn-primary">
    <a href="#selection" data-link>Enter Here to Play</a>
    </button>
  </div>
    <div style="height: 30px"><span class="filler">spacer</span></div>

    <dialog id="my_modal_3" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <p class="py-4">Press ESC key or click on ✕ button to close</p>
        <div class="contentwrapper">
          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Couples</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr>
                <th>1</th>
                <td>Cy Ganderton & Hart Hagerty</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 2 -->
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="3"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 3 -->
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="3"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 4 -->
              <tr>
                <th>4</th>
                <td>Cy Ganderton</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="3"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 5 -->
              <tr>
                <th>5</th>
                <td>Hart Hagerty</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="3"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 6 -->
              <tr>
                <th>6</th>
                <td>Brice Swyre</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="40"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 7-->
              <tr>
                <th>7</th>
                <td>Cy Ganderton</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 8 -->
              <tr>
                <th>8</th>
                <td>Hart Hagerty</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 9 -->
              <tr>
                <th>9</th>
                <td>Brice Swyre</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 10 -->
              <tr>
                <th>10</th>
                <td>Cy Ganderton</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 11 -->
              <tr>
                <th>11</th>
                <td>Hart Hagerty</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 12 -->
              <tr>
                <th>12</th>
                <td>Brice Swyre</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 13 -->
              <tr>
                <th>13</th>
                <td>Cy Ganderton</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 14 -->
              <tr>
                <th>14</th>
                <td>Hart Hagerty</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 15 -->
              <tr>
                <th>15</th>
                <td>Brice Swyre</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 16 -->
              <tr>
                <th>16</th>
                <td>Cy Ganderton</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 17 -->
              <tr>
                <th>17</th>
                <td>Hart Hagerty</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 18 -->
              <tr>
                <th>18</th>
                <td>Brice Swyre</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 19 -->
              <tr>
                <th>19</th>
                <td>Cy Ganderton</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
              <!-- row 20 -->
              <tr>
                <th>20</th>
                <td>Hart Hagerty</td>
                <td>
                  10 %<progress
                    class="progress progress-primary w-56"
                    value="10"
                    max="100"
                  ></progress>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </dialog>

    <div style="width: 100%; text-align: center">
      <!-- <script async src="https://js.stripe.com/v3/buy-button.js"></script>

      <stripe-buy-button
        buy-button-id="buy_btn_1NzKqKFD6FDvUpvf4Q69WLqx"
        publishable-key="pk_live_51NzK2mFD6FDvUpvfgIDrt4Yvr7EdLmBPvv2KhTz1ZeMxOEGBhVCZc9wo6yNvPH04fFJcrnecWsjAsCrEOjm17KN0006C3fXt9H"
      >
      </stripe-buy-button> -->

      <!-- <script async
src="https://js.stripe.com/v3/buy-button.js">
</script>

<stripe-buy-button
buy-button-id="buy_btn_1O0deKFD6FDvUpvf90deDz9s"
publishable-key="pk_live_51NzK2mFD6FDvUpvfgIDrt4Yvr7EdLmBPvv2KhTz1ZeMxOEGBhVCZc9wo6yNvPH04fFJcrnecWsjAsCrEOjm17KN0006C3fXt9H"
>
</stripe-buy-button> -->
    </div>

    <a href="#selection" data-link>test</a>
    <a href="#confirmation" data-link>tes2</a>
        `;
  }
}
