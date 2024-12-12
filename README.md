# Support Our Scrubs Noble Award
## Project Background and Introduction

Crystella, after seeing her daughter's struggles as a nurse during the COVID pandemic, became motivated to help first responders by starting her organization Support Our Scrubs, which was meant to show acts of kindness to first responders for everything they do for our community. Her mission to start this non-profit organization is to bring together both the needs and generosity of our communities. Shesupports frontline heroes, local businesses, and facilitates acts of kindness.

This project aims to recognize frontline workers through The Noble Award. Crystella McIvor, the founder of Support Our Scrubs, wants to add to her website a new page where frontline workers can receive awards after being nominated by someone else. 

Nominator:
- Submit nominations using the form page and filling out required info
- Upon nomination, nominators have the option to create an account and view the nominee database
- Nominators can search, and filter for nominees
- Nominators can change the status of the award for nominee

Admin:
- Access to entire nominee table with permissions to edit anything or soft delete nominees

## Functional Requirements:

Nomination Form:
- This page displays the form for entering nominee information
- Nominator must enter:
  - Nominee first name
  - Nominee last name
  - Nominee email
  - Nominee phone number
  - Nominee address
  - Nominee place of work
  - Nominee occupation
  - Photo of nominee
  - Nominator first name
  - Nominator last name
  - Nominator email
- Donation button which links to the Support Our Scrubs donation page
- View Nominee button which redirects to nominee database

Nominee Database
- This page displays the nominee database consisting of all nominees submitted by the nominator
- The nominator must create an account in order to access this page
- The Nominator can:
  - Review nominations and nominee info
  - Filter by award status
  - Search for nominees
  - Change the status of nominee award
- Log out button to log out and return to homepage
 
## Third Party Integration
Auth0
- Auth0 handles the emails and passwords. We redirect users to Auth0, the user fills out their info, and then Auth0 sends the user back to us
- Account creation is only for Nominators

## Tech Stack
- Frontend & Backend: Nuxt.js, Vue, Tailwind, Typescript
- Database: MySQL, Prisma ORM
- Other Tools: Postman for API testing

## Deployment Notes

N/A

## Migration Scripts

N/A

## Setting Up Development Environment

### 1. Make sure these are required programs are installed

- Install [git](https://git-scm.com/)
- Install [VS Code](https://code.visualstudio.com/)
- Install these VS Code extensions:
  - [Tailwind](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- Install [MySQL](https://dev.mysql.com/downloads/workbench/) with default settings
- Install [Node.js](https://nodejs.org/en)

### 2. Clone repository

- Open VS Code
- git clone `https://github.com/UTDallasEPICS/Support-Our-Scrubs-Noble-Award`
- Select the location you want your project directory to be
- Open the repository location in VS Code
- npm install

### 3. Set your environment variables
- `cp .env.example .env`

### 4. Setup MySQL and Prisma (For Local Development)
- `npx prisma migrate dev --name init`
- `npx prisma generate dev`

### 5. Run the Application
- `npm run dev`










