// Array to store device assignments
var assignments = [];

// Function to save assignment and handle keyboard events
function saveAssignment(event) {
  var badgeNumberInput = document.getElementById("badgeNumber");
  var deviceIDInput = document.getElementById("deviceID");

  var badgeNumber = badgeNumberInput.value;
  var deviceID = deviceIDInput.value;

  // Check if enter key is pressed
  if (event.keyCode === 13) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Check if badge number input is focused
    if (badgeNumberInput === document.activeElement) {
      // Focus on device ID input
      deviceIDInput.focus();
    } else if (deviceIDInput === document.activeElement) {
      // Check if device ID input is not empty
      if (deviceID.trim() !== "") {
        // Check if device ID is already assigned
        var existingAssignmentIndex = assignments.findIndex(function(assignment) {
          return assignment.deviceID === deviceID;
        });

        if (existingAssignmentIndex === -1) {
          // Create new assignment object
          var newAssignment = {
            badgeNumber: badgeNumber,
            deviceID: deviceID
          };

          // Add new assignment to the assignments array
          assignments.push(newAssignment);

          // Update table
          updateAssignmentTable();

          // Clear input fields
          badgeNumberInput.value = "";
          deviceIDInput.value = "";

          // Focus on badge number input field
          badgeNumberInput.focus();

          // Store assignments in localStorage
          storeAssignments();
        } else {
          // Remove assignment if device ID is already assigned
          assignments.splice(existingAssignmentIndex, 1);

          // Update table
          updateAssignmentTable();

          // Clear input fields
          badgeNumberInput.value = "";
          deviceIDInput.value = "";

          // Focus on badge number input field
          badgeNumberInput.focus();

          // Store assignments in localStorage
          storeAssignments();
        }
      }
    }
  }
}

// Function to update assignment table
function updateAssignmentTable() {
  var assignmentTable = document.getElementById("assignmentTable");
  assignmentTable.innerHTML = `
    <tr>
      <th>Badge Number</th>
      <th>Device ID</th>
    </tr>
  `;

  assignments.forEach(function(assignment) {
    var row = document.createElement("tr");
    var badgeNumberCell = document.createElement("td");
    var deviceIDCell = document.createElement("td");

    badgeNumberCell.textContent = assignment.badgeNumber;
    deviceIDCell.textContent = assignment.deviceID;

    row.appendChild(badgeNumberCell);
    row.appendChild(deviceIDCell);
    assignmentTable.appendChild(row);
  });
}

// Function to store assignments in localStorage
function storeAssignments() {
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

// Function to retrieve assignments from localStorage
function retrieveAssignments() {
  var storedAssignments = localStorage.getItem("assignments");
  if (storedAssignments) {
    assignments = JSON.parse(storedAssignments);
    updateAssignmentTable();
  }
}

// Function to reset data in the table
function clearData() {
    assignments = []; // Clear the assignments array
    updateAssignmentTable(); // Update the table
    storeAssignments(); // Store the cleared assignments in localStorage
  }

  // Function to create and download Excel file
function createExcel() {
    // Create a new workbook
    var workbook = XLSX.utils.book_new();
  
    // Convert assignments array to worksheet
    var worksheet = XLSX.utils.json_to_sheet(assignments);
  
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Assigned Devices");
  
    // Convert workbook to binary format
    var excelData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  
    // Create a Blob with Excel data
    var blob = new Blob([excelData], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
    // Create a download link and trigger the download
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "assigned_devices.xlsx";
    link.click();
  }
  
  // Focus on badge number input field when the page is refreshed
  window.onload = function() {
    // ...
  };
  
  // Event listener for keydown events
  document.addEventListener("keydown", saveAssignment);
  
  // Function to copy input value to clipboard
  function copyToClipboard(inputId) {
    // ...
  }
  
  // Function to copy the list of assignments
  function copyList() {
    // ...
  }
  
  // Function to copy text to clipboard
  function copyTextToClipboard(text) {
    // ...
  }
  

// Focus on badge number input field when the page is refreshed
window.onload = function() {
  var badgeNumberInput = document.getElementById("badgeNumber");
  badgeNumberInput.focus();

  // Retrieve assignments from localStorage
  retrieveAssignments();
};

// Event listener for keydown events
document.addEventListener("keydown", saveAssignment);

// Function to copy input value to clipboard
function copyToClipboard(inputId) {
  var inputElement = document.getElementById(inputId);
  inputElement.select();
  inputElement.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

// Function to copy the list of assignments
function copyList() {
  var assignmentList = assignments.map(function(assignment) {
    return assignment.badgeNumber + "\t" + assignment.deviceID;
  });

  var formattedList = assignmentList.join("\n");
  copyTextToClipboard(formattedList);
}

// Function to copy text to clipboard
function copyTextToClipboard(text) {
  var dummyElement = document.createElement("textarea");
  dummyElement.value = text;
  document.body.appendChild(dummyElement);
  dummyElement.select();
  document.execCommand("copy");
  document.body.removeChild(dummyElement);
}