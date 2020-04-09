$(document).ready(function () {
  // materialize functions
  $('.sidenav').sidenav();
  $('.modal').modal();
  
  /// modal close button
  var addModal = M.Modal.getInstance($('.modal')[0]);
  $('#cancel').click(function (e) {
    e.preventDefault();
    $('#add-form')[0].reset();
    addModal.close();
  })
});

const button = document.querySelector('.call');

button.addEventListener('click', () => {
    // get functio reference
    const sayHello = firebase.functions().httpsCallable('sayHello');
    sayHello({name: 'alireza'}).then(result => {
      console.log(result.data);
    });
});


