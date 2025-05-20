/*

import { createWalletClient, custom } from 'viem';
import { polygon } from 'viem/chains';

const client = createWalletClient({
  chain: polygon,
  transport: custom(window.ethereum),
});


const groupContractAddress = '0x...'; // Replace with actual address
const groupAbi = [
  'function addMember(address groupId, address member) external',
];

async function addGroupMember(groupId: string, member: string) {
  const txHash = await client.writeContract({
    address: groupContractAddress as `0x${string}`,
    abi: groupAbi,
    functionName: 'addMember',
    args: [groupId, member],
  });

  console.log('Transaction hash:', txHash);
}
*/
