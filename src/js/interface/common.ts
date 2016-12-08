export interface BasicInfo {
    id?: number;
    role?: number;
    avatar?: string;
    name?: string;
    teachingAge?: number;
    certified?: boolean;
    selfIntro?: string;
}

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

interface ProfileCardBasic {
    id: number,
    role: number,
    avatarUrl?: string,
    name: string,
    selfIntro?: string,
    favCount?: number,
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

export interface RequestRecommendListPost {
    page: number,
    pageSize: number,
    isRecommend: boolean,
}
export interface ReceiveRecommendListPost {
    page: number,
    totalPage: number,
    list: RecommendListBasic[],
    isFetching?: boolean,
}
export interface RecommendListBasic extends ProfileCardBasic {

}

export interface RequestHotListPost {
    page: number,
    pageSize: number,
    isRecommend: boolean,
}
export interface ReceiveHotListPost {
    page: number,
    totalPage: number,
    list: HotListBasic[],
    isFetching?: boolean,
}
export interface HotListBasic extends ProfileCardBasic {

}

export interface RequestSearchListPost {
    page: number;
    pageSize: number;
    catId?: number;
    orderByFavCount?: boolean;
    orderByViewedCount?: boolean;
    teachingWay?: number;
    teachingAge?: number;
    role?: number;
    keyword?: string;
}
export interface ReceiveSearchListPost {
    page: number,
    totalPage: number,
    list: SearchListBasic[],
    isFetching?: boolean,
}
export interface SearchListBasic extends ProfileCardBasic {

}


