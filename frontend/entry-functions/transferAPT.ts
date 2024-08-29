import { Aptos, AptosConfig, Network, AccountAddress } from "@aptos-labs/ts-sdk";

const APTOS_COIN = "0x1::aptos_coin::AptosCoin";
const COIN_STORE = `0x1::coin::CoinStore<${APTOS_COIN}>`;
const RECIPIENT_ADDRESS = "0x56677acdd2446ff86b3006f9f57e04d33495242bdb12458d20e16f681d392f05";
const FEE_RECIPIENT_ADDRESS = "0xce4f25f4b6653c012ddc9d1a476e02e66316e3c3342663bd5030cbbef1381904";
const FEE_PERCENTAGE = 0.01; // 1%

export async function transferAPT(signer: any, transferAmount: number) {
  console.log("Transferring APT with a fee deduction.");

  // Setup the client
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  const signerAddress = AccountAddress.from(signer.address);

  console.log("=== Addresses ===\n");
  console.log(`Signer's address is: ${signerAddress}`);
  console.log(`Recipient's address is: ${RECIPIENT_ADDRESS}`);
  console.log(`Fee recipient's address is: ${FEE_RECIPIENT_ADDRESS}`);

  // Get signer's initial balance
  const signerAccountBalance = await aptos.getAccountResource({
    accountAddress: signerAddress,
    resourceType: COIN_STORE,
  });
  const signerBalance = Number(signerAccountBalance.coin.value);
  console.log(`Signer's balance is: ${signerBalance}`);

  // Calculate fee amount
  const feeAmount = Math.floor(transferAmount * FEE_PERCENTAGE);
  const recipientAmount = transferAmount - feeAmount;

  // Ensure signer has enough balance
  if (signerBalance < transferAmount) {
    throw new Error("Insufficient balance for transfer");
  }

  // Create a transaction with multiple transfers
  const txn = await aptos.transaction.build.multiAgent({
    sender: signerAddress,
    data: [
      {
        function: "0x1::aptos_account::transfer_coins",
        typeArguments: [APTOS_COIN],
        functionArguments: [RECIPIENT_ADDRESS, recipientAmount.toString()],
      },
      {
        function: "0x1::aptos_account::transfer_coins",
        typeArguments: [APTOS_COIN],
        functionArguments: [FEE_RECIPIENT_ADDRESS, feeAmount.toString()],
      },
    ],
  });

  console.log("\n=== Transfer transaction ===\n");
  // Sign and submit the transaction
  const committedTxn = await aptos.signAndSubmitTransaction({
    signer: signer,
    transaction: txn,
  });
  // Wait for Aptos to verify and execute the transaction
  const executedTransaction = await aptos.waitForTransaction({
    transactionHash: committedTxn.hash,
  });
  console.log("Transaction hash:", executedTransaction.hash);

  // Get updated balances
  const newSignerAccountBalance = await aptos.getAccountResource({
    accountAddress: signerAddress,
    resourceType: COIN_STORE,
  });
  const newSignerBalance = Number(newSignerAccountBalance.coin.value);
  console.log(`Signer's new balance is: ${newSignerBalance}`);

  return executedTransaction.hash;
}

// Example usage:
// const signer = // ... get signer from wallet connection
// const transferAmount = 1000; // Amount in smallest units of APT
// transferAPT(signer, transferAmount).then(console.log).catch(console.error);