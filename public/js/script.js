const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!")
}
const submitForm = () => {
  let formData = {
    first_name: $('#first_name').val(),
    last_name: $('#last_name').val(),
    password: $('#password').val(),
    email: $('#email').val()
  };

  // Make a POST request to insert the form data into MongoDB
  $.ajax({
    type: 'POST',
    url: '/api/projects/insert',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: function(response) {
      console.log('Data inserted successfully:', response);
    },
    error: function(xhr, status, error) {
      console.error('Error inserting data:', error);
    }
  });
}

const addCards = (items) => {
  items.forEach(item => {
    let itemToAppend = '<div class="col s4 center-align">' +
      '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.link + '</a></p></div>' +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' + item.desciption + '</p>' +
      '</div></div></div>';
    $("#card-section").append(itemToAppend)
  });
}

const getProjects = () => {
  $.get('/api/projects', (response) => {
    if (response.statusCode == 200) {
      addCards(response.data);
    }
  });
}

$(document).ready(function () {
  // Initialize Materialize components
  $('.materialboxed').materialbox();
  $('.modal').modal();

  // Function to open the modal when "click me" button is clicked
  $('#clickMeButton').click(function () {
    $('#modall').modal('open');
  });

  // Function to handle form submission
  $('#formSubmit').click(() => {
    submitForm();
  });

  // Call getProjects function to fetch and display projects
  getProjects();
});