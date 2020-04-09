


$(document).ready(function () {
  $('.sidenav').sidenav();
  $('.modal').modal();

  /// close button
  var addModal = M.Modal.getInstance($('.modal')[0]);
  $('#cancel').click(function (e) {
    e.preventDefault();
    $('#add-form')[0].reset();
    addModal.close();

  })

});


