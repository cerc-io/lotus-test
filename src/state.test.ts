import 'dotenv/config';
import { ethers } from 'ethers';
import 'mocha';
import { expect } from 'chai';
import assert from 'assert';

import { abi as erc20ABI } from '../artifacts/contracts/TestERC20.sol/TestERC20.json';

describe('state check test', () => {
  const rpcEndpoint = process.env.ETH_RPC_ENDPOINT;
  const contractAddress = process.env.CONTRACT;
  const transferBlock = process.env.TRANSFER_BLOCK;
  const from = process.env.FROM_ADDRESS;
  const to = process.env.TO_ADDRESS;

  assert(rpcEndpoint, 'ETH_RPC_ENDPOINT not set');
  assert(contractAddress, 'CONTRACT not set');
  assert(transferBlock, 'TRANSFER_BLOCK not set');
  assert(from, 'FROM_ADDRESS not set');
  assert(to, 'TO_ADDRESS not set');

  const transferEventName = 'Transfer';

  const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint);
  const eventInterface = new ethers.utils.Interface(erc20ABI);

  it ('event exists at the given height', async () => {
    // Filter events based on the address and block number
    const filter = {
      address: contractAddress,
      fromBlock: Number(transferBlock),
      toBlock: Number(transferBlock)
    };

    const logs = await provider.getLogs(filter);
    expect(logs).to.not.be.empty;

    const eventExists = logs.some((log) => {
      const parsedLog = eventInterface.parseLog(log);

      if (
        parsedLog.name !== transferEventName
        || parsedLog.args[0] !== from
        || parsedLog.args[1] !== to
      ) {
        return false;
      }

      return true;
    });

    expect(eventExists).to.be.true;
  });

  it ('state change is reflected at block N+1', async () => {
    // TODO
  });
});

