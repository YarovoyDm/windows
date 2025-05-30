import { useEffect, useState } from "react";

interface SystemInfoType {
    userAgent: string;
    platform: string;
    language: string;
    screenWidth: number;
    screenHeight: number;
    colorDepth: number;
    deviceMemory: string | number;
    hardwareConcurrency: number;
    timeZone: string;
    onlineStatus: boolean;
    storageEstimate?: string;
    isTouchScreen: boolean;
    cpuArchitecture?: string;
    screenOrientation?: string;
}

const getPlatform = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("win")) return "Windows";
    if (userAgent.includes("mac")) return "MacOS";
    if (userAgent.includes("linux")) return "Linux";
    if (userAgent.includes("android")) return "Android";
    if (userAgent.includes("iphone")) return "iOS";
    return "Unknown";
};

const getCpuArchitecture = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("arm")) return "ARM";
    if (userAgent.includes("x86")) return "x86";
    if (userAgent.includes("x64") || userAgent.includes("amd64")) return "x64";
    return "Unknown Architecture";
};

const getScreenOrientation = () => {
    if (window.screen.orientation) {
        return window.screen.orientation.type || "Unknown Orientation";
    }
};

const useSystem = () => {
    const [systemInfo, setSystemInfo] = useState<SystemInfoType | null>(null);

    useEffect(() => {
        const fetchStorageEstimate = async () => {
            if (navigator.storage && navigator.storage.estimate) {
                const estimate = await navigator.storage.estimate();

                return `${(estimate.quota || 0) / (1024 * 1024 * 1024)} GB`;
            }
            return "N/A";
        };

        fetchStorageEstimate().then(storageEstimate => {
            const info: SystemInfoType = {
                userAgent: navigator.userAgent,
                platform: getPlatform(),
                language: navigator.language,
                screenWidth: window.screen.width,
                screenHeight: window.screen.height,
                colorDepth: window.screen.colorDepth,
                deviceMemory: (navigator as any).deviceMemory || "N/A",
                hardwareConcurrency: navigator.hardwareConcurrency,
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                onlineStatus: navigator.onLine,
                storageEstimate,
                isTouchScreen: window.matchMedia("(pointer: coarse)").matches,
                cpuArchitecture: getCpuArchitecture(),
                screenOrientation: getScreenOrientation(),
            };

            setSystemInfo(info);
        });
    }, []);

    return systemInfo;
};

export default useSystem;
