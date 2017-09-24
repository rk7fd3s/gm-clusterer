
$( function() {
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

  //ログイン処理
  $('#btnLogin').on('click', function(e) {
    $('.loginErrorMsg').hide();

    var email = $('#l_email').val();
    var password = $('#l_password').val();

    //ログイン処理
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        failedSignInWithEmailAndPassword(error);
      });
  });

  // ログインに失敗
  var failedSignInWithEmailAndPassword = function(error) {
    $('.loginErrorMsg').show();
  };

  //認証状態の確認
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      $(location).attr('href', '/origimond/mypage/');
    }
  });

});
