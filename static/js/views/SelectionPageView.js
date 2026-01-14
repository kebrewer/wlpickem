import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Selection");
  }

  enableListeners(){
    this.enableButtonListeners();
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

  async getHtml() {
    return `

    <div class="rulelist">
      <ul class="steps steps-vertical">
        <li class="step step-primary"><a onclick="selectionPop.showModal()">Review how to win the $500?</a></li>
        <li class="step step-primary">Select Your Winners Below</li>
        <li class="step step-primary">Pay $5 to Enter your Choices</li>
        <li class="step step-primary">Receive Confirmation Code</li>
      </ul>
    </div>

    <div style="text-align: center">
    <button id="selectionBtton" class="btn btn-primary">
      Pick Your Choices
    </button>
  </div>

    <!--CATEGORY BEGINNERS----------------------------->

    <div class="selectedcategoryLabel">Beginners</div>
    <div class="selectcategory">
    <!-- first place -->
      <div class="dropdownrow divbackground"> 
      <label class="selectlabel" for="beginners">1st Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- second place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">2nd Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- third place -->  
      <div class="dropdownrow divbackground"> 
      <label class="selectlabel" for="beginners">3rd Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->
    </div><!-- end of select category div-->


    <!--CATEGORY NEW SCKOOL----------------------------->

    <div class="selectedcategoryLabel">New School</div>
    <div class="selectcategory">
    <!-- first place -->
      <div class="dropdownrow divbackground"> 
      <label class="selectlabel" for="newschool">1st Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- second place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">2nd Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- third place -->  
      <div class="dropdownrow divbackground"> 
      <label class="selectlabel" for="beginners">3rd Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->
    </div><!-- end of select category div-->

    <!--CATEGORY OLD SCKOOL----------------------------->

    <div class="selectedcategoryLabel">Old School</div>
    <div class="selectcategory">
    <!-- first place -->
      <div class="dropdownrow divbackground"> 
      <label class="selectlabel" for="oldschool">1st Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- second place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">2nd Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- third place -->  
      <div class="dropdownrow divbackground"> 
      <label class="selectlabel" for="beginners">3rd Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->
    </div><!-- end of select category div-->

    <!--CATEGORY TRIOS SCKOOL----------------------------->
    <div class="selectedcategoryLabel">Trios</div>
    <div class="selectcategory">
    <!-- first place -->
      <div class="dropdownrow divbackground"> 
      <label class="selectlabel" for="trios">1st Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- second place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">2nd Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- third place -->  
      <div class="dropdownrow divbackground"> 
      <label class="selectlabel" for="beginners">3rd Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->
    </div><!-- end of select category div-->

    <!--CATEGORY WALKERS SCKOOL----------------------------->

    <div class="selectedcategoryLabel">Walkers</div>
    <div class="selectcategory">
    <!-- first place -->
      <div class="dropdownrow divbackground"> 
      <label class="selectlabel" for="walkers">1st Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- second place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">2nd Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- third place -->  
      <div class="dropdownrow divbackground"> 
      <label class="selectlabel" for="beginners">3rd Place</label>
      <div class="catdropdown">
        <select class="select select-primary w-full max-w-xs">
          <option disabled selected>Select A Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->
    </div><!-- end of select category div-->

    <div style="text-align: center">
    <button id="selectionBtton" class="btn btn-primary">
      Pick Your Choices
    </button>
    <br><br>
  </div>

  <dialog id="selectionPop" class="modal">
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


    `;
  }
}
