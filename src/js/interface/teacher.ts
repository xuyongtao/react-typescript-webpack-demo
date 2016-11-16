export interface CoursesPostBasic {
    tid: number,
    page: number,
}

export interface CoursesResBasic {
    page: number,
    totalPage: number,
    courses: CourseBasic[]
}

export interface CourseBasic {
    cid: number,
    title: string,
    cover: string,
    detail: string
}


