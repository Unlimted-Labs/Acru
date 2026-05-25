/// Handles scheduled auto-save execution.
/// Because Sui has no native cron, the backend calls `execute_auto_save`
/// once per epoch for every goal that is due.
module acru::auto_save {
    use sui::tx_context::TxContext;
    use sui::coin::Coin;
    use acru::savings_goal::SavingsGoal;

    /// Execute an auto-save for a goal. Verifies the interval has elapsed,
    /// deposits the coin, and updates `last_auto_save_epoch`.
    public entry fun execute_auto_save(
        _goal: &mut SavingsGoal,
        // TODO: generic over coin type once USDC type is finalized
        _ctx: &mut TxContext,
    ) {
        // TODO: implement
    }

    /// Returns true if the current epoch minus last_auto_save_epoch
    /// is >= auto_save_interval. Polled by the backend indexer.
    public fun check_auto_save_due(
        _goal: &SavingsGoal,
        _current_epoch: u64,
    ): bool {
        // TODO: implement
        false
    }
}
