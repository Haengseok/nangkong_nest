import { Injectable, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class DtoService {
  async transform<T extends object>(
    classType: new (...args: any[]) => T,
    data: any,
  ): Promise<T> {
    // 데이터를 DTO 클래스로 변환
    const dtoInstance = plainToClass(classType, data);

    // DTO에 적용된 유효성 검사 수행
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      // 유효성 검사 오류가 있는 경우 BadRequestException 발생
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join('; ');
      throw new BadRequestException(errorMessage);
    }

    // 유효성 검사를 통과한 DTO 인스턴스 반환
    return dtoInstance;
  }
}
