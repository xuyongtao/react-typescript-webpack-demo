export interface RequestTeacherIntroPost {
    id: number;
}
export interface ReceiveTeacherIntroPost {
    id: number;
    seniority: string;
    graduatedSchool: string;
    role: string;
    studio: string;
    intro: string;
    teachingCases: {
        startTime: string;
        endTime: string;
        cont: string;
        title: string;
    }[];
}