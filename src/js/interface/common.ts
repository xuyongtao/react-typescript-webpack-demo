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
    list: RecommendBasic[],
    isFetching?: boolean,
}

export interface RecommendBasic {
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