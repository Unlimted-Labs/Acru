/// Handles allocation of goal funds into yield-generating grow protocols.
/// Both functions are designed to be composed in a single PTB:
///   allocate_to_grow → [Aftermath stake / Navi supply / DeepBook LP] → return_from_grow
module acru::grow_mode {
    use sui::tx_context::TxContext;
    use acru::savings_goal::SavingsGoal;

    /// Extract the grow allocation coin from the goal's balance.
    /// Amount is calculated from grow_mode_allocation_bps × current_balance.
    /// The returned coin is used in the same PTB for the protocol call.
    public fun allocate_to_grow(
        _goal: &mut SavingsGoal,
        _protocol: vector<u8>,
        _ctx: &mut TxContext,
    ) {
        // TODO: return Coin<T> once coin types are finalized
    }

    /// Return coins from a completed grow operation back into the goal balance.
    /// Emits GrowAllocationReturned so the backend can compute yield.
    public entry fun return_from_grow(
        _goal: &mut SavingsGoal,
        _original_amount: u64,
        _ctx: &mut TxContext,
    ) {
        // TODO: accept Coin<T> parameter once coin types are finalized
    }
}
