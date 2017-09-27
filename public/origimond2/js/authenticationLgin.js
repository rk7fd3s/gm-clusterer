$( function() {
  //ログイン処理
  $('#btnLogin').on('click', function(e) {
    e.preventDefault();
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

  // FBログイン
  $('#btnFbLogin').on('click', function(e) {
    e.preventDefault();

    // 専用ページに遷移
    location.href = site_config.loginFBPath;
  });


  //新規登録処理
  $('.tourokuBtn a').on('click', function(e) {
    e.preventDefault();

    var email = $('#l_email').val();
    var password = $('#l_password').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(function(error) {
      console.log(error);
      alert('登録できません（' + error.message + '）');
    });
  });
});
