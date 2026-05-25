/// Core savings goal object and lifecycle management.
/// Each SavingsGoal is an owned Sui object representing one user goal.
module acru::savings_goal {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::event;
    use acru::events::{GoalCreated, Deposit, Withdrawal, GoalCompleted};

    // ── Asset type constants ─────────────────────────────────────────────────
    const ASSET_USDC: u8 = 0;
    const ASSET_SUI: u8 = 1;

    // ── Error codes ──────────────────────────────────────────────────────────
    const ENotOwner: u64 = 1;
    const EGoalCompleted: u64 = 2;
    const EInsufficientBalance: u64 = 3;

    // ── One-time witness for USDC coin type placeholder ───────────────────────
    // TODO: Replace with actual USDC coin type from the deployed USDC package on Sui.
    public struct USDC has drop {}

    /// A user's savings goal. Carries both USDC and SUI balances so the same
    /// object can hold either asset depending on `asset_type`.
    public struct SavingsGoal has key, store {
        id: UID,
        owner: address,
        /// Seal-encrypted metadata blob (name, notes, preferences).
        encrypted_metadata: vector<u8>,
        usdc_balance: Balance<USDC>,
        sui_balance: Balance<sui::sui::SUI>,
        target_amount: u64,
        deadline: u64,
        /// 0 = USDC, 1 = SUI
        asset_type: u8,
        auto_save_enabled: bool,
        auto_save_amount: u64,
        auto_save_interval: u64,
        last_auto_save_epoch: u64,
        grow_mode_enabled: bool,
        grow_mode_allocation_bps: u64,
        completed: bool,
    }

    /// Create a new savings goal and transfer it to the caller.
    public entry fun create_goal(
        _encrypted_metadata: vector<u8>,
        _target_amount: u64,
        _deadline: u64,
        _asset_type: u8,
        _auto_save_enabled: bool,
        _auto_save_amount: u64,
        _auto_save_interval: u64,
        _ctx: &mut TxContext,
    ) {
        // TODO: implement
    }

    /// Deposit USDC into a goal.
    public entry fun deposit_usdc(
        _goal: &mut SavingsGoal,
        _coin: Coin<USDC>,
        _ctx: &mut TxContext,
    ) {
        // TODO: implement
    }

    /// Deposit SUI into a goal.
    public entry fun deposit_sui(
        _goal: &mut SavingsGoal,
        _coin: Coin<sui::sui::SUI>,
        _ctx: &mut TxContext,
    ) {
        // TODO: implement
    }

    /// Withdraw funds from a goal. Owner-only.
    public entry fun withdraw(
        _goal: &mut SavingsGoal,
        _amount: u64,
        _ctx: &mut TxContext,
    ) {
        // TODO: implement
    }

    /// Mark a goal as completed.
    public entry fun mark_complete(
        _goal: &mut SavingsGoal,
        _ctx: &mut TxContext,
    ) {
        // TODO: implement
    }

    /// Toggle grow mode and set allocation basis points.
    public entry fun toggle_grow_mode(
        _goal: &mut SavingsGoal,
        _enabled: bool,
        _allocation_bps: u64,
        _ctx: &mut TxContext,
    ) {
        // TODO: implement
    }

    // ── Accessors (used by other modules) ────────────────────────────────────

    public fun owner(goal: &SavingsGoal): address { goal.owner }
    public fun asset_type(goal: &SavingsGoal): u8 { goal.asset_type }
    public fun grow_mode_enabled(goal: &SavingsGoal): bool { goal.grow_mode_enabled }
    public fun grow_mode_allocation_bps(goal: &SavingsGoal): u64 { goal.grow_mode_allocation_bps }
    public fun auto_save_enabled(goal: &SavingsGoal): bool { goal.auto_save_enabled }
    public fun auto_save_amount(goal: &SavingsGoal): u64 { goal.auto_save_amount }
    public fun auto_save_interval(goal: &SavingsGoal): u64 { goal.auto_save_interval }
    public fun last_auto_save_epoch(goal: &SavingsGoal): u64 { goal.last_auto_save_epoch }
}
