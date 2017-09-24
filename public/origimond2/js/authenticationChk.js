//Firebase初期設定
var config = {
  apiKey: "AIzaSyBNpikVcthtQX-C9mOBxDsvMcuoDLD_0dQ",
  authDomain: "gm-clusterer.firebaseapp.com",
  databaseURL: "https://gm-clusterer.firebaseio.com",
  projectId: "gm-clusterer",
  storageBucket: "gm-clusterer.appspot.com",
  messagingSenderId: "841745518490"
};
firebase.initializeApp(config);

//認証状態の確認
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log($(location).attr('pathname'));
    console.log('logined');
  } else {
    var curPath = $(location).attr('pathname');

    if (!curPath.match(/mypage\/logout.html/)) {
      $(location).attr('href', '/origimond/mypage/login.html');
    }
  }
});

function loginDisplay() {
  console.log($(location).attr('pathname'));
  console.log('logined');
}
