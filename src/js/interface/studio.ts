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

export interface RequestTeacherList {
    id: number;
    page: number;
    perPage: number;
}
export interface ReceiveTeacherList {
    page: number;
    perPage: number;
    total: number;
    teachers: BasicInfo[];
}