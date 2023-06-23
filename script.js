/*
File: script.js
GUI Assignment 4: Using the jQuery Plugin/UI with Your Dynamic Table PART 1
Masha Tsykora, UMass Lowell Computer Science, mary_tsykora@student.uml.edu
Copyright (c) 2023 by Masha Tsykora. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Updated on 6/23/23 at 7:10am.
Instructor: Professor Wenjin Zhou
Sources of Help: W3Schools, MDN Web Docs, CodingTheSmartway, C# Corner
Brief Overview: I updated my webpage that lets a user enter a column lower bound, a column upper bound,
a row lower bound, and a row upper bound. If the user doesn't enter a valid input in any of the forms, 
then an appropriate error message will be displayed underneath the "Submit" button. ADDITIONALLY, I added 
custom form-specific error messages that will display underneath the specific form where the error is.
I couldn't figure out how to do that with my "lowerBoundLarger" messages, so I kept the function as it originally
was in HW 3. I also kept the original error messages from my "rangeValidation" function, so there can be two sets 
of messages that appear: ones specific to each form where the error is, and ones that appear below the "submit" button.
Unfortunately, I wasn't able to figure out how to make the table scrollable, so it will stretch across
the page for larger inputs (didn't fix this from HW 3). I also didn't fix the "range" issue (from -50 to 50) from HW 3.
*I thought I'd correctly implemented the table being removed when an error message is shown, regardless of how the error 
message is generated. Unfortunately, this feature seems to be broken, and I'm not sure what exactly I did wrong.
*/



/* Here, I made a function called lowerBoundLarger that gets all the values from my forms and checks if the column & row lower bounds are larger than the column & row upper bounds */
function lowerBoundLarger(clbound, cubound, rlbound, rubound) {
  if (clbound > cubound) {
      return "Column Lower Bound is larger than the Column Upper Bound.";
  }

  if (rlbound > rubound) {
      return "Row Lower Bound is larger than the Row Upper Bound.";
  }

  return true; /* If my code reaches here, that means no, I don't have any larger lower bounds */
}


  
/* Here, I made a function called rangeValidation that gets all the values from my forms and checks if they are between 1 and 50 */
function rangeValidation(clbound, cubound, rlbound, rubound) {
  if (clbound < 1 || clbound > 50) {
      return "Column Lower Bound should be between 1 and 50.";
  }

  if (cubound < 1 || cubound > 50) {
      return "Column Upper Bound should be between 1 and 50.";
  }

  if (rlbound < 1 || rlbound > 50) {
      return "Row Lower Bound should be between 1 and 50.";
  }

  if (rubound < 1 || rubound > 50) {
      return "Row Upper Bound should be between 1 and 50.";
  }

  return true; /* If my code reaches here, that means no, I don't have any invalid ranges */
}



function multiplicationTable(clbound, rlbound, numRows, numCols) {
  /* Here, I'm first making a variable for my multiTable */
  var multiTable = document.getElementById("multiTable");
  multiTable.innerHTML = ""; 
  
  var table = document.createElement("table");

  /* Here, I'm making and initializing variables to create my multiplication table */
  var i = 0;
  var j = 0;
  var row;
  var multiCell;
  var currentRowVal;
  var currentColVal;

  for (i = 0; i < numRows; i++) {
      /* Here, I'm creating a new table row element */
      row = document.createElement("tr");

      for (j = 0; j < numCols; j++) {
          /* Here, I'm creating a new table cell element */
          multiCell = document.createElement("td");

          /* Here, I am making the first cell of my table empty (setting it to 'X') */
          if (i == 0 && j == 0) {
              multiCell.innerHTML = "X";
          } 
          /* After this code, I have to subtract 1 from everything in order to account for the extra row and column I made to display the ranges */
          
          /* Here, I'm making the extra row to display the column range */
          else if (i == 0) {
              currentColVal = clbound + j - 1;
              multiCell.innerHTML = currentColVal;
          }

          /* Here, I'm making the extra column to display the row range */
          else if (j == 0) {
              currentRowVal = rlbound + i - 1;
              multiCell.innerHTML = currentRowVal;
          }

          else {
              currentRowVal = rlbound + i - 1; /* Here, I start from the beginning row value and add 0, 1, 2, etc (in i) to get the current row value */
              currentColVal = clbound + j - 1; /* Here, I start from the beginning column value and add 0, 1, 2, etc (in j) to get the current column value */
              
              multiCell.innerHTML = currentRowVal * currentColVal;
          }
          row.appendChild(multiCell);
      }
      table.appendChild(row);
  }
  multiTable.appendChild(table);
}



/* Here, I wrapped the entire main code block (besides my three functions at the top) inside of .ready(function()) (jQuery code) */
$(document).ready(function() {
    /* Here, I also wrapped the code inside .validate and used it on my "boundsForm" code so I could make rules and messages for each
    of my bounds: clbound, cubound, min, and max. */
    $('#boundsForm').validate({
        rules: {
            clbound: {
                required: true,
                number: true,
                min: 1,
                max: 50
            },
            cubound: {
                required: true,
                number: true,
                min: 1,
                max: 50
            },
            rlbound: {
                required: true,
                number: true,
                min: 1,
                max: 50
            },
            rubound: {
                required: true,
                number: true,
                min: 1,
                max: 50
            }
        },

        /* Here, these error message appear beneath each individual bound where the error is occuring */
        messages: {
            clbound: {
                required: "Column Lower Bound is required.",
                number: "Column Lower Bound should be a number.",
                min: "Column Lower Bound should be at least 1.",
                max: "Column Lower Bound should be at most 50."
            },
            cubound: {
                required: "Column Upper Bound is required.",
                number: "Column Upper Bound should be a number.",
                min: "Column Upper Bound should be at least 1.",
                max: "Column Upper Bound should be at most 50."
            },
            rlbound: {
                required: "Row Lower Bound is required.",
                number: "Row Lower Bound should be a number.",
                min: "Row Lower Bound should be at least 1.",
                max: "Row Lower Bound should be at most 50."
            },
            rubound: {
                required: "Row Upper Bound is required.",
                number: "Row Upper Bound should be a number.",
                min: "Row Upper Bound should be at least 1.",
                max: "Row Upper Bound should be at most 50."
            }
        },

      /* Here, I added a custom CSS class so that I could style my error messages */
      errorClass: 'error', 

      /* Here, I wrapped all this code so it would work when the submit button was pressed  */
      submitHandler: function() { 
          /* I updated this code with jQuery syntax */
          /* Here, I'm getting the variable values for the column & row upper and lower bounds */
          var clbound = parseInt($('#clbound').val());
          var cubound = parseInt($('#cubound').val());
          var rlbound = parseInt($('#rlbound').val());
          var rubound = parseInt($('#rubound').val());
    
          /* Here, I'm making and setting the variable rangeValidationResult equal to the result from my rangeValidation function */
          var rangeValidationResult = rangeValidation(clbound, cubound, rlbound, rubound);
          
          /* Here, if our rangeValidation function returns FALSE, then we update the value of validationError to display said error message on the screen */
          if (rangeValidationResult !== true) {
              $('#errorMessage').html('<p>Error: ' + rangeValidationResult + '</p>');
              $('#multiTable').empty(); /* Here, I'm removing the table */
              return false;
          }
    
          /* Here, I'm making and setting the variable lowerBoundLargerResult equal to the result from my lowerBoundLarger function */
          var lowerBoundLargerResult = lowerBoundLarger(clbound, cubound, rlbound, rubound);
          if (lowerBoundLargerResult !== true) {
              $('#errorMessage').html('<p>Error: ' + lowerBoundLargerResult + '</p>');
              $('#multiTable').empty(); /* Here, I'm removing the table */
              return false;
          }
    
          /* Here, I'm making variables numRows and numCols, and setting them equal to their respective upper bounds minus their lower bounds plus two.
          ORIGINALLY, it would be plus one and not plus two, but I have to account for the extra row and extra column to display the row and column ranges.
          If I leave it as plus one instead of plus two, then my table will be missing a full row and column */
          var numRows = rubound - rlbound + 2;
          var numCols = cubound - clbound + 2;
          
          /* Here, I'm making a multiplication table by inputting all of the variables I used above */
          multiplicationTable(clbound, rlbound, numRows, numCols);
          $('#errorMessage').empty(); /* Here, I'm removing the error message */
    
          return false;
      }
    });
});