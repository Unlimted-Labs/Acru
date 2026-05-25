/// Savings Passport — the user's permanent on-chain financial identity.
/// Holds a pointer to an encrypted Walrus blob containing the full passport history.
module acru::savings_passport {
    use sui::object::{Self, UID};
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::event;
    use acru::events::PassportUpdated;

    const ENotOwner: u64 = 1;

    /// On-chain passport object. Ownership proves the user controls this identity.
    public struct SavingsPassport has key, store {
        id: UID,
        owner: address,
        /// Incrementing version, updated on every snapshot.
        version: u64,
        /// Walrus blob ID pointing to the encrypted passport summary.
        walrus_blob_id: vector<u8>,
    }

    /// Create a passport during onboarding and transfer it to the caller.
    public entry fun create_passport(
        _ctx: &mut TxContext,
    ) {
        // TODO: implement
    }

    /// Update the Walrus blob reference after a new AI snapshot is stored.
    /// Increments version and emits PassportUpdated.
    public entry fun update_passport_blob(
        _passport: &mut SavingsPassport,
        _new_blob_id: vector<u8>,
        _ctx: &mut TxContext,
    ) {
        // TODO: implement
    }

    public fun owner(passport: &SavingsPassport): address { passport.owner }
    public fun version(passport: &SavingsPassport): u64 { passport.version }
    public fun walrus_blob_id(passport: &SavingsPassport): &vector<u8> { &passport.walrus_blob_id }
}
