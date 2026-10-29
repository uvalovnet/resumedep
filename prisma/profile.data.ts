import { Prisma } from '@prisma/client';

export const profileData = {
  
  name: 'Прокудин Вадим',
  description: 'Middle backendиразработчик. TypeScript, NestJS, PostgreSQL, .NET',

  links: { create: [
    { 
      label: 'GitHub',
      url: 'https://github.com/uvalovnet' 
    },
  ] },

  skills: { create: 
    [
      'TypeScript', 'Node.js', 'NestJS', 'Prisma', 
      'GraphQL', 'PostgreSQL', 'Docker', 'Git',
      'C#', 'EFCore', 'Kafka', 'React', 'Redis',
      'ELK', 'SignalR'
    ]
  .map((name) => ({ name })) },
  
  experience: { 
    create: 
    [
      { 
        company: 'PayMangoService', 
        position: 'Junior C# developer',
        startDate: '05-2020', 
        endDate: '01-2023',
        achievements: 
        [
          'Миграция и оптимизация на .NET 6: Участвовал в переводе критичного микросервиса биллинга с .NET Framework 4.8 на .NET 6. ', 
          'Настроил стратегию скользящего окна (sliding expiration) и упреждающее обновление (proactive refresh) через фоновый IHostedService для критичных справочников'
        ] 
      },
      { 
        company: 'ТНС энерго', 
        position: 'Middle C# разработчик',
        startDate: '05-2020', 
        endDate: '01-2023',
        achievements: 
        [
          'Спроектировал и внедрил микросервис на .NET 9 / ASP.NET Core для учёта показаний потребителей с нагрузкой в пиковые часы до 20к запросов.', 
          'Завершил разработку и ввёл в эксплуатацию новый внутренний продукт.',
          'Покрыл 80% кода ключевых модулей тестами.'
        ] 
      },
    ] },

  projects: { create: [
    { name: '', url: '', description: '' },
  ] },

} satisfies Prisma.ProfileCreateInput;
