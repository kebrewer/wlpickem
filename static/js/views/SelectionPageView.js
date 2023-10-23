import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Selection");
  }

  async getHtml() {
    return `

    <!--CATEGORY BEGINNERS----------------------------->

    <div class="selectedcategoryLabel">Beginners</div>
    <div class="selectcategory">
    <!-- first place -->
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">1st Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- second place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">2nd Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- third place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">3rd Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
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
      <div class="dropdownrow"> 
      <label class="selectlabel" for="newschool">1st Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- second place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">2nd Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- third place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">3rd Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
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
      <div class="dropdownrow"> 
      <label class="selectlabel" for="oldschool">1st Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- second place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">2nd Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- third place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">3rd Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
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
      <div class="dropdownrow"> 
      <label class="selectlabel" for="trios">1st Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- second place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">2nd Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- third place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">3rd Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
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
      <div class="dropdownrow"> 
      <label class="selectlabel" for="walkers">1st Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- second place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">2nd Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->

    <!-- third place -->  
      <div class="dropdownrow"> 
      <label class="selectlabel" for="beginners">3rd Place</label>
      <div class="catdropdown">
        <select class="select-sm w-full max-w-xs">
          <option disabled selected>Pick your favorite Couple</option>
          <option>Couple 1: Tykman & Vicki Henninng</option>
          <option>Couple 2: Mark Alexander & Renee Brewer</option>
        </select>
      </div> <!-- end of catdropdown div-->
      </div> <!-- end of div row-->
    </div><!-- end of select category div-->

    `;
  }
}
