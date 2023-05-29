const userModel = require("../users/users-model");
const bcrypt = require("bcryptjs");

/*
  Kullanıcının sunucuda kayıtlı bir oturumu yoksa

  status: 401
  {
    "message": "Geçemezsiniz!"
  }
*/
function sinirli() {}

/*
  req.body de verilen username halihazırda veritabanında varsa

  status: 422
  {
    "message": "Username kullaniliyor"
  }
*/
async function usernameBostami(req, res, next) {
  try {
    let { username } = req.body;
    const isExist = await userModel.goreBul({ username: username });
    if (isExist && isExist.length > 0) {
      res.status(442).json({ messsage: "Username kullaniliyor" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

/*
  req.body de verilen username veritabanında yoksa

  status: 401
  {
    "message": "Geçersiz kriter"
  }
*/
async function usernameVarmi() {
  try {
    let { username } = req.body;
    const isExist = await userModel.goreBul({ username: username });

    if (isExist && isExist.length > 0) {
      res.status(401).json({ messsage: "Geçersiz kriter" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

/*
  req.body de şifre yoksa veya 3 karakterden azsa

  status: 422
  {
    "message": "Şifre 3 karakterden fazla olmalı"
  }
*/
function sifreGecerlimi(res, req, next) {
  try {
    let { password } = req.body;
    if (!password || password.length < 3) {
      res.status(422).json({ message: "Şifre 3 karakterden fazla olmalı" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

/*
Payload'da iletilen bilgilere ait doğrulama
*/

function checkPayload(req, res, next) {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      res.status(422).json({ message: "Şifre 3 karakterden fazla olmalı" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkPayload,
  sifreGecerlimi,
  usernameVarmi,
  usernameBostami,
};

// Diğer modüllerde kullanılabilmesi için fonksiyonları "exports" nesnesine eklemeyi unutmayın.
