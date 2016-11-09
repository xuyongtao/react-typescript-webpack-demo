const indexRouter = {
    isIndex: true,
    name: '推荐',
    to: '/',
}

const hotRouter = {
    name: '热门',
    to: '/hot',
}

const teacherIntro = {
    isIndex: true,
    name: '简介',
    to: '/',
}

const teacherCourses = {
    name: '课程',
    to: '/courses',
}

const teacherPhotos = {
    name: '相册',
    to: '/photos'
}

export const indexRouters = [indexRouter, hotRouter];
export const teacherRouters = [teacherIntro, teacherCourses, teacherPhotos];