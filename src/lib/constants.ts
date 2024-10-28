export const AUTHROUTES = {
    login: '/login',
    resetPassword: '/private/reset-password',
    forgotPassword: '/forgot-password',
};

export const PUBLICROUTES = {
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

export const NAVIGATIONROUTES = {
    ...PUBLICROUTES,
    ...USERROUTES,
};

export const ACCOUNTROUTES = {
    profile: '/profile',
    settings: '/settings',
};

export const PROTECTEDROUTES = {
    ...ACCOUNTROUTES,
    ...USERROUTES,
}
