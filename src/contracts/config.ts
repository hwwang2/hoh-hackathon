
type BaseContract = {
    packageId: string;
    stateId: string;
    adminCap: string;
    ownerId: string;
}

export const TestnetContract: BaseContract = {
    packageId: "0x90758c3f289dd5dc77b5ba3918a9de298ff13df1668c3411c38bd8543d6c6340",
    stateId: "0x5586d253829db83ee2ef1f5f82f4217e8461939b8233b6847d065c2ce546644e",
    adminCap: "0xeaae09dc6de4dacb89c484adc64c4616aa0977edc05c10215e35c0a0ed0b1cf5",
    ownerId: "0x340ff414f778eb4ad4189770a1009ab3d980c1a6cc40832ceb00bf1faa43ad97",
}

export const MainnetContract: BaseContract = {
    packageId: "0x2",
    stateId: "",
    adminCap: "",
    ownerId: "",
}