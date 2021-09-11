pragma solidity ^0.5.6;

interface IDSCMateFollowMe {
    
    event Set(address indexed mates, uint256 indexed mateId, address indexed owner, uint256 index, string link);
    
    function set(address mates, uint256 mateId, uint256 index, string calldata link) external;
    function followMe(address mates, uint256 mateId, uint256 index) external returns (string memory link);
}
