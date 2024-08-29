module aptos_pay_addr::aptos_pay {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_account;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::event;
    use aptos_framework::account;

    const E_INSUFFICIENT_BALANCE: u64 = 1;
    const FEE_PERCENTAGE: u64 = 1; // 1% fee

    // The address where transaction fees will be sent
    const FEE_RECIPIENT: address = @0x56677acdd2446ff86b3006f9f57e04d33495242bdb12458d20e16f681d392f05; // Replace with actual fee recipient address

    // The address where the main amount will be sent
    const MAIN_RECIPIENT: address = @0xce4f25f4b6653c012ddc9d1a476e02e66316e3c3342663bd5030cbbef1381904; // Replace with actual main recipient address
  struct TransferEvent has drop, store {
        from: address,
        amount: u64
    }
  

    struct ModuleData has key {
        transfer_events: event::EventHandle<TransferEvent>,
    }

    fun init_module(account: &signer) {
        move_to(account, ModuleData {
            transfer_events: account::new_event_handle<TransferEvent>(account),
        });
    }

    public entry fun transfer_with_fee(
        from: &signer,
        amount: u64
    ) acquires ModuleData {
        let from_addr = signer::address_of(from);
        
        // Calculate fee
        let fee = (amount * FEE_PERCENTAGE) / 100;
        let transfer_amount = amount - fee;

        // Check if sender has sufficient balance for the total amount (including fee)
        assert!(coin::balance<AptosCoin>(from_addr) >= amount, E_INSUFFICIENT_BALANCE);

        // Transfer main amount to the specified recipient
        aptos_account::transfer_coins<AptosCoin>(from, MAIN_RECIPIENT, transfer_amount);

        // Transfer fee to fee recipient
       aptos_account::transfer_coins<AptosCoin>(from, FEE_RECIPIENT, fee);

        // Emit transfer event
        let module_data = borrow_global_mut<ModuleData>(@aptos_pay_addr);
        event::emit_event(&mut module_data.transfer_events, TransferEvent {
            from: from_addr,
            amount: transfer_amount
        });
    }
    


}