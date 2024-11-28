export const AUTHROUTES = {
  login: '/login',
  resetPassword: '/reset-password',
  forgotPassword: '/forgot-password',
  auth: '/auth',
};

export const MAINROUTES = {
  home: '/',
  browse: '/browse',
  analytics: '/analytics',
  plagiarismTool: '/plagiarism-tool',
};

export const USERROUTES = {
  dashboard: '/dashboard',
  library: '/library',
  submit: '/submit',
  upload: '/upload',
  schedule: '/schedule',
  inbox: '/inbox',
};

export const NAVROUTES = {
  ...MAINROUTES,
  ...USERROUTES,
};

export const ACCOUNTROUTES = {
  profile: '/profile',
  settings: '/settings',
};

export const PROTECTEDROUTES = {
  ...ACCOUNTROUTES,
  ...USERROUTES,
};
