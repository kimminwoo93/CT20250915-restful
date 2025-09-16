# CT20250915-restful

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

### Description

(주)사각 코딩테스트, API 만들기

### Prerequisites

1. Build

   ```bash
   docker-compose up --build
   ```

   빌드 시 더미 데이터들이 자동적으로 데이터베이스 상에 저장됩니다. 따라서 별도로 `Insert`하는 파일은 없습니다.

### How to use

1. Swagger 웹 페이지 접속

   브라우저를 통해 "http://localhost/docs" 접속 시 모든 API 명세가 포함된 Swagger 웹 페이지를 확인할 수 있습니다.

2. API 실행

   사용하고자 하는 API를 확인 후 "Try it out"을 통해 실행할 수 있습니다. 단, "Parameters"가 존재하는 API인 경우 API 명세에 맞는 값이 필요합니다.

   > Swagger가 아닌 curl, Postman 등의 도구를 사용해도 API 실행이 가능합니다.

   > 예시로 보여지는 데이터는 중복 오류가 발생할 수 있습니다. POST, PUT API 사용 시 임의의 값 수정이 필요합니다.

3. 기타
   - Docker 컨테이너 중지

     ```bash
     docker-compose down
     ```

   - Docker 컨테이너 재시작

     ```bash
     docker-compose up
     ```
