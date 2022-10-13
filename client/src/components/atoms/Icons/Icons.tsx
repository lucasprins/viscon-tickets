import React from 'react'

type IconProps = {
	size: string,
    fill: string, // Should be a TailwindCSS fill-color
    color: string, // Should be a TailwindCSS stroke-color
    strokeWidth?: number,
    direction?: string
}

export const IconAlert = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill={"none"}>
            <path className={fill} opacity="0.12" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
            <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconBell = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z" className={fill} />
            <path d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconBook = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M2 6.2C2 5.07989 2 4.51984 2.21799 4.09202C2.40973 3.71569 2.71569 3.40973 3.09202 3.21799C3.51984 3 4.07989 3 5.2 3H5.6C7.84021 3 8.96031 3 9.81596 3.43597C10.5686 3.81947 11.1805 4.43139 11.564 5.18404C12 6.03968 12 7.15979 12 9.4V21L11.8999 20.8499C11.2053 19.808 10.858 19.287 10.3991 18.9098C9.99286 18.5759 9.52477 18.3254 9.02161 18.1726C8.45325 18 7.82711 18 6.57482 18H5.2C4.0799 18 3.51984 18 3.09202 17.782C2.71569 17.5903 2.40973 17.2843 2.21799 16.908C2 16.4802 2 15.9201 2 14.8V6.2Z" className={fill} />
            <path d="M12 21L11.8999 20.8499C11.2053 19.808 10.858 19.287 10.3991 18.9098C9.99286 18.5759 9.52476 18.3254 9.02161 18.1726C8.45325 18 7.82711 18 6.57482 18H5.2C4.07989 18 3.51984 18 3.09202 17.782C2.71569 17.5903 2.40973 17.2843 2.21799 16.908C2 16.4802 2 15.9201 2 14.8V6.2C2 5.07989 2 4.51984 2.21799 4.09202C2.40973 3.71569 2.71569 3.40973 3.09202 3.21799C3.51984 3 4.07989 3 5.2 3H5.6C7.84021 3 8.96031 3 9.81596 3.43597C10.5686 3.81947 11.1805 4.43139 11.564 5.18404C12 6.03968 12 7.15979 12 9.4M12 21V9.4M12 21L12.1001 20.8499C12.7947 19.808 13.142 19.287 13.6009 18.9098C14.0071 18.5759 14.4752 18.3254 14.9784 18.1726C15.5467 18 16.1729 18 17.4252 18H18.8C19.9201 18 20.4802 18 20.908 17.782C21.2843 17.5903 21.5903 17.2843 21.782 16.908C22 16.4802 22 15.9201 22 14.8V6.2C22 5.07989 22 4.51984 21.782 4.09202C21.5903 3.71569 21.2843 3.40973 20.908 3.21799C20.4802 3 19.9201 3 18.8 3H18.4C16.1598 3 15.0397 3 14.184 3.43597C13.4314 3.81947 12.8195 4.43139 12.436 5.18404C12 6.03968 12 7.15979 12 9.4" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconBuilding = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M15 14H9V21H15V14Z" />
            <path d="M15 21V15.6C15 15.0399 15 14.7599 14.891 14.546C14.7951 14.3578 14.6422 14.2049 14.454 14.109C14.2401 14 13.9601 14 13.4 14H10.6C10.0399 14 9.75992 14 9.54601 14.109C9.35785 14.2049 9.20487 14.3578 9.10899 14.546C9 14.7599 9 15.0399 9 15.6V21M19 21V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.07989 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V21M21 21H3M9.5 8H9.51M14.5 8H14.51M10 8C10 8.27614 9.77614 8.5 9.5 8.5C9.22386 8.5 9 8.27614 9 8C9 7.72386 9.22386 7.5 9.5 7.5C9.77614 7.5 10 7.72386 10 8ZM15 8C15 8.27614 14.7761 8.5 14.5 8.5C14.2239 8.5 14 8.27614 14 8C14 7.72386 14.2239 7.5 14.5 7.5C14.7761 7.5 15 7.72386 15 8Z"strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconCheck = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconChevron = ({ size, fill, color, strokeWidth = 2, direction }: IconProps) => {
    switch (direction) {
        case 'down':
            return (
                <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path d="M6 9L12 15L18 9" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case 'up':
            return (
                <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path d="M18 15L12 9L6 15" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
    }
    // Return a chevron pointing right by default
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export const IconClose = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconCube = ({ size, fill = 'none', color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M12 12L21 7V16.0586C21 16.4012 21 16.5725 20.9495 16.7253C20.9049 16.8605 20.8318 16.9846 20.7354 17.0893C20.6263 17.2076 20.4766 17.2908 20.177 17.4572L12.777 21.5683C12.4934 21.7259 12.3516 21.8047 12.2015 21.8355C12.0685 21.8629 11.9315 21.8629 11.7986 21.8355C11.6484 21.8047 11.5066 21.7259 11.223 21.5683L3.82297 17.4572C3.52345 17.2908 3.37369 17.2076 3.26463 17.0893C3.16816 16.9846 3.09515 16.8605 3.05048 16.7253C3 16.5725 3 16.4012 3 16.0586V7L12 12Z" className={fill} />
            <path d="M12 2.50008V12.0001M12 12.0001L20.5 7.27779M12 12.0001L3.5 7.27779M12 12.0001V21.5001M20.5 16.7223L12.777 12.4318C12.4934 12.2742 12.3516 12.1954 12.2015 12.1645C12.0685 12.1372 11.9315 12.1372 11.7986 12.1645C11.6484 12.1954 11.5066 12.2742 11.223 12.4318L3.5 16.7223M21 16.0586V7.94153C21 7.59889 21 7.42757 20.9495 7.27477C20.9049 7.13959 20.8318 7.01551 20.7354 6.91082C20.6263 6.79248 20.4766 6.70928 20.177 6.54288L12.777 2.43177C12.4934 2.27421 12.3516 2.19543 12.2015 2.16454C12.0685 2.13721 11.9315 2.13721 11.7986 2.16454C11.6484 2.19543 11.5066 2.27421 11.223 2.43177L3.82297 6.54288C3.52345 6.70928 3.37369 6.79248 3.26463 6.91082C3.16816 7.01551 3.09515 7.13959 3.05048 7.27477C3 7.42757 3 7.59889 3 7.94153V16.0586C3 16.4013 3 16.5726 3.05048 16.7254C3.09515 16.8606 3.16816 16.9847 3.26463 17.0893C3.37369 17.2077 3.52345 17.2909 3.82297 17.4573L11.223 21.5684C11.5066 21.726 11.6484 21.8047 11.7986 21.8356C11.9315 21.863 12.0685 21.863 12.2015 21.8356C12.3516 21.8047 12.4934 21.726 12.777 21.5684L20.177 17.4573C20.4766 17.2909 20.6263 17.2077 20.7354 17.0893C20.8318 16.9847 20.9049 16.8606 20.9495 16.7254C21 16.5726 21 16.4013 21 16.0586Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconGear = ({ size, fill = 'none', color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" fillRule="evenodd" clipRule="evenodd" d="M9.87353 20.6856L9.28909 19.3711C9.08085 18.902 8.72917 18.511 8.28464 18.2544C7.83986 17.9979 7.32531 17.8886 6.81464 17.9422L5.38464 18.0944C4.959 18.1392 4.52952 18.0596 4.14815 17.8654C3.76678 17.6712 3.44987 17.3706 3.23575 17C3.02157 16.6295 2.91953 16.2047 2.94202 15.7773C2.9645 15.3499 3.11054 14.9382 3.36242 14.5922L4.20908 13.4289C4.51103 13.0137 4.67362 12.5134 4.67353 12C4.67362 11.4866 4.51103 10.9864 4.20908 10.5711L3.36242 9.40778C3.11054 9.06176 2.9645 8.65007 2.94202 8.22267C2.91953 7.79528 3.02157 7.37054 3.23575 7C3.44966 6.62924 3.76653 6.32849 4.14796 6.13423C4.52938 5.93997 4.95897 5.86053 5.38464 5.90556L6.81909 6.05778C7.32975 6.11141 7.8443 6.00212 8.28908 5.74556C8.73196 5.48825 9.08201 5.09736 9.28909 4.62889L9.87353 3.31444C10.0473 2.92317 10.3308 2.59072 10.6898 2.3574C11.0487 2.12408 11.4676 1.99993 11.8958 2C12.3239 1.99993 12.7428 2.12408 13.1017 2.3574C13.4607 2.59072 13.7442 2.92317 13.918 3.31444L14.5069 4.62889C14.7139 5.09736 15.064 5.48825 15.5069 5.74556C15.9516 6.00212 16.4662 6.11141 16.9769 6.05778L18.4069 5.90556C18.8325 5.86053 19.2621 5.93997 19.6435 6.13423C20.025 6.32849 20.3418 6.62924 20.5558 7C20.7699 7.37054 20.872 7.79528 20.8495 8.22267C20.827 8.65007 20.681 9.06176 20.4291 9.40778L19.5824 10.5711C19.2805 10.9864 19.1179 11.4866 19.118 12C19.1154 12.5148 19.2765 13.0171 19.578 13.4344L20.4246 14.5978C20.6765 14.9438 20.8226 15.3555 20.845 15.7829C20.8675 16.2103 20.7655 16.635 20.5513 17.0056C20.3374 17.3763 20.0205 17.6771 19.6391 17.8713C19.2577 18.0656 18.8281 18.145 18.4024 18.1L16.9724 17.9478C16.4618 17.8941 15.9472 18.0034 15.5024 18.26C15.0604 18.5159 14.7105 18.9047 14.5024 19.3711L13.918 20.6856C13.7442 21.0768 13.4607 21.4093 13.1017 21.6426C12.7428 21.8759 12.3239 22.0001 11.8958 22C11.4676 22.0001 11.0487 21.8759 10.6898 21.6426C10.3308 21.4093 10.0473 21.0768 9.87353 20.6856ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" fill={fill} />
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.28909 19.3711L9.87353 20.6856C10.0473 21.0768 10.3308 21.4093 10.6898 21.6426C11.0487 21.8759 11.4676 22.0001 11.8958 22C12.3239 22.0001 12.7428 21.8759 13.1017 21.6426C13.4607 21.4093 13.7442 21.0768 13.918 20.6856L14.5024 19.3711C14.7105 18.9047 15.0604 18.5159 15.5024 18.26C15.9472 18.0034 16.4617 17.8941 16.9724 17.9478L18.4024 18.1C18.8281 18.145 19.2577 18.0656 19.6391 17.8713C20.0205 17.6771 20.3374 17.3763 20.5513 17.0056C20.7655 16.635 20.8675 16.2103 20.845 15.7829C20.8226 15.3555 20.6765 14.9438 20.4246 14.5978L19.578 13.4344C19.2765 13.0171 19.1154 12.5148 19.118 12C19.1179 11.4866 19.2805 10.9864 19.5824 10.5711L20.4291 9.40778C20.681 9.06175 20.827 8.65007 20.8495 8.22267C20.872 7.79528 20.7699 7.37054 20.5558 7C20.3418 6.62923 20.025 6.32849 19.6435 6.13423C19.2621 5.93997 18.8325 5.86053 18.4069 5.90556L16.9769 6.05778C16.4662 6.11141 15.9516 6.00212 15.5069 5.74556C15.064 5.48825 14.7139 5.09736 14.5069 4.62889L13.918 3.31444C13.7442 2.92317 13.4607 2.59072 13.1017 2.3574C12.7428 2.12408 12.3239 1.99993 11.8958 2C11.4676 1.99993 11.0487 2.12408 10.6898 2.3574C10.3308 2.59072 10.0473 2.92317 9.87353 3.31444L9.28909 4.62889C9.08201 5.09736 8.73196 5.48825 8.28908 5.74556C7.8443 6.00212 7.32975 6.11141 6.81909 6.05778L5.38464 5.90556C4.95897 5.86053 4.52938 5.93997 4.14796 6.13423C3.76653 6.32849 3.44966 6.62923 3.23575 7C3.02157 7.37054 2.91953 7.79528 2.94202 8.22267C2.9645 8.65007 3.11054 9.06175 3.36242 9.40778L4.20908 10.5711C4.51103 10.9864 4.67362 11.4866 4.67353 12C4.67362 12.5134 4.51103 13.0137 4.20908 13.4289L3.36242 14.5922C3.11054 14.9382 2.9645 15.3499 2.94202 15.7773C2.91953 16.2047 3.02157 16.6295 3.23575 17C3.44987 17.3706 3.76678 17.6712 4.14815 17.8654C4.52952 18.0596 4.959 18.1392 5.38464 18.0944L6.81464 17.9422C7.32531 17.8886 7.83986 17.9979 8.28464 18.2544C8.72917 18.511 9.08085 18.902 9.28909 19.3711Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconGlobe = ({ size, fill = 'none', color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <g opacity="0.12">
                <path d="M17 12C19 10 21 8.20914 21 6C21 3.79086 19.2091 2 17 2C14.7909 2 13 3.79086 13 6C13 8.20914 15 10 17 12Z" className={fill} />
                <path d="M10.5001 21.8883L10.5002 19.6849C10.5002 19.5656 10.5429 19.4502 10.6205 19.3596L13.1063 16.4594C13.3106 16.2211 13.2473 15.8557 12.9748 15.6999L10.1185 14.0678C10.0409 14.0234 9.97663 13.9591 9.93234 13.8814L8.07046 10.6187C7.97356 10.4488 7.78657 10.3511 7.59183 10.3684L2.06418 10.8608C2.02178 11.2347 2 11.6148 2 12C2 17.0131 5.68876 21.1646 10.5001 21.8883Z" className={fill} />
            </g>
            <path d="M15 2.4578C14.053 2.16035 13.0452 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 10.2847 21.5681 8.67022 20.8071 7.25945M17 5.75H17.005M10.5001 21.8883L10.5002 19.6849C10.5002 19.5656 10.5429 19.4502 10.6205 19.3596L13.1063 16.4594C13.3106 16.2211 13.2473 15.8556 12.9748 15.6999L10.1185 14.0677C10.0409 14.0234 9.97663 13.9591 9.93234 13.8814L8.07046 10.6186C7.97356 10.4488 7.78657 10.3511 7.59183 10.3684L2.06418 10.8607M21 6C21 8.20914 19 10 17 12C15 10 13 8.20914 13 6C13 3.79086 14.7909 2 17 2C19.2091 2 21 3.79086 21 6ZM17.25 5.75C17.25 5.88807 17.1381 6 17 6C16.8619 6 16.75 5.88807 16.75 5.75C16.75 5.61193 16.8619 5.5 17 5.5C17.1381 5.5 17.25 5.61193 17.25 5.75Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconHome = ({ size, fill = 'none', color, strokeWidth = 2}: IconProps) => {
	return (
		<svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
			<path opacity="0.12" d="M3 10.5651C3 9.9907 3 9.70352 3.07403 9.43905C3.1396 9.20478 3.24737 8.98444 3.39203 8.78886C3.55534 8.56806 3.78202 8.39175 4.23539 8.03912L11.0177 2.764C11.369 2.49075 11.5447 2.35412 11.7387 2.3016C11.9098 2.25526 12.0902 2.25526 12.2613 2.3016C12.4553 2.35412 12.631 2.49075 12.9823 2.764L19.7646 8.03913C20.218 8.39175 20.4447 8.56806 20.608 8.78886C20.7526 8.98444 20.8604 9.20478 20.926 9.43905C21 9.70352 21 9.9907 21 10.5651V17.8C21 18.9201 21 19.4801 20.782 19.908C20.5903 20.2843 20.2843 20.5903 19.908 20.782C19.4802 21 18.9201 21 17.8 21H6.2C5.0799 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4801 3 18.9201 3 17.8V10.5651Z" className={fill} />
			<path d="M8.12602 14C8.57006 15.7252 10.1362 17 12 17C13.8638 17 15.4299 15.7252 15.874 14M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

export const IconImage = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path className={fill} opacity="0.12" d="M9 9.5L6 15H18L13.5 7.5L11 11L9 9.5Z" />
            <path d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 9.5L6 15H18L13.5 7.5L11 11L9 9.5Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconLightbulb = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M15.5 16.874C17.0141 15.7848 18 14.0075 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 14.0075 6.98593 15.7848 8.5 16.874V18.8C8.5 19.9201 8.5 20.4802 8.71799 20.908C8.90973 21.2843 9.21569 21.5903 9.59202 21.782C10.0198 22 10.5799 22 11.7 22H12.3C13.4201 22 13.9802 22 14.408 21.782C14.7843 21.5903 15.0903 21.2843 15.282 20.908C15.5 20.4802 15.5 19.9201 15.5 18.8V16.874Z" fill={fill} />
            <path d="M12 2V3M3 12H2M5.5 5.5L4.8999 4.8999M18.5 5.5L19.1002 4.8999M22 12H21M10 13.5H14M12 13.5V18.5M15.5 16.874C17.0141 15.7848 18 14.0075 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 14.0075 6.98593 15.7848 8.5 16.874V18.8C8.5 19.9201 8.5 20.4802 8.71799 20.908C8.90973 21.2843 9.21569 21.5903 9.59202 21.782C10.0198 22 10.5799 22 11.7 22H12.3C13.4201 22 13.9802 22 14.408 21.782C14.7843 21.5903 15.0903 21.2843 15.282 20.908C15.5 20.4802 15.5 19.9201 15.5 18.8V16.874Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export const IconLogout = ({ size, fill = 'none', color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M3 21V3H9V21H3Z" className={fill} />
            <path d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconMenu = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M9 18H21" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconMoon = ({ size, fill = 'none', color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M22 15.8442C20.6866 16.4382 19.2286 16.7688 17.6935 16.7688C11.9153 16.7688 7.23116 12.0847 7.23116 6.30654C7.23116 4.77135 7.5618 3.3134 8.15577 2C4.52576 3.64163 2 7.2947 2 11.5377C2 17.3159 6.68414 22 12.4623 22C16.7053 22 20.3584 19.4742 22 15.8442Z" fill={fill} />
            <path d="M22 15.8442C20.6866 16.4382 19.2286 16.7688 17.6935 16.7688C11.9153 16.7688 7.23116 12.0847 7.23116 6.30654C7.23116 4.77135 7.5618 3.3134 8.15577 2C4.52576 3.64163 2 7.2947 2 11.5377C2 17.3159 6.68414 22 12.4623 22C16.7053 22 20.3584 19.4742 22 15.8442Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export const IconPhone = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path className={fill} opacity="0.12" d="M7.38076 9.85323C8.07676 11.3028 9.02555 12.6615 10.2271 13.8631C11.4287 15.0646 12.7873 16.0134 14.237 16.7094C14.3617 16.7693 14.424 16.7992 14.5029 16.8222C14.7832 16.904 15.1275 16.8453 15.3649 16.6752C15.4317 16.6274 15.4889 16.5702 15.6032 16.4559C15.9528 16.1063 16.1276 15.9315 16.3034 15.8172C16.9663 15.3862 17.8209 15.3862 18.4838 15.8172C18.6595 15.9315 18.8343 16.1063 19.184 16.4559L19.3788 16.6508C19.9103 17.1822 20.176 17.448 20.3203 17.7333C20.6074 18.3009 20.6074 18.9712 20.3203 19.5387C20.176 19.8241 19.9103 20.0898 19.3788 20.6213L19.2212 20.7789C18.6916 21.3085 18.4268 21.5733 18.0667 21.7756C17.6672 22 17.0467 22.1614 16.5885 22.16C16.1756 22.1588 15.8933 22.0787 15.3289 21.9185C12.2955 21.0575 9.43313 19.433 7.04515 17.045C4.65717 14.6571 3.03269 11.7947 2.17172 8.76131C2.01152 8.19687 1.93141 7.91464 1.93018 7.5017C1.92882 7.04347 2.09018 6.42298 2.3146 6.02348C2.51685 5.66345 2.78166 5.39863 3.31129 4.86901L3.46892 4.71138C4.00036 4.17993 4.26608 3.91421 4.55146 3.76987C5.11903 3.4828 5.78929 3.4828 6.35685 3.76987C6.64223 3.91421 6.90795 4.17993 7.4394 4.71138L7.63427 4.90625C7.98387 5.25585 8.15867 5.43065 8.27296 5.60643C8.70396 6.26932 8.70396 7.1239 8.27296 7.78679C8.15868 7.96257 7.98387 8.13738 7.63427 8.48698C7.51995 8.60129 7.4628 8.65845 7.41496 8.72526C7.24495 8.96269 7.18624 9.30695 7.26797 9.5873C7.29097 9.6662 7.3209 9.72854 7.38076 9.85323Z"/>
            <path d="M14.0501 6C15.0269 6.19057 15.9245 6.66826 16.6282 7.37194C17.3319 8.07561 17.8096 8.97326 18.0001 9.95M14.0501 2C16.0794 2.22544 17.9717 3.13417 19.4164 4.57701C20.861 6.01984 21.7722 7.91101 22.0001 9.94M10.2271 13.8631C9.02555 12.6615 8.07676 11.3028 7.38076 9.85323C7.3209 9.72854 7.29097 9.66619 7.26797 9.5873C7.18624 9.30695 7.24495 8.96269 7.41496 8.72526C7.4628 8.65845 7.51995 8.60129 7.63427 8.48698C7.98387 8.13737 8.15868 7.96257 8.27296 7.78679C8.70396 7.1239 8.70396 6.26932 8.27296 5.60643C8.15867 5.43065 7.98387 5.25585 7.63427 4.90624L7.4394 4.71137C6.90795 4.17993 6.64223 3.91421 6.35685 3.76987C5.78929 3.4828 5.11903 3.4828 4.55146 3.76987C4.26608 3.91421 4.00036 4.17993 3.46892 4.71137L3.31129 4.86901C2.78166 5.39863 2.51685 5.66344 2.3146 6.02348C2.09018 6.42298 1.92882 7.04347 1.93018 7.5017C1.93141 7.91464 2.01152 8.19687 2.17172 8.76131C3.03269 11.7947 4.65717 14.6571 7.04515 17.045C9.43313 19.433 12.2955 21.0575 15.3289 21.9185C15.8933 22.0787 16.1756 22.1588 16.5885 22.16C17.0467 22.1614 17.6672 22 18.0667 21.7756C18.4268 21.5733 18.6916 21.3085 19.2212 20.7789L19.3788 20.6213C19.9103 20.0898 20.176 19.8241 20.3203 19.5387C20.6074 18.9712 20.6074 18.3009 20.3203 17.7333C20.176 17.448 19.9103 17.1822 19.3788 16.6508L19.184 16.4559C18.8343 16.1063 18.6595 15.9315 18.4838 15.8172C17.8209 15.3862 16.9663 15.3862 16.3034 15.8172C16.1276 15.9315 15.9528 16.1063 15.6032 16.4559C15.4889 16.5702 15.4317 16.6274 15.3649 16.6752C15.1275 16.8453 14.7832 16.904 14.5029 16.8222C14.424 16.7992 14.3617 16.7693 14.237 16.7094C12.7873 16.0134 11.4287 15.0646 10.2271 13.8631Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconSun = ({ size, fill = 'none', color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" className={fill} />
            <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconTick = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={fill} width={size} height={size} viewBox='0 0 17 15'>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M14.7953 0.85322L5.24867 10.0666L2.71534 7.35989C2.24867 6.91989 1.51534 6.89322 0.982005 7.26655C0.462005 7.65322 0.315338 8.33322 0.635338 8.87989L3.63534 13.7599C3.92867 14.2132 4.43534 14.4932 5.00867 14.4932C5.55534 14.4932 6.07534 14.2132 6.36867 13.7599C6.84867 13.1332 16.0087 2.21322 16.0087 2.21322C17.2087 0.986553 15.7553 -0.0934461 14.7953 0.839887V0.85322Z'
                fill={fill}
            />
        </svg>
    );
};
  
export const IconTicket = ({ size, fill = 'none', color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M18.8 4H5.2C4.0799 4 3.51984 4 3.09202 4.21799C2.71569 4.40973 2.40973 4.71569 2.21799 5.09202C2 5.51984 2 6.0799 2 7.2V8.5C3.933 8.5 5.5 10.067 5.5 12C5.5 13.933 3.933 15.5 2 15.5V16.8C2 17.9201 2 18.4802 2.21799 18.908C2.40973 19.2843 2.71569 19.5903 3.09202 19.782C3.51984 20 4.0799 20 5.2 20H18.8C19.9201 20 20.4802 20 20.908 19.782C21.2843 19.5903 21.5903 19.2843 21.782 18.908C22 18.4802 22 17.9201 22 16.8V15.5C20.067 15.5 18.5 13.933 18.5 12C18.5 10.067 20.067 8.5 22 8.5V7.2C22 6.0799 22 5.51984 21.782 5.09202C21.5903 4.71569 21.2843 4.40973 20.908 4.21799C20.4802 4 19.9201 4 18.8 4Z" className={fill} />
            <path d="M10 8V7M10 12.5V11.5M10 17V16M5.2 4H18.8C19.9201 4 20.4802 4 20.908 4.21799C21.2843 4.40973 21.5903 4.71569 21.782 5.09202C22 5.51984 22 6.0799 22 7.2V8.5C20.067 8.5 18.5 10.067 18.5 12C18.5 13.933 20.067 15.5 22 15.5V16.8C22 17.9201 22 18.4802 21.782 18.908C21.5903 19.2843 21.2843 19.5903 20.908 19.782C20.4802 20 19.9201 20 18.8 20H5.2C4.0799 20 3.51984 20 3.09202 19.782C2.71569 19.5903 2.40973 19.2843 2.21799 18.908C2 18.4802 2 17.9201 2 16.8V15.5C3.933 15.5 5.5 13.933 5.5 12C5.5 10.067 3.933 8.5 2 8.5V7.2C2 6.0799 2 5.51984 2.21799 5.09202C2.40973 4.71569 2.71569 4.40973 3.09202 4.21799C3.51984 4 4.0799 4 5.2 4Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconTrash = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path className={fill} opacity="0.12" d="M18.2987 16.5193L19 6H5L5.70129 16.5193C5.8065 18.0975 5.85911 18.8867 6.19998 19.485C6.50009 20.0118 6.95276 20.4353 7.49834 20.6997C8.11803 21 8.90891 21 10.4907 21H13.5093C15.0911 21 15.882 21 16.5017 20.6997C17.0472 20.4353 17.4999 20.0118 17.8 19.485C18.1409 18.8867 18.1935 18.0975 18.2987 16.5193Z" />
            <path d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconUpload = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path className={fill} opacity="0.12" d="M2 12.5C2 10.1564 3.79151 8.23129 6.07974 8.01937C6.54781 5.17213 9.02024 3 12 3C14.9798 3 17.4522 5.17213 17.9203 8.01937C20.2085 8.23129 22 10.1564 22 12.5C22 14.0602 21.206 15.435 20 16.2422H16V16L12 12.2422L8 16V16.2422H4C2.79401 15.435 2 14.0602 2 12.5Z" />
            <path d="M4 16.2422C2.79401 15.435 2 14.0602 2 12.5C2 10.1564 3.79151 8.23129 6.07974 8.01937C6.54781 5.17213 9.02024 3 12 3C14.9798 3 17.4522 5.17213 17.9203 8.01937C20.2085 8.23129 22 10.1564 22 12.5C22 14.0602 21.206 15.435 20 16.2422M8 16L12 12M12 12L16 16M12 12V21" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconUser = ({ size, fill = 'none', color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z" className={fill} />
            <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconUsers = ({ size, fill = 'none', color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <path opacity="0.12" d="M9.5 11C11.7091 11 13.5 9.20914 13.5 7C13.5 4.79086 11.7091 3 9.5 3C7.29086 3 5.5 4.79086 5.5 7C5.5 9.20914 7.29086 11 9.5 11Z" fill={fill} />
            <path d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export const IconVideo = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
    return (
        <svg className={color} width={size} height={size} viewBox="0 0 24 24" fill="none">
            <g opacity="0.12">
                <path className={fill} d="M17.2 2C18.8802 2 19.7202 2 20.362 2.32698C20.9265 2.6146 21.3854 3.07354 21.673 3.63803C22 4.27976 22 5.11984 22 6.8V7L2 7L2 6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2L17.2 2Z" />
                <path className={fill} d="M17.2 22C18.8802 22 19.7202 22 20.362 21.673C20.9265 21.3854 21.3854 20.9265 21.673 20.362C22 19.7202 22 18.8802 22 17.2V17L2 17L2 17.2C2 18.8802 2 19.7202 2.32698 20.362C2.6146 20.9265 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H17.2Z" />
            </g>
            <path d="M12 22V2M7 22V17M7 7V2M17 22V17M17 7V2M2 7H22M2 17H22M22 17.2V6.8C22 5.11984 22 4.27976 21.673 3.63803C21.3854 3.07354 20.9265 2.6146 20.362 2.32698C19.7202 2 18.8802 2 17.2 2L6.8 2C5.11984 2 4.27976 2 3.63803 2.32698C3.07354 2.6146 2.6146 3.07354 2.32698 3.63803C2 4.27976 2 5.11984 2 6.8L2 17.2C2 18.8802 2 19.7202 2.32698 20.362C2.6146 20.9265 3.07354 21.3854 3.63803 21.673C4.27976 22 5.11984 22 6.8 22H17.2C18.8802 22 19.7202 22 20.362 21.673C20.9265 21.3854 21.3854 20.9265 21.673 20.362C22 19.7202 22 18.8802 22 17.2Z" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}
