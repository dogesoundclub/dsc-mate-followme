import { expect } from "chai";
import { waffle } from "hardhat";
import DogeSoundClubMateArtifact from "../artifacts/contracts/DogeSoundClubMate.sol/DogeSoundClubMate.json";
import DSCMateFollowMeArtifact from "../artifacts/contracts/DSCMateFollowMe.sol/DSCMateFollowMe.json";
import { DogeSoundClubMate } from "../typechain/DogeSoundClubMate";
import { DSCMateFollowMe } from "../typechain/DSCMateFollowMe";

const { deployContract } = waffle;

describe("DSCMateFollowMe", () => {
    let mates: DogeSoundClubMate;
    let followMe: DSCMateFollowMe;

    const provider = waffle.provider;
    const [admin, other] = provider.getWallets();

    beforeEach(async () => {

        mates = await deployContract(
            admin,
            DogeSoundClubMateArtifact,
            []
        ) as DogeSoundClubMate;

        followMe = await deployContract(
            admin,
            DSCMateFollowMeArtifact,
            []
        ) as DSCMateFollowMe;
    })

    context("new DSCMateFollowMe", async () => {

        it("set", async () => {
            await mates.mint(admin.address, 0);
            await expect(followMe.set(mates.address, 0, 0, "simsimdev"))
                .to.emit(followMe, "Set")
                .withArgs(mates.address, 0, admin.address, 0, "simsimdev")
            expect(await followMe.followMe(mates.address, 0, 0)).to.be.equal("simsimdev");
        })

        it("set and transfer", async () => {
            await mates.mint(admin.address, 0);
            await expect(followMe.set(mates.address, 0, 0, "simsimdev"))
                .to.emit(followMe, "Set")
                .withArgs(mates.address, 0, admin.address, 0, "simsimdev")
            await mates.transferFrom(admin.address, other.address, 0);
            expect(await followMe.followMe(mates.address, 0, 0)).not.to.be.equal("simsimdev");
        })
    })
})