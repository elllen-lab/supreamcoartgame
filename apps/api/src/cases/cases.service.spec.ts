import { Test, TestingModule } from '@nestjs/testing';
import { CasesService } from './cases.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';


describe('CasesService', () => {

  let service: CasesService;


  beforeEach(async () => {

    const module: TestingModule =
      await Test.createTestingModule({

        providers: [

          CasesService,


          {
            provide: PrismaService,

            useValue: {

              case: {
                findUnique: jest.fn(),
                findMany: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
              },


              caseDecision: {
                findUnique: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
              },


              user: {
                findUnique: jest.fn(),
              },


              auditLog: {
                create: jest.fn(),
              },

            },

          },


          {
            provide: AuditService,

            useValue: {

              create: jest.fn(),

            },

          },


        ],

      }).compile();



    service = module.get<CasesService>(
      CasesService,
    );

  });



  it('should be defined', () => {

    expect(service).toBeDefined();

  });


});