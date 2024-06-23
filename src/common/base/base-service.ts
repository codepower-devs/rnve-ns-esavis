import { LoggerService } from '@/core/logger'
import { AbstractController } from '../dto/abstract-controller.dto'

export class BaseService {
  protected logger: LoggerService

  constructor() {
    this.logger = LoggerService.getInstance()
  }
}
