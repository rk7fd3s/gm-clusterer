var basepath = "/origimond/";
var site_config = {
  basepath: basepath,
  signupPath: basepath + "mypage/signup.html",
  loginPath: basepath + "mypage/login.html",
  loginFBPath: basepath + "mypage/loginFB.html",
  logoutPath: basepath + "mypage/logout.html",
  loginRedirect: basepath + "mypage/",
  logoutRedirect: basepath
};

//Firebase初期設定
var fb_config = {
  apiKey: "AIzaSyBNpikVcthtQX-C9mOBxDsvMcuoDLD_0dQ",
  authDomain: "gm-clusterer.firebaseapp.com",
  databaseURL: "https://gm-clusterer.firebaseio.com",
  projectId: "gm-clusterer",
  storageBucket: "gm-clusterer.appspot.com",
  messagingSenderId: "841745518490"
};
firebase.initializeApp(fb_config);

var authchk = $('head').attr('authchk') || false;
console.log("authchk:" + authchk);
var curPath = $(location).attr('pathname');
console.log("curPath:" + curPath);

if (authchk) {
  var signOut = false;
  //認証状態の確認
  var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    if (user) {
      // ログイン済み
      // ログインリンクをログアウトリンクに変更
      $(function() {
        $('.linkLogin').text('ログアウト');
        $('.linkLogin').on('click', function(e) {
          e.preventDefault();
          firebase.auth().signOut();

          signOut = true;
          location.replace(site_config.logoutRedirect);
        });
      });

      var userId = user.uid;
      return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var userDate = snapshot.val();
        if (userDate === null) {
          // ユーザデータの登録がない
          // TODO
        }
      });

    } else {
      if (!signOut) {
      // 未ログイン
        location.replace(site_config.loginPath);
      }
    }
  });
} else if (curPath === site_config.signupPath
        || curPath === site_config.loginPath) {
  var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      location.replace(site_config.loginRedirect);
      return;
    }
  });
}
