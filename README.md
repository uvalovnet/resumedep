Запуск
```sh
docker compose up --build -d
```

Откройте **http://localhost:3000/graphql** — Apollo Sandbox.
query Resume {
  profile {
    name
    description
    links { label url }
    skills { name }
    experience {
      company
      position
      startDate
      endDate
      achievements
    }
    projects { name description url }
  }
}



Локально, при наличии PostgreSQL и Node.js 22:
```sh
npm ci

npm run prisma:generate
npm run db:migrate
npm run db:seed
npm run build
node --env-file=.env dist/src/main.js
```