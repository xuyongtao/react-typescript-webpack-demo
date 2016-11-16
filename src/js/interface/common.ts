export interface RequestBasicInfoPost {
    id: number;
    role: number;
}
export interface ReceiveBasicInfoPost {
    id: number;
    role: number;
    roleType?: string;
    name: string;
    avatar: string;
    selfIntro: string;
    teachingAge?: number;
    certified?: boolean;
}

export interface RequestRecommendListPost {
    page: number,
}
export interface ReceiveRecommendListPost {
    page: number,
    totalPage: number,
    list: RecommendListBasic[],
    isFetching?: boolean,
}
export interface RecommendListBasic {
    id: number,
    role: number,
    avatar?: string,
    name: string,
    selfIntro?: string,
    starCount?: number,
    viewedCount?: number,
    teachingAge?: number,
    certified?: boolean,
    courses: {
        cid: number,
        name: string,
        type?: string,
        floorPrice?: number,
    }[]
}

export interface RequestHotListPost {
    page: number,
}
export interface ReceiveHotListPost {
    page: number,
    totalPage: number,
    list: HotListBasic[],
    isFetching?: boolean,
}
export interface HotListBasic {
    id: number,
    role: number,
    avatar?: string,
    name: string,
    selfIntro?: string,
    starCount?: number,
    viewedCount?: number,
    teachingAge?: number,
    certified?: boolean,
    courses: {
        cid: number,
        name: string,
        type?: string,
        floorPrice?: number,
    }[]
}



