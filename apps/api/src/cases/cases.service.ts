import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CasesService {

  constructor(
    private prisma: PrismaService,
  ) {}


  // Все дела
  findAll() {
    return this.prisma.case.findMany({
      include: {
        judge: true,
      },
    });
  }


  // Создание дела
  create(data: {
    number: string;
    title: string;
    description: string;
  }) {
    return this.prisma.case.create({
      data: {
        number: data.number,
        title: data.title,
        description: data.description,
      },
    });
  }


  // Найти дело
  findOne(id: string) {
    return this.prisma.case.findUnique({
      where: {
        id,
      },
      include: {
        judge: true,
      },
    });
  } async assignJudge(
  caseId: string,
  judgeId: string,
) {
  return this.prisma.case.update({
    where: {
      id: caseId,
    },
    data: {
      judgeId,
    },
    include: {
      judge: true,
    },
  });
}
}