import { Common } from "src/common/entities/common.entity";
import { OneToMany, JoinColumn, Entity } from "typeorm";
import { Voucher } from "./voucher.entity";

@Entity({name: "common"})
export class VoucherType extends Common {
  @OneToMany(() => Voucher, voucher => voucher.type)
  @JoinColumn({ name: 'id' })
  public vouchers: Promise<Voucher[]>
}