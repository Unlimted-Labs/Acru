/// All on-chain events emitted by the acru package.
/// Every event carries enough context for the backend indexer
/// to reconstruct full state without querying object fields directly.
module acru::events {
    use sui::object::ID;

    /// Emitted when a new SavingsGoal is created.
    public struct GoalCreated has copy, drop {
        goal_id: ID,
        owner: address,
        asset_type: u8,
        target: u64,
        deadline: u64,
    }

    /// Emitted on every deposit into a SavingsGoal.
    public struct Deposit has copy, drop {
        goal_id: ID,
        owner: address,
        amount: u64,
        asset_type: u8,
        epoch: u64,
    }

    /// Emitted on every withdrawal from a SavingsGoal.
    public struct Withdrawal has copy, drop {
        goal_id: ID,
        owner: address,
        amount: u64,
        asset_type: u8,
        epoch: u64,
    }

    /// Emitted when a goal is marked complete.
    public struct GoalCompleted has copy, drop {
        goal_id: ID,
        owner: address,
        final_balance: u64,
    }

    /// Emitted when an auto-save execution runs.
    public struct AutoSaveExecuted has copy, drop {
        goal_id: ID,
        amount: u64,
        epoch: u64,
    }

    /// Emitted when funds are allocated from a goal into a grow protocol.
    public struct GrowAllocationCreated has copy, drop {
        goal_id: ID,
        allocated: u64,
        protocol: vector<u8>,
    }

    /// Emitted when funds are returned from a grow protocol to the goal.
    public struct GrowAllocationReturned has copy, drop {
        goal_id: ID,
        original: u64,
        returned: u64,
    }

    /// Emitted when the Savings Passport Walrus blob reference is updated.
    public struct PassportUpdated has copy, drop {
        passport_id: ID,
        owner: address,
        walrus_blob_id: vector<u8>,
        version: u64,
    }
}
