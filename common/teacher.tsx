export interface TeacherPostBasic {
    tid: number
}
export interface TeacherResBasic {
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

export interface RecommendTeachersPostBasic {
    page: number,
}

export interface RecommendTeachersResBasic {
    page: number,
    totalPage: number,
    teachers: RecommendTeacherBasic[],
    isFetching?: boolean,
}

export interface RecommendTeacherBasic {
    tid: number,
    avatar?: string,
    name: string,
    selfIntro?: string,
    starCount: number,
    viewedCount: number,
    teachingAge: number,
    certified: boolean,
    courses: {
        name: string,
        type?: string,
        floorPrice?: number,
    }[]
}
