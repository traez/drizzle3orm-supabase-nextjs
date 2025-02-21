# Drizzle ORM Supabase Nextjs App

Drizzle ORM practical app based on my TechCareer Transition schedule.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The Challenge/User Stories

Build a full-stack Next.js 14 app with Supabase, Drizzle ORM, and ShadCN UI, integrating authentication, database management, and UI components. The app will allow users to create, edit, and delete notes, implementing infinite scrolling for a seamless experience. Key challenges include setting up database relations, handling migrations, optimizing API calls, and ensuring a smooth UI/UX. The goal is to apply Drizzle ORM effectively in a real-world project, solidifying skills in schema design, query optimization, and Supabase integration while following best practices from multiple resources.     

### Screenshot

![](/public/screenshot-desktop.png)

### Links

- Solution URL: [https://github.com/traez/drizzle-orm-supabase-nextjs](https://github.com/traez/drizzle-orm-supabase-nextjs)
- Live Site URL: [https://drizzle-orm-supabase-nextjs.vercel.app/](https://drizzle-orm-supabase-nextjs.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox and CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- Typescript
- Nodejs            
- Tailwind CSS     
- Sonner 
- dotenv  
- drizzle 
- postgres 
- react-icons  

### What I learned
   
**1 ORM Comparison**  
Drizzle and Prisma are to database management what Bootstrap and Tailwind are to CSS frameworks.  
Drizzle ORM requires a solid understanding of SQL, enhancing its power and flexibility.  

**2 Drizzle Ecosystem**  
>Drizzle ORM: The core library for type-safe database operations and schema definitions.  
>Drizzle Kit: A command-line migration manager tightly integrated with Drizzle ORM.  
>Drizzle Studio: A GUI tool for database visualization and management.  

**3 Updating Dependencies**  
Check the latest version of Next.js: `npm show next version`  
Update the version number in `package.json`  
Run `npm install` to update dependencies  
Test the application: `npm run dev` or `yarn dev`  

**4 Installation Process**  
`npm install drizzle-orm postgres @paralleldrive/cuid2`  
`npm install -D drizzle-kit`  
Note: `drizzle-kit` is a development dependency for CLI tasks.

**5 IDE Productivity Tip**  
Modern IDEs like VS Code allow running npm scripts directly from the `package.json` file, enhancing workflow efficiency.  

**6 Environment Variables Management**  
Different `.env` files (`local`, `development`, `production`, `test`) manage settings for various stages.  
In production, hosting platforms typically require manual input of environment variables for security. 

**7 Drizzle ORM vs. Supabase Client**  
>Drizzle ORM: Offers more control, type safety, and flexibility but requires additional setup.  
>Supabase Client: Simpler and faster, but with less control and flexibility.  

**8 Design Consideration**  
In CSS Grids when you don't explicitly define Card height and Width, rendering will default to a situation where height is equal but different across rows.

**9 Application Building Process Flow**  
Step 1: Install required dependencies  
Step 2: Set up environment variables  
Step 3: Connect Drizzle ORM to Supabase `(src/db/index.ts)`  
Step 4: Define database schema `(src/db/schema.ts)`  
Step 5: Configure Drizzle Kit for migrations `(drizzle.config.ts)`   
Step 6: Generate migrations `(npx drizzle-kit generate)`  
Step 7: Apply migrations `(npx drizzle-kit migrate)`  
Step 8: Create API routes  
Step 9: Build the frontend  

**10 Drizzle Configuration**  
Extended configurations in `drizzle.config.ts`:  
`verbose`: Print all SQL statements before execution  
`strict`: Always ask for approval before executing SQL statements  

**11 Migration Alternatives**  
`npx drizzle-kit push`: An alternative to migrations, but it wipes existing data  
Manual schema modification in Supabase (not recommended for production)  

**12 Troubleshooting Migrations**  
Reference: [https://github.com/drizzle-team/drizzle-orm/issues/2590](https://github.com/drizzle-team/drizzle-orm/issues/2590)

**13 Understanding Migration Workflow**  
`drizzle-kit generate` and `drizzle-kit migrate` are only needed for schema changes  
CRUD operations are handled via Next.js API routes using DrizzleORM  
Migrations are backend actions managed by developers  
Users interact with the frontend, not directly with the database structure   

**14 Optimizing Workflow**  
Consider adding npx commands as scripts in `package.json` for easier execution.    

### Continued development

- More projects; increased competence!

### Useful resources

Stackoverflow  
YouTube  
Google  
ChatGPT

## Author

- Website - [Zeeofor Technologies](https://zeeofortech.vercel.app/)
- Twitter - [@trae_z](https://twitter.com/trae_z)

## Acknowledgments

-Jehovah that keeps breath in my lungs
