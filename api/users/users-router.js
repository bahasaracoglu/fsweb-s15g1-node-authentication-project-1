const userModel = require("./users-model");
const mw = require("../auth/auth-middleware");
const router = require("express").Router();

router.get("/", mw.sinirli, async (res, req, next) => {
  try {
    const users = await userModel.bul();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// `sinirli` middleware'ını `auth-middleware.js` dan require edin. Buna ihtiyacınız olacak!

/**
  [GET] /api/users

  Bu uç nokta SINIRLIDIR: sadece kullanıcı girişi yapmış kullanıcılar
  ulaşabilir.

  response:
  status: 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response giriş yapılamadıysa:
  status: 401
  {
    "message": "Geçemezsiniz!"
  }
 */

// Diğer modüllerde kullanılabilmesi için routerı "exports" nesnesine eklemeyi unutmayın.

module.exports = router;
