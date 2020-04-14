var errorModal = document.querySelector('#voting-error-modal');
M.Modal.init(errorModal);
var materialErrorModal = M.Modal.getInstance(errorModal);
const votingErrorMessage = document.querySelector('#voting-error-message');
var app = new Vue({
  el: "#requests-list",
  data: {
    requests: [],
    as: 'salam'
  },
  mounted() {
    const ref = firebase.firestore().collection('requests').orderBy('upvotes', 'desc');
    ref.onSnapshot(snapshot => {
      let requests = [];
      snapshot.docs.forEach(doc => {
        requests.push({...doc.data(), id: doc.id});
      });
      this.requests = requests;
    });
  },
  methods: {
    upvoteRequest(id) {
      const upvote = firebase.functions().httpsCallable("upvote");
      upvote({id: id}).catch(err => {
        materialErrorModal.open();
        votingErrorMessage.textContent = err.message;
        console.log(err.message);
      });
    }
  },
});

