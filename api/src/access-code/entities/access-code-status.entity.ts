import { Common } from "src/common/entities/common.entity";
import { OneToMany, JoinColumn, Entity } from "typeorm";
import { AccessCode } from "./access-code.entity";

@Entity({name: "common"})
export class AccessCodeStatus extends Common {
  @OneToMany(() => AccessCode, accessCode => accessCode.status)
  @JoinColumn({ name: 'id' })
  public accessCodes: Promise<AccessCode[]>
}