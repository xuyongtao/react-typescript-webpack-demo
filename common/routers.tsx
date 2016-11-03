const indexRouter = {
    isIndex: true,
    name: '推荐老师',
    to: 'recommend',
}

const hotRouter = {
    name: '热门老师',
    to: 'hot',
}

const teacherIntro = {
    name: '简介',
    to: 'teacherIntro',
}

const teacherCourses = {
    name: '课程',
    to: 'teacherCourses',
}

const teacherPhotos = {
    name: '相册',
    to: 'teacherPhotos'
}

export const indexRouters = [indexRouter, hotRouter];
export const teacherRouters = [teacherIntro, teacherCourses, teacherPhotos];