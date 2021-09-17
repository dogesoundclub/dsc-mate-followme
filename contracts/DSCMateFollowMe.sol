pragma solidity ^0.5.6;

import "./klaytn-contracts/token/KIP17/IKIP17Enumerable.sol";
import "./klaytn-contracts/math/SafeMath.sol";
import "./interfaces/IDSCMateFollowMe.sol";

contract DSCMateFollowMe is IDSCMateFollowMe {
    using SafeMath for uint256;

    struct FollowMe {
        address owner;
        string[] links;
    }
    mapping(address => mapping(uint256 => FollowMe)) public followMes;

    modifier onlyHolder(address mates, uint256 mateId) {
        require(IKIP17Enumerable(mates).ownerOf(mateId) == msg.sender);
        _;
    }

    function set(address mates, uint256 mateId, uint256 index, string calldata link) onlyHolder(mates, mateId) external {
        FollowMe storage fm = followMes[mates][mateId];
        if (fm.owner != msg.sender) {
            fm.links = new string[](10);
        }
        fm.links[index] = link;
        fm.owner = msg.sender;
        emit Set(mates, mateId, msg.sender, index, link);
    }

    function followMe(address mates, uint256 mateId, uint256 index) view external returns (string memory link) {
        FollowMe memory fm = followMes[mates][mateId];
        if (IKIP17Enumerable(mates).ownerOf(mateId) == fm.owner) {
            link = fm.links[index];
        }
    }
}
