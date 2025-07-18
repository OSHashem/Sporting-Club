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

## 📘 API Summary

Below is a summary of the available RESTful endpoints grouped by module:

---

### 🧍 Members

| Method | Endpoint              | Description                              |
|--------|-----------------------|------------------------------------------|
| GET    | `/members`            | Get all members                          |
| GET    | `/members/:id`        | Get a member by ID                       |
| POST   | `/members`            | Create a new member                      |
| PATCH  | `/members/:id`        | Update an existing member                |
| DELETE | `/members/:id`        | Delete a member and their subscriptions  |
| GET    | `/members/:id/family` | Get family members of a main member      |
| POST   | `/members/:childId/link/:parentId`       | Link a child member to a main member     |

---

### 🏆 Sports

| Method | Endpoint      | Description                     |
|--------|---------------|---------------------------------|
| GET    | `/sports`     | Get all sports (cached)         |
| GET    | `/sports/:id` | Get a specific sport by ID      |
| POST   | `/sports`     | Create a new sport              |
| PATCH  | `/sports/:id` | Update a sport                  |
| DELETE | `/sports/:id` | Delete a sport                  |

---

### 📝 Subscriptions

| Method | Endpoint            | Description                                |
|--------|---------------------|--------------------------------------------|
| GET    | `/subscriptions`    | Get all subscriptions                      |
| GET    | `/subscriptions/:id`| Get a specific subscription by ID          |
| POST   | `/subscriptions`    | Subscribe a member to a sport              |
| DELETE | `/subscriptions/:id`| Unsubscribe from a sport by subscription ID|

---
