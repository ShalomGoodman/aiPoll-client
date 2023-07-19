# API POLL

This repository contains the frontend code for our full-stack web application, which allows users to vote.

https://imgur.com/a/f3InIVa

# Deployment

Our app is deployed on Vercel. You can access the live deployment at https://ai-poll-client-awsordsz0-elijahw.vercel.app/

## Key Features 

- **Authentication**: Secure user authentication for personalized experiences.
- **Responsive Design**: Responsive layout for optimal viewing across devices.
- **Modern JavaScript Framework**: Built using React v18.
- **Modular Codebase**: Well-organized code structure with clear separation of assets, authentication, components, pages, and styles.

## Technologies Used

- Frontend: React, React Router, Axios
- Backend: Django
- Deployment: Vercel

## Project Description

The API Poll App is a full-stack web application built using React. It provides users with an intuitive interface to explore voting polls. Users can scroll through polls, vote, view and create.

## Project Structure

The project structure is as follows:

```
public
src
├── api
│   └── sendEther.js
├── assets
│   ├── b1.png
│   └── GOLD.png
├── auth
│   ├── AuthContextComponent.js
│   ├── baseURL.js
│   └── validToken.js
├── components
│   └──modal
│   │   └── CreatePoll.js
│   ├── Chatbox.js
│   ├── Choice.js
│   ├── Comment.js
│   ├── ERC20.js
│   ├── GetTimeDiff.js
│   ├── Navbar.js
│   ├── Poll.js
│   └── User.js
│   └── contracts
│       ├──contractAbi.js
│       ├── epi20interface.sol
│       ├──contractAbi.js
│       └── Truthanium.sol
│   └──interfaces 
│       ├──contractAbi.js
│       └── ERC20interface.js
├── pages
│   └──Home
│       ├── homepage.css
│       └──  HomePage.js
│   └──Login
│       ├──loginpage.css
│       └── LoginPage.js
│   └──Poll
│       ├──pollpage.js
│       └──  PollPage.js
│   └──Signup
│   │     ├──signup.css
│   │     └── Signup.js
│   └── utli
│   ├──contractConnection.js
          └── walletConnection.js 
│ 
App.css
App.js
App.test.js
Index.css
index.js
.env.local
.gitignore
package-lock.json
package.json
README.md
```

## Installation and Setup

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/1ElijahW/aiPoll-client..git`
2. Install the dependencies: `npm install`
3. Start the development server: `npm start`


## Contributors

This project has been developed by the following contributors:


 1ElijahW (Elijah) - Front End Developer / UX-UI Designer

- Deployed the frontend to Vercel.
- Developed the public frontend repository.
- Made significant contributions to frontend development and CSS styling.
- Collaborated on frontend architecture and best practices, leveraging UX/UI background.
- Conducted code reviews and managed git pulls, merges, and conflicts.

 granth2023 (Grant )- Front End Developer / Technical Led

- Managed group scheduling and delegated responsibilities.
- Conducted and scheduled standup meetings.
- Made significant contributions to frontend authentication, and Web3.
- Collaborated on frontend architecture and best practices.
- Conducted code reviews and managed git pulls, merges, and conflicts. 

 ShalomGoodman (Shalom) - Backend Developer / Database Specialist

- Implemented backend routes and Django integration.
- Collaborated on backend architecture and best practices.
- Collaborated on frontend architecture and best practices.
- Conducted code reviews and managed git pulls, merges, and conflicts.

alibay97 (Alison) - Frontend Developer / Graphic Designer

- Led frontend design efforts.
- Made significant contributions to frontend development and CSS styling.
- Collaborated on frontend architecture and best practices leveraging Graphic Design background.
- Conducted code reviews and managed git pulls, merges, and conflicts.

## Contributing

Contributions to the project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature/bug fix: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your commit message"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

Please make sure to follow the code style guide and maintain consistency with the existing codebase.

## Contact

For any inquiries or further information, please feel free to reach out to any of the contributors mentioned above.

We hope you enjoyed your journey into the ApiPoll!