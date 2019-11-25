// // Get references to page elements
// var $newMember = $("#submitForm");
// var $memberLogin = $("#memberLogin");
// var $allProfiles = $("#submit");
// var $singleProfile = $("#example-list");
// var $bill = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  newProfile: function(profile) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/profile",
      data: JSON.stringify(profile)
    });
  },
  getAllProfiles: function() {
    return $.ajax({
      url: "/api/clients",
      type: "GET"
    });
  },
  getOneProfile: function() {
    return $.ajax({
      url: "/api/clients/:id",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "/api/profile/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

const handleauth = async function(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const res = await $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "/api/auth",
    data: JSON.stringify({
      email,
      password
    })
  });
  if (res === "ok") {
    window.location.assign("/singleprofile");
  } else {
    window.location.assign("/singleprofile");
  }
  console.log(res);
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
