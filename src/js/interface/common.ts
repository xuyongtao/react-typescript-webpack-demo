export interface CatBasic {
    label: string;
    id: string;
}

export interface BasicInfo {
    id?: number;
    role?: number;
    avatar?: string;
    name?: string;
    teachingAge?: number;
    certified?: boolean;
    selfIntro?: string;
}

export interface RequestCourseListPost {
    id: number;
    role: number;
    page: number;
    perPage: number;
}

export interface ReceiveCourseListPost {
    page: number;
    total: number;
    perPage: number;
    courses: CourseBasic[];
}

export interface PhotoBasic {
    mediumSrc: string;
    originalSrc: string;
}

export interface RequestPhotoListPost {
    id: number;
    role: number;
}

export interface ReceivePhotoListPost {
    photos: PhotoBasic[];
}

export interface CourseBasic {
    cid: number;
    title: string;
    cover: string;
    detail: string
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
    id: number;
    role: number;
    avatarUrl?: string;
    name: string;
    selfIntro?: string;
    favCount?: number;
    viewedCount?: number;
    teachingAge?: number;
    certified?: boolean;
    courses: {
        cid: number;
        name: string;
        type?: string;
        floorPrice?: number;
    }[]
}

export interface RequestRecommendListPost {
    page: number;
    pageSize: number;
    isRecommend: boolean;
}
export interface ReceiveRecommendListPost {
    page: number;
    total: number;
    perPage: number;
    list: RecommendListBasic[];
    isFetching?: boolean;
}
export interface RecommendListBasic extends ProfileCardBasic {

}

export interface RequestHotListPost {
    page: number;
    pageSize: number;
    isRecommend: boolean;
}
export interface ReceiveHotListPost {
    page: number;
    total: number;
    perPage: number;
    list: HotListBasic[];
    isFetching?: boolean;
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
    page: number;
    total: number;
    perPage: number;
    list: SearchListBasic[];
    isFetching?: boolean;
}
export interface SearchListBasic extends ProfileCardBasic {

}

export interface RequestCourseDetailPost {
    id: number;
}
export interface ReceiveCourseDetailPost {
    id: number;
    title: string;
    cover: string;
    cont: string;
    prices: {
        unit: string;
        inDoor: number;
        outDoor: number;
        online: number;
        other: number;
    }
}

export interface RequestBookingPost {
    id: number;
    name: string;
    mobile: string;
    mark: string;
}
export interface ReceiveBookingPost {

}

export interface RequestSuggestionPost {
    keyword: string;
}
export interface ReceiveSuggestionPost {
    cats: {
        cat_id: number;
        cat_ids: string;
        cat_labels: string;
    }[];
    users: {
        id: number;
        role: number;
        name: string;
    }[];
}