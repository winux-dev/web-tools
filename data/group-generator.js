// pointer to entries input textarea
const inputEntries = document.getElementById("entries");
const inputGroupCount = document.getElementById("group-count");
const outputDiv = document.getElementById("output");

function createGroups() {
			// clear debug console every button press
			console.clear();
			console.debug("User pressed button... clearing console");

			// split entries by newline
			let entries = inputEntries.value.split('\n');
			console.debug("Got entries:");
			console.debug(entries);

			// cancel if entries are empty
			if (entries == "") {
			    alert("Did you forgot to add the entries?");
				return;
			}

			// determine how much entries are inputted
			const entryCount = entries.length;
			console.debug("with length: "+ entryCount);

			// how much groups should be made
			const groupCount = inputGroupCount.value;
			console.debug("User says we should create: "+ groupCount +" groups");

			// check input validity
			if (entryCount < groupCount) {
			    alert("I think you asked for too much groups.");
				return;
			}
			if (!groupCount) {
			    alert("How much groups do you want to create?");
			    return;
			}

			// clear output div before continuing
			outputDiv.innerHTML = "";

			// determine number of entries per group
			let entriesPerGroup = Math.ceil(entryCount / groupCount);
			console.debug("We should have "+ entriesPerGroup +" entries per group");
			// group data storage
			let groups = [];

			// repeat until groupCount groups are created
			for (let group = 0; group < groupCount; group++) {
			    /***********************************************
				* CREATE A DIV TO DISPLAY EACH GROUP'S ENTRIES *
				***********************************************/
			    const display = document.createElement("div"); // create div object

				const displayTitle = document.createElement("h5"); // create div title object
				displayTitle.innerHTML = "Group " + (group + 1); // set div title to "Group {group}"
				display.appendChild(displayTitle); // add div title to div

				const displayList = document.createElement("ul"); // create div list object

				/***********************************************
				*            DATA PROCESSING SECTION           *
				***********************************************/
				// decrease the number of members per group
				// if the current value is not enough to fill
				// all remaining groups
				if (entriesPerGroup % (groupCount - group) != 0) {
				    entriesPerGroup = Math.round(entries.length / (groupCount - group));
					console.debug("Not enough entries left... setting entriesPerGroup to "+ entriesPerGroup);
				}
				// create new subarray for each group
				groups.push([]);
				// loop until enough entries are added to the group
			    for (let i = 0; i < entriesPerGroup; i++) {
					// set random index
					let index = Math.floor(Math.random() * (entries.length - 1));
					if (index <= 0) index = 0;
					console.debug("Index set to: "+ index);

					if (entries[index] == undefined) {
					    console.debug("No entry with index "+ index + "... cancelling iteration");
						continue;
					}

					// push a new entry into a group
					groups[group].push(
					    // remove a random entry from entries array
					    entries.splice(
							index, 1
						)[0] // this returns an array, we only want the spliced entry
					);
				}

				// add remaining elements if still remaining
				if (entries.length != 0 && group + 1 == groupCount) {
				    console.debug("Entries left. Adding remaining entries...");
				    while (entries.length != 0) {
						groups[groups.length - 1].push(entries.pop());
					}
				}

				/***********************************************
				*            DISPLAY DATA TO USER              *
				***********************************************/
				const groupLength = groups[group].length;
				for (let i = 0; i < groupLength; i++) {
				    const listItem = document.createElement("li");
					listItem.innerHTML = groups[group][i];
					displayList.appendChild(listItem);
				}
				display.appendChild(displayList);
				outputDiv.appendChild(display);
			}

			// TEST: output groups array to console
			console.debug("Groups created, here it is:")
			console.debug(groups);
}
