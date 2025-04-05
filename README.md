# prisma-mongo
api with prisma as a orm and mongodb as a database!

---

## 🌱 Phase 1: Basic — Getting Started with Prisma + MongoDB + Node.js

---

### 1. **Environment Setup**

#### 🔹 Node.js
- JavaScript runtime for backend development.
- Install via Node.js official site.
- Run server-side code with `node` or `nodemon`.

#### 🔹 MongoDB
- A **NoSQL database** that stores data in **JSON-like documents** (BSON).
- Collections = Tables, Documents = Rows (kind of).
- Use **MongoDB Atlas** (cloud) or **local MongoDB**.

#### 🔹 Prisma
- **ORM (Object Relational Mapper)** for **type-safe** database access.
- It helps you interact with the database using JavaScript objects instead of raw queries.
- Prisma CLI: `npx prisma init`

---

### 2. **Understanding Prisma Schema File (`schema.prisma`)**

The `schema.prisma` file is where you define your **data models**, database type, and generator settings.

#### 🧱 Basic Blocks:

##### `generator`
- Tells Prisma to generate the client library to interact with the DB.
- Example attr:  
  - `provider = "prisma-client-js"` → generates Prisma Client in JS.

##### `datasource`
- Connects your app to a database.
- Example attr:
  - `provider = "mongodb"` → sets MongoDB as DB.
  - `url = env("DATABASE_URL")` → fetches DB connection string from `.env`.

---

### 3. **Modeling Data with `model` Blocks**

A `model` defines a **MongoDB collection**. Each field becomes a property of your document.

#### ✏️ Common Field Attributes:
- `@id` → defines the **primary key** (usually Mongo `_id`)
- `@default()` → sets a default value (e.g., for timestamps or UUIDs)
- `@map()` → renames the field in Mongo (e.g., map `id` to `_id`)
- `@unique` → makes the field unique in the DB (e.g., email)

#### 🔠 Field Types (MongoDB Compatible)
| Prisma Type | Description                     |
|-------------|---------------------------------|
| `String`    | Text values                     |
| `Int`       | Integer numbers                 |
| `Boolean`   | `true` or `false`               |
| `DateTime`  | Timestamps                      |
| `Float`     | Decimal numbers                 |
| `ObjectId`  | MongoDB's internal ID type      |
| `Json`      | For storing nested objects      |

---

### 4. **Migrate and Generate**

MongoDB is **schema-less**, so Prisma doesn’t use migrations. But you still need to:
- Run `npx prisma generate` to generate Prisma Client.
- Use `npx prisma db push` to **sync models to MongoDB**.

---

### 5. **Prisma Client Basics**

After generating the client, import and use it like:
```js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
```

You can now use functions like:
- `prisma.model.create()` – Create a document
- `prisma.model.findMany()` – Read multiple documents
- `prisma.model.findUnique()` – Read one by ID/unique field
- `prisma.model.update()` – Update a document
- `prisma.model.delete()` – Delete a document

---

### 6. **MongoDB Connection URI (in `.env`)**

A MongoDB URI looks like:
```
DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/db-name"
```
Used inside `schema.prisma` with `env("DATABASE_URL")`.

---

### 7. **Basic Jargon Recap**

| Term               | Meaning |
|--------------------|--------|
| **ORM**            | Object Relational Mapper – bridges code and DB |
| **Document**       | Single JSON object in MongoDB |
| **Collection**     | Group of documents (like a table) |
| **Schema**         | Structure of data (defined by you in Prisma) |
| **Model**          | Represents a MongoDB collection |
| **Prisma Client**  | Auto-generated library to interact with DB |
| **CRUD**           | Create, Read, Update, Delete operations |
| **Relation**       | Link between two models (one-to-many, etc.) |
| **MongoDB Atlas**  | Cloud-based MongoDB hosting |
| **.env file**      | Stores sensitive credentials |

---

Here you go, Sri! Here's your **⚙️ Phase 2: Intermediate** roadmap for **Prisma + MongoDB + Node.js**, focusing on practical concepts, rich with **jargon**, and building on Phase 1. No code, just clean explanation.

---

## ⚙️ Phase 2: Intermediate

---

### 📄 **Relations & Queries**

MongoDB is **non-relational**, but Prisma helps model relationships **logically** using embedded references or `ObjectId`s. These concepts help your backend resemble relational structures for cleaner access and maintenance.

---

### 🔗 **One-to-Many and Many-to-Many Relations**

#### 📌 One-to-Many
Example: One User → Many Posts

- A **foreign key reference** is stored in the "many" side.
- Prisma handles this using `@relation()` attributes internally for MongoDB.

#### 📌 Many-to-Many
Example: A Post can have many Tags, and a Tag can belong to many Posts.

- Usually modeled via an **intermediate table (join collection)** like `PostTags`.
- In Prisma with MongoDB, it's done using arrays of `ObjectId`.

#### 🧠 Jargon:
| Term           | Meaning |
|----------------|--------|
| **Relation**   | Logical link between models |
| **Foreign Key**| Value used to link documents (e.g., `userId`) |
| **Join Table** | Middle collection that links two many-to-many sides |
| **Reference Field** | Field in one document pointing to another document's ID |

---

### 🧩 **`include` vs `select`**

#### `include`
- Fetches **related models**.
- Think: "Bring everything about this model and its related ones."

#### `select`
- Fetches **only specific fields**.
- Think: "I want just this slice of the data."

🧠 *You can combine both for performance and clarity.*

---

### 🔍 **Filtering Data (`where`)**

Used in read queries to narrow down results.

#### Common Filter Operators:

| Operator       | Description |
|----------------|-------------|
| `equals`       | Exact match |
| `contains`     | Substring match (like regex) |
| `startsWith`   | Checks prefix |
| `endsWith`     | Checks suffix |
| `in`           | Matches against array |
| `notIn`        | Excludes from array |
| `lt`, `gt`, `lte`, `gte` | For numbers and dates |

#### 🧠 Jargon:
- **Query Filter**: Conditions used to find specific data.
- **Chained Queries**: Combining multiple filters using `AND`, `OR`, `NOT`.

---

### 🔢 **Sorting with `orderBy`**

Controls the sort order of returned data.

| Keyword | Meaning |
|---------|--------|
| `asc`   | Ascending (A → Z, 1 → 10) |
| `desc`  | Descending (Z → A, 10 → 1) |

You can also **order by multiple fields** for refined control.

---

### 📦 **Pagination**

Efficiently loads chunks of data rather than entire collections.

#### 📍 Methods:

| Method    | Use |
|-----------|-----|
| `take`    | Limit the number of results |
| `skip`    | Skip the first n results |
| `cursor`  | Use a document’s unique ID to start fetching from a specific point |

This helps when you're building:
- Infinite scroll
- “Load more” buttons
- API endpoints with performance in mind

---

### 💡 Intermediate Concepts Jargon Recap

| Term          | Meaning |
|---------------|--------|
| **Filter**    | Condition to match documents |
| **Projection**| Choosing what fields to return (via `select`) |
| **Populate**  | (In Mongoose) = `include` in Prisma |
| **Pagination**| Divide large data sets into chunks |
| **Cursor**    | Pointer to a specific item used in paginated queries |
| **Chained Filter** | Multiple `AND` / `OR` conditions together |
| **Embedded Document** | A nested object inside another MongoDB document (used in 1-N relations sometimes) |

---

---

## ⚙️ Phase 2: Intermediate with Concepts + Code

---

### 🔗 **One-to-Many and Many-to-Many Relations**

---

#### 📌 One-to-Many

**Concept:**  
One document (e.g., User) relates to many documents (e.g., Posts). In MongoDB via Prisma, the "many" side holds a reference (`userId`) to the "one" side.

**Schema:**

```prisma
model User {
  id    String   @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  email String   @unique
  posts Post[]   // One-to-Many
}

model Post {
  id     String   @id @default(auto()) @map("_id") @db.ObjectId
  title  String
  body   String
  userId String   @db.ObjectId
  author User     @relation(fields: [userId], references: [id])
}
```

**Code:**

```js
const user = await prisma.user.create({
  data: {
    name: 'Sri',
    email: 'sri@email.com',
  },
});

const post = await prisma.post.create({
  data: {
    title: 'Prisma Rocks',
    body: 'Intermediate phase started',
    userId: user.id,
  },
});
```

---

#### 📌 Many-to-Many

**Concept:**  
Multiple `Posts` can have multiple `Tags`. This is done via arrays of ObjectIds, handled by Prisma internally.

**Schema:**

```prisma
model Post {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  title String
  tags  Tag[]   @relation("PostTags")
}

model Tag {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  posts Post[]  @relation("PostTags")
}
```

**Code:**

```js
const tag1 = await prisma.tag.create({ data: { name: 'anime' } });
const tag2 = await prisma.tag.create({ data: { name: 'goat' } });

const post = await prisma.post.create({
  data: {
    title: 'One Piece Post',
    tags: {
      connect: [{ id: tag1.id }, { id: tag2.id }],
    },
  },
});
```

---

### 🧩 `include` vs `select`

---

#### `include`

**Concept:**  
Pull related data. Think: "Bring full related records."

**Code:**

```js
const post = await prisma.post.findMany({
  include: {
    author: true,
    tags: true,
  },
});
```

---

#### `select`

**Concept:**  
Only pull specific fields from a model.

**Code:**

```js
const users = await prisma.user.findMany({
  select: {
    name: true,
    email: true,
  },
});
```

---

### 🔍 Filtering with `where`

---

**Concept:**  
Use conditions to narrow down results.

**Code:**

```js
const posts = await prisma.post.findMany({
  where: {
    title: {
      contains: 'Prisma',
      mode: 'insensitive',
    },
  },
});
```

**Other Operators:**

```js
// startsWith / endsWith
{ title: { startsWith: 'One' } }
{ title: { endsWith: 'Post' } }

// in / notIn
{ id: { in: [id1, id2] } }
{ email: { notIn: ['a@gmail.com', 'b@gmail.com'] } }
```

---

### 🔢 Sorting with `orderBy`

---

**Concept:**  
Order results by fields.

**Code:**

```js
const posts = await prisma.post.findMany({
  orderBy: {
    createdAt: 'desc',
  },
});
```

**Multiple sort:**

```js
orderBy: [
  { createdAt: 'desc' },
  { title: 'asc' }
]
```

---

### 📦 Pagination: `take`, `skip`, `cursor`

---

**Concept:**  
Split large sets into chunks.

**Code:**

```js
// Basic pagination
const posts = await prisma.post.findMany({
  skip: 10,
  take: 5,
});
```

```js
// Cursor-based pagination
const posts = await prisma.post.findMany({
  cursor: { id: lastSeenId },
  skip: 1,
  take: 5,
});
```

---

### 🔁 **Middlewares & Validations**

---

#### ✅ **Prisma Middleware (`prisma.$use`)**

**Concept:**  
Prisma Middleware allows you to **intercept** DB queries before/after they run. Great for logging, modifying data, access control, etc.

**Code:**

```js
prisma.$use(async (params, next) => {
  console.log(`⏳ Query: ${params.model}.${params.action}`);
  
  const result = await next(params);

  console.log(`✅ Completed: ${params.action}`);
  return result;
});
```

---

#### ⚠️ **Handling Unique Constraints**

**Concept:**  
Fields like `email` can be set as `@unique`. Prisma throws an error if you try to insert duplicates.

**Schema:**

```prisma
model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String
}
```

**Code:**

```js
try {
  const user = await prisma.user.create({
    data: {
      name: 'Sri',
      email: 'ssl@gmail.com',
    },
  });
} catch (err) {
  if (err.code === 'P2002') {
    console.log('🚫 Email must be unique');
  }
}
```

---

#### 🔎 **Schema Validation (custom errors)**

**Concept:**  
Validate input before Prisma gets it. Use packages like `zod` or `yup`.

**Code (with Zod):**

```js
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

try {
  userSchema.parse(req.body);
} catch (err) {
  return res.status(400).json({ error: err.errors });
}
```

---

### 🔐 **Authentication Concepts**

---

#### 🔒 **Hashing Passwords**

**Concept:**  
Passwords are stored **encrypted**, not as plain text.

**Code (bcrypt):**

```js
import bcrypt from 'bcrypt';

const hashed = await bcrypt.hash('plaintextPassword', 10);

const user = await prisma.user.create({
  data: {
    email: 'ssl@gmail.com',
    password: hashed,
  },
});
```

---

#### 🪙 **JWT Auth (Token-Based)**

**Concept:**  
Sign a token when a user logs in, send it back via header/cookie. Authenticated routes will check the token.

**Code:**

```js
import jwt from 'jsonwebtoken';

const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
  expiresIn: '7d',
});
res.cookie('token', token);
```

```js
// Middleware
const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
req.user = decoded;
```

---

#### 🛡 **Protecting Routes**

**Code:**

```js
function requireAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not logged in' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

---

### 🛠 **Developer Tools**

---

#### 🧪 **Prisma Studio**

**Concept:**  
A GUI to explore and edit your MongoDB data visually.

**Run it:**

```bash
npx prisma studio
```

You’ll get a local URL like `http://localhost:5555`.

---

#### 🪛 **Debugging with Logs**

**Code:**

```js
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

This helps trace slow queries, errors, and logic flow.

---

#### 🔐 **Using `.env` for Secrets**

**Concept:**  
Never hardcode secrets like database URLs, JWT keys, etc.

**.env:**

```
DATABASE_URL="mongodb+srv://..."
JWT_SECRET="your-super-secret"
```

**Use in code:**

```js
import dotenv from 'dotenv';
dotenv.config();

const db = process.env.DATABASE_URL;
```

---

---

## 🚀 Phase 3: Advanced — Prisma + MongoDB + Node.js

---

### 💡 **Advanced Prisma Features**

---

#### 🔁 **Transactions (`prisma.$transaction`)**

**Concept:**  
Bundle multiple operations so that either **all succeed or none** (atomicity).

**Use Case:** Creating a user and a profile — both must succeed together.

```js
await prisma.$transaction([
  prisma.user.create({ data: { name: 'Sri' } }),
  prisma.profile.create({ data: { bio: 'Dev', userId: '...' } }),
]);
```

---

#### 💬 **Raw Queries (`$queryRaw`, `$executeRaw`)**

**Concept:**  
Run native queries for performance or unsupported Prisma syntax.

- `$queryRaw`: For `SELECT`-like queries
- `$executeRaw`: For `INSERT`, `UPDATE`, `DELETE`

```js
const users = await prisma.$queryRaw`db.user.find({})`;
await prisma.$executeRaw`db.user.deleteMany({ age: { $lt: 18 } })`;
```

---

#### 📊 **Aggregations (`count`, `avg`, `sum`, `min`, `max`)**

**Concept:**  
Get summary stats — number of posts, average likes, etc.

```js
const stats = await prisma.post.aggregate({
  _count: true,
  _avg: { views: true },
  _sum: { likes: true },
  _min: { createdAt: true },
  _max: { createdAt: true },
});
```

---

#### 🧮 **`groupBy` Operations**

**Concept:**  
Group documents by a field and apply aggregate functions.

```js
const grouped = await prisma.post.groupBy({
  by: ['category'],
  _count: { _all: true },
  _avg: { likes: true },
});
```

---

#### 🔁 **Upserts (`create if not exists`)**

**Concept:**  
`upsert` = update if exists, else create.

```js
await prisma.user.upsert({
  where: { email: 'ssl@gmail.com' },
  update: { name: 'SSL Updated' },
  create: {
    email: 'ssl@gmail.com',
    name: 'SSL',
  },
});
```

---

#### 🔗 **`connectOrCreate`**

**Concept:**  
If a related record exists, connect it; otherwise, create it.

```js
await prisma.post.create({
  data: {
    title: 'One Piece World',
    author: {
      connectOrCreate: {
        where: { email: 'ssl@gmail.com' },
        create: {
          email: 'ssl@gmail.com',
          name: 'SSL',
        },
      },
    },
  },
});
```

---

### 🔍 **MongoDB-Specific Techniques**

---

#### 🗺️ **`@map("_id")` and MongoDB IDs**

**Concept:**  
MongoDB uses `_id` as the default ID. Prisma lets you map it to `id`.

```prisma
model User {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  name String
}
```

---

#### 🧬 **Nested Filtering and Querying**

**Concept:**  
Query deeply nested documents or related fields.

```js
await prisma.user.findMany({
  where: {
    posts: {
      some: {
        title: { contains: 'anime' },
      },
    },
  },
});
```

---

#### 🧱 **Embedded Types (limited support)**

**Concept:**  
MongoDB supports embedding objects inside documents. Prisma has **partial support** (e.g., JSON fields).

```prisma
model Product {
  id      String @id @default(auto()) @map("_id") @db.ObjectId
  name    String
  details Json   // Embedded type
}
```

```js
await prisma.product.create({
  data: {
    name: 'Keychain',
    details: { color: 'red', size: 'S' },
  },
});
```

---

---

### 🧪 **Testing & Optimization**

---

#### ✅ **Unit Testing with Prisma**

**Concept:**  
Ensure individual units (functions, DB ops) behave as expected using testing libraries like **Jest**, **Vitest**, or **Mocha**.

**Setup Example:**

```ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

test('should create user', async () => {
  const user = await prisma.user.create({
    data: { name: 'Sri', email: 'sri@test.com' },
  });
  expect(user.email).toBe('sri@test.com');
});
```

---

#### 🧪 **Mocking Prisma Client**

**Concept:**  
Simulate DB operations so that tests don’t hit a real database.

**Tooling:** Use libraries like `ts-mockito`, `jest.mock`, or `@quramy/prisma-fabbrica`.

**Example:**

```ts
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findFirst: jest.fn().mockResolvedValue({ email: 'mock@sri.com' }),
      },
    })),
  };
});
```

---

#### ⚡ **Optimizing Queries for Performance**

**Tips:**

- Use `select` instead of `include` to fetch only what you need.
- Index key fields in MongoDB (e.g., email, slug).
- Paginate large data sets (`take`, `skip`, `cursor`).
- Avoid nested includes unless required.
- Batch writes inside `prisma.$transaction`.

---

### 🌐 **Integration & Deployment**

---

#### 🌍 **Full REST API with Express or GraphQL**

- Build modular routes (e.g., `/auth`, `/posts`, `/users`)
- Integrate Prisma in route handlers

```ts
app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany({ take: 10 });
  res.json(posts);
});
```

- For GraphQL, tools: `apollo-server`, `type-graphql`, `nexus`.

---

#### 🚀 **Deployment to Render / Heroku / Vercel**

**Steps:**

1. Push your backend (Node + Prisma) to GitHub
2. Connect repo to Render or Heroku
3. Set environment variables (`DATABASE_URL`, `JWT_SECRET`)
4. Use build/start scripts properly (`npm run build`, `npm start`)

*Note:* For Vercel, use Serverless functions + Edge DB handling carefully.

---

#### 🗄️ **Using MongoDB Atlas in Production**

- Create a **free cluster** on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Whitelist IPs (0.0.0.0/0 for dev)
- Get the **connection string** and put it in `.env`:

```env
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/dbname"
```

- Run `npx prisma db push` to sync schema

---

#### 🧑‍💻 **Admin Panel with Prisma Studio or Custom UI**

- Prisma Studio: `npx prisma studio`
  - GUI to browse, edit, create, and delete DB records
- Custom UI:
  - Build your own dashboard with CRUD features using React/Next.js or any frontend stack
  - Backend APIs interact with Prisma

--- 

You're now equipped for **production-ready Prisma + MongoDB projects**.