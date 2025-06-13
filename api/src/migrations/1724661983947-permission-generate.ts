import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class PermissionGenerate1724661983947 implements MigrationInterface {

  private table = 'permission';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.table,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'group',
            type: 'varchar',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'group_name',
            type: 'varchar',
          },
          {
            name: 'type_name',
            type: 'varchar',
          },
          {
            name: 'updated',
            type: 'timestamptz',
            default: 'now()'
          },
          {
            name: 'created',
            type: 'timestamptz',
            default: 'now()'
          },
          {
            name: 'deleted',
            type: 'timestamptz',
            isNullable: true
          }
        ],
      }),
      true,
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }

}
