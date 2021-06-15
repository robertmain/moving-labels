import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'server/base/base.service';
import {
  EntityNotFoundError, QueryFailedError, Repository,
} from 'typeorm';
import { Box } from './box.entity';

export class BoxService extends BaseService<Box> {
  @InjectRepository(Box)
  protected repository: Repository<Box>;

  public async remove(id: string): Promise<void> {
    const [box] = await this.repository.findByIds([id]);
    if (!box) {
      throw new EntityNotFoundError(Box, { id });
    }
    const status = await this.repository.softRemove(box);

    if (!status) {
      const { driver } = this.repository.manager.connection;
      throw new QueryFailedError('', [{ id }], driver);
    }
  }
}
