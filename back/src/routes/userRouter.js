const express = require("express");
const userRouter = express.Router();
const { userService } = require("../services/userService");
const { loginRequired } = require("../middlewares/loginRequired");

userRouter.post("/register", async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기
    const { userName, email, password } = req.body;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      userName,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터가 db에 있는지 확인하고,
    // db 있을 시 로그인 성공 및, 토큰 및 관리자 여부 받아오기
    const loginResult = await userService.getUserToken({ email, password });

    res.status(200).json(loginResult);
  } catch (error) {
    next(error);
  }
});

//특정 사용자 불러오기
userRouter.get("/user", loginRequired, async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const currentUserInfo = await userService.getUserData(userId);

    res.status(200).json(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

//-----------------------------------------------------
// 사용자 관련
/* // 정보 수정, 삭제 관련 재확인시 현재 비밀번호 요청
userRouter.post(
  "/user/password/check",
  loginRequired,
  async function (req, res, next) {
    try {
      // req (request) 에서 데이터 가져오기
      const userId = req.currentUserId;
      const password = req.body.password;

      // 비밀번호 일치 여부 체크
      const checkResult = await userService.checkUserPassword(userId, password);

      res.status(200).json(checkResult);
    } catch (error) {
      next(error);
    }
  }
); */

// 사용자 정보 수정
userRouter.patch(
  "/users/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      // params로부터 _id를 가져옴(mongo db에서 자동 생성해주는 _id)
      const { userId } = req.params;
      console.log(req.body);
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const { userName, password, address, phoneNumber, role } = req.body;

      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      const currentPassword = req.body.currentPassword;

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
      }

      const userInfoRequired = { userId, currentPassword };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(userName && { userName }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(role && { role }),
      };

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.setUser(
        userInfoRequired,
        toUpdate
      );

      res.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  }
);
//삭제 전 현재 비밀번호 확인
userRouter.post(
  "/user/password/check",
  loginRequired,
  async function (req, res, next) {
    try {
      // req (request) 에서 데이터 가져오기
      const userId = req.currentUserId;
      const password = req.body.password;

      // 비밀번호가 알맞는지 여부를 체크함
      const checkResult = await userService.checkUserPassword(userId, password);

      res.status(200).json(checkResult);
    } catch (error) {
      next(error);
    }
  }
);
//사용자 삭제
userRouter.delete(
  "/users/:userId",
  loginRequired,
  async function (req, res, next) {
    try {
      // params로부터 id를 가져옴
      const { userId } = req.params;

      const deleteResult = await userService.deleteUserData(userId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userRouter;
