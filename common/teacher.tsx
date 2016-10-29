export interface TeacherPostBasic {
    tid: number
}
export interface TeacherBasic {
    tid: number,
    name: string,
    avatar: string,
    selfIntro: string,
    isFetching?: boolean
}

export interface CoursesPostBasic {
    tid: number,
    page: number,
}

export interface CoursesResBasic {
    page: number,
    pageCount: number,
    courses: CourseBasic[]
}

export interface CourseBasic {
    cid: number,
    title: string,
    cover: string,
    detail: string
}
