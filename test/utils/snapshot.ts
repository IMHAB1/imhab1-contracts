import ethers from "ethers";
import invariant from "invariant";

export class Snapshot {
  private _snapshotId: any;

  constructor(private _provider: ethers.providers.Web3Provider) {}

  /**
   * @dev rollback to saved snapshot
   */
  async rollback() {
    await this._provider.send("evm_revert", [this._snapshotId]);
    return this.takeSnapshot();
  }

  /**
   * @dev take a snapsnot for current block
   */
  async takeSnapshot() {
    const snapshotId = await this._provider.send("evm_snapshot", [
      this._snapshotId,
    ]);
    invariant(snapshotId, `invalid snapshotId: ${snapshotId}`);
    this._snapshotId = snapshotId;
  }
}
