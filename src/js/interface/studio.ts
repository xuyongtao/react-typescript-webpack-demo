import { BasicInfo, CourseBasic } from "./common";

export interface RequestIndexPageInfoPost {
    id: number;
}
export interface ReceiveIndexPageInfoPost {
    banners: string[];
    courses: CourseBasic[];
    teachers: BasicInfo[];
    intro: string;
}

export interface RequestTeacherListPost {
    id: number;
    role: number;
    page: number;
    perPage: number;
}
export interface ReceiveTeacherListPost {
    page: number;
    perPage: number;
    total: number;
    teachers: BasicInfo[];
}

export interface RequestIntroPost {
    id: number;
}
export interface ReceiveIntroPost {
    intro: string;
}