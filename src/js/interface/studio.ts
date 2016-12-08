import { BasicInfo, CourseBasic } from "./common";

export interface RequestIndexPageInfoBasic {
    id: number;
}
export interface ReceiveIndexPageInfoBasic {
    banners: string[];
    courses: CourseBasic[];
    teachers: BasicInfo[];
    intro: string;
}