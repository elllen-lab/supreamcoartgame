import {
  PrismaClient,
  Role,
} from '@prisma/client';


const prisma = new PrismaClient();


async function main() {


  console.log('🌱 Начинаем заполнение базы...');



  const admin =
    await prisma.user.upsert({

      where:{
        discordId:'111111111111111111',
      },


      update:{},


      create:{


        discordId:
          '111111111111111111',


        username:
          'ELLLEN',


        role:
          Role.SUPER_ADMIN,


      },


    });




  const chiefJudge =
    await prisma.user.upsert({

      where:{
        discordId:'222222222222222222',
      },


      update:{},


      create:{


        discordId:
          '222222222222222222',


        username:
          'Chief Judge',


        role:
          Role.CHIEF_JUDGE,


      },


    });





  const judge =
    await prisma.user.upsert({

      where:{
        discordId:'333333333333333333',
      },


      update:{},


      create:{


        discordId:
          '333333333333333333',


        username:
          'Judge One',


        role:
          Role.JUDGE,


      },


    });





  console.log('Созданы пользователи:');

  console.log(admin);

  console.log(chiefJudge);

  console.log(judge);





  const courtCase =
    await prisma.case.create({

      data:{


        number:
          'SA-0001',


        title:
          'Первое дело Верховного суда San Andreas',


        description:
          'Тестовое судебное дело',


        status:
          'OPEN',


        authorId:
          admin.id,


      },


    });





  console.log(
    'Создано дело:',
    courtCase.number,
  );



}



main()

.then(async()=>{

  await prisma.$disconnect();

})


.catch(async(e)=>{


  console.error(e);


  await prisma.$disconnect();


  process.exit(1);


});