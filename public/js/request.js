var app = new Vue({
  el: "#requests-list",
  data: {
    requests: [],
    as: 'salam'
  },
  mounted() {
    const ref = firebase.firestore().collection('requests');
    
    ref.onSnapshot(snapshot => {
      let requests = [];
      snapshot.docs.forEach(doc => {
        requests.push({...doc.data(), id: doc.id});
      });
      this.requests = requests;
    });
  },
});

