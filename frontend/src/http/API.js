// 各项接口
export const API = {
  LOGIN: '/api/user/login',                                       // 登录
  CHANGE_PASSWORD: '/api/user/changePassword',                    // 修改密码
  REGISTER: '/api/user/register',                                 // 注册
  SEND_MAIL_CODE: '/api/user/emailCode',                          // 发送邮箱验证码
  // 标题列表
  GET_LEVEL_ONE: '/api/directory/getLevelOne',                    // 拉取一级标题
  GET_LEVEL_TWO: '/api/directory/getLevelTwo',                    // 拉取二级标题
  GET_LEVEL_THREE: '/api/directory/getLevelThree',                // 拉取三级标题
  ADD_LV1_TITLE: '/api/directory/addLv1Title',                    // 添加
  ADD_LV2_TITLE: '/api/directory/addLv2Title',                    // 添加二级标题
  ADD_LV3_TITLE: '/api/directory/addLv3Title',                    // 添加三级文章
  DELETE_TITLE: '/api/directory/deleteOneTitle',                  // 删除
  NEW_ARTICLE: '/api/article/newContent',                         // 新建内容
  MODIFY_ARTICLE: '/api/article/modifyContent',                   // 修改内容
  READ_ARTICLE: '/api/article/getContent',                        // 拉取内容
  GET_ONE_TITLE: '/api/directory/getOneTitle',                    // 拉取一条标题
  MODIFY_ONE_TITLE: '/api/directory/modifyOneTitle'               // 修改一条标题
}
