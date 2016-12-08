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

