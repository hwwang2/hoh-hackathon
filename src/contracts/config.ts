
type BaseContract = {
    packageId: string;
    stateId: string;
    adminCap: string;
    ownerId: string;
}

export const TestnetContract: BaseContract = {
    packageId: "0x1aad7ad62528f3223909c0337b890adc4ff717eff8cdf6afb165503df58fdcc3",
    stateId: "0xb29e479fc9818dffca158bcc5fe4698bdc5f3d1bf8d19449d1aed777e380eb12",
    adminCap: "0x5af8b1db5ce99600a4af66cae6df53b6fe6cf5b48d36464664913184eaa78c8b",
    ownerId: "0x340ff414f778eb4ad4189770a1009ab3d980c1a6cc40832ceb00bf1faa43ad97",
}

export const MainnetContract: BaseContract = {
    packageId: "0x2",
    stateId: "",
    adminCap: "",
    ownerId: "",
}