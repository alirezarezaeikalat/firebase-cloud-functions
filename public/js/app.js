$(document).ready(function () {
  var sidenav = document.querySelector(".sidenav");
  // sidenav initializing
  M.Sidenav.init(sidenav);
  sidenav = M.Sidenav.getInstance(sidenav);
    // add request modal initializing 
  var addModal = document.querySelector('#add-request-modal');
  var instance = M.Modal.init(addModal);
  
  /// add request modal close button
  addModal = M.Modal.getInstance($('#add-request-modal')[0]);
  $('#cancel').click(function (e) {
    e.preventDefault();
    $('#add-form')[0].reset();
    addModal.close();
  })
});




