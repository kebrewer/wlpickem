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


  async getHtml() {
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
