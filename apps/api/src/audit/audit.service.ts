import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class AuditService {

  constructor(
    private prisma: PrismaService,
  ) {}


  // Создание записи аудита
  create(
    userId: string,
    action: string,
    details: string,
    caseId?: string,
  ) {

    return this.prisma.auditLog.create({

      data: {

        userId,

        action,

        details,

        caseId,

      },

    });

  }



  // Все записи аудита
  findAll() {

    return this.prisma.auditLog.findMany({

      include: {

        user: true,

        case: true,

      },

      orderBy: {

        createdAt: 'desc',

      },

    });

  }




  // История конкретного дела
  findByCase(
    caseId: string,
  ) {

    return this.prisma.auditLog.findMany({

      where: {

        caseId,

      },

      include: {

        user: true,

      },

      orderBy: {

        createdAt: 'asc',

      },

    });

  }



  // История пользователя
  findByUser(
    userId: string,
  ) {

    return this.prisma.auditLog.findMany({

      where: {

        userId,

      },

      include: {

        case: true,

      },

      orderBy: {

        createdAt: 'desc',

      },

    });

  }


}