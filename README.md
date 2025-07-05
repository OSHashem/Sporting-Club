# Sporting-Club


## 🛠 Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [class-validator](https://github.com/typestack/class-validator)
- [Cache Manager](https://docs.nestjs.com/techniques/caching)

---
## 🚀 Project Setup Instructions

Follow the steps below to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/OSHashem/Sporting-Club
cd Sporting-Club
```

---

### 2. Install Dependencies
```bash
npm install
```
 ---

 ### 3. Configure the Environment
Create a .env file in the root directory:

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=sporting_club
```
Replace with your actual DB credentials.

---
### 4. Run the Application
```bash
# For development
npm run start:dev

# For Production
npm run start
```
