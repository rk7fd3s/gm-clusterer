const registrationModel = function() {
  const model = {
    'email': '',
    'passwd': '',
    'name_l': '',
    'name_f': '',
    'kana_l': '',
    'kana_f': '',
    'account': '',
    'tel': ''
  };

  this.getModel = function() {
    return model;
  };
  this.setModel = function(object) {
    // TODO ヴァリデート

    model.email = object.email;
    model.passwd = object.passwd;
    model.name_l = object.name_l;
    model.name_f = object.name_f;
    model.kana_l = object.kana_l;
    model.kana_f = object.kana_f;
    model.account = object.account;
    model.tel = object.tel;

    return this;
  };
};

const registrationMain = function(m) {
  return new Promise((resolve, reject) => {
    const rm = (m instanceof registrationModel) ? m : 'not instanceof registrationModel';

    const invalid = [
      rm instanceof String
    ].some(function(element, index, array) {
      return (element === false);
    });

    if (!invalid) {
      const model = rm.getModel();

      // アカウント生成待ち
      const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // 正常にログイン状態に
          const userId = user.uid;

          // DBにユーザ基本情報を設定
          firebase.database().ref('/users/' + userId).set(model).then(function() {
            // 正常に登録出来たらuser情報を返す
            resolve(user);
          }).catch(function(error) {
            reject(error);
          });
        } else {
          unsubscribe();
          reject("create user failed.");
        }
      });

      // メアド＆パスワードで新規アカウント追加
      firebase.auth().createUserWithEmailAndPassword(model.email, model.passwd)
        .catch(function(error) {
          reject(error);
        });
    } else {
      reject("invalid argument");
    }
  });
};
