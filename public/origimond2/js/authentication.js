
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



//DOM取得
// var newuser = document.getElementById('newuser');
// var login = document.getElementById('login');
// var logout = document.getElementById('logout');
// var info = document.getElementById('info');


//
// //新規登録処理
// newuser.addEventListener('click', function(e) {
//   var email = document.getElementById('email').value;
//   var password = document.getElementById('password').value;
//
//   firebase.auth().createUserWithEmailAndPassword(email, password)
//   .catch(function(error) {
//     alert('登録できません（' + error.message + '）');
//   });
// });

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

//
// //ログイン処理
// login.addEventListener('click', function(e) {
//   var email = document.getElementById('email').value;
//   var password = document.getElementById('password').value;
//
//   firebase.auth().signInWithEmailAndPassword(email, password)
//   .catch(function(error) {
//     alert('ログインできません（' + error.message + '）');
//   });
// });


//
// //ログアウト処理
// logout.addEventListener('click', function() {
//   firebase.auth().signOut();
// });



  //認証状態の確認
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      $(location).attr('href', '/origimond/mypage/');
    }
  });

});
