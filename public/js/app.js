const addForm = document.querySelector('#add-form');
var addModal = document.querySelector('#add-request-modal');

$(document).ready(function () {
  var sidenav = document.querySelector(".sidenav");
  // sidenav initializing
  M.Sidenav.init(sidenav);
  sidenav = M.Sidenav.getInstance(sidenav);
    // add request modal initializing 
  var instance = M.Modal.init(addModal);
  
  /// add request modal close button
  addModal = M.Modal.getInstance($('#add-request-modal')[0]);
  $('#cancel').click(function (e) {
    e.preventDefault();
    $('#add-form')[0].reset();
    addModal.close();
    sidenav.close();
  });

  /// add request to the database
  $('#add-form').submit(function (e) {
    e.preventDefault();
    const addRequest = firebase.functions().httpsCallable('addRequest');
    addRequest({
      text: addForm['request'].value
    }).then((result) => {
      addModal.close();
      addForm.reset();
      sidenav.close();
      $('#add-form .error').textContent = '';
    }).catch(err => {
      addForm.reset();
      $('#add-form .error')[0].textContent = err.message;
    });
  }); 
});






