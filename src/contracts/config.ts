
type BaseContract = {
    packageId: string;
    stateId: string;
    adminCap: string;
    ownerId: string;
}

export const TestnetContract: BaseContract = {
    packageId: "0xe9f640d5fd33ca27bdfaf45bd69b5b9205c3af4e6bc3bc465c4a0215b9004dd6",
    stateId: "0x552cc226347f6481d9f2e41648d86e01de852a21e33558cc11fde05fd757384b",
    adminCap: "0x84d46f9474b5bd1aaa00891fcc1420dd4ef25a5b2b7b78c4936575924fef4474",
    ownerId: "0x45272ac48503abe241074ad613024852a639b7fefb553c71b41fd36670836cd2",
}

export const MainnetContract: BaseContract = {
    packageId: "0x2",
    stateId: "",
    adminCap: "",
    ownerId: "",
}