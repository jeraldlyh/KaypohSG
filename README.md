# KaypohSG - Smart Neighborhood Watch

Fostering community safety and engagement through KaypohSG - the modern solution for neighborhood vigilance. With features ranging from real-time alerts to verified incident reporting, KaypohSG empowers residents to connect, report, and act together for a safer and more secure community.

## Table of Contents

- [KaypohSG - Smart Neighborhood Watch](#kaypohsg---smart-neighborhood-watch)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
    - [Environment Variables](#environment-variables)
    - [Testing the Application](#testing-the-application)
  - [Wireframe](#wireframe)
  - [Features](#features)
    - [Reporting](#reporting)
    - [Report Verification](#report-verification)
    - [Interactive Neighbourhood Map](#interactive-neighbourhood-map)
    - [Dashboard](#dashboard)
    - [Styling](#styling)
  - [Contribution](#contribution)
  - [License](#license)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- NPM (Node Package Manager)

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project's root directory in your terminal.

```bash
git clone https://github.com/jeraldlyh/KaypohSG.git
cd KaypohSG
```

3. Install the project's dependencies using NPM

```bash
cd frontend && npm install
cd ../backend && npm install
```

### Running the Application

Run both frontend and backend API sever using `docker-compose` in the project's root directory

```bash
cd url-shortener
docker compose up
```

### Environment Variables

| Name                     | Description                     |
| ------------------------ | ------------------------------- |
| `FIRESTORE_PROJECT_ID`   | Firestore project ID            |
| `FIRESTORE_PRIVATE_KEY`  | Firestore private key           |
| `FIRESTORE_CLIENT_EMAIL` | Firestore client email          |
| `AUTH_SECRET`            | JWT secret key                  |
| `AUTH_SALT_ROUNDS`       | Cost refactor to calculate hash |

Access the application by opening your web browser and navigating to `http://localhost:3000`

### Testing the Application

The application includes unit tests to ensure its functionality and reliability.

```bash
npm test
```

## Wireframe

Check out the [wireframe on Figma](https://www.figma.com/file/IjtDvpsHNY6Fl6lspjV5SW/Govtech-NDI?type=design&node-id=2%3A262&mode=design&t=332hGDUHoQ4nxEJs-1) to preview the application's visual design.

## Features

### Reporting

1. In the frontend application, open up the modal via the add button
2. Select the type of reporting _(i.e. Info, Sighting or Alert)_ and enter the description, followed by the location of the sighted report
3. Click the _"Submit"_ button.
4. The report will be displayed on the map where other users can view the report and verify acordingly.

### Report Verification

Click on the thumbs up or down arrow to endorse or critique reports from other users, enhancing the authenticity and reliability of shared information.

### Interactive Neighbourhood Map

Visualize the neighborhood's safety status with ease. Icons on the map highlight recent info/sightings/alerts, while a dotted radius signifies your vicinity. This ensures that only users within the same neighborhood contribute, fostering localized collaboration.

### Dashboard

Stay organized with the user-friendly dashboard. Quickly view and access reports, and easily toggle markers on the map for enhanced visibility. A unified interface for efficient monitoring and engagement.

### Styling

Experience modern aesthetics with customizable themes. Toggle between a dark theme and the captivating dracula theme. The application is designed to be fully responsive, ensuring seamless usability across devices.

## Contribution

We welcome contributions to enhance the KaypohSG platform. Whether you're a developer, designer, or community advocate, your contributions are valuable in making neighborhoods safer and more connected.

**Bug Fixes**: Help us identify and resolve bugs to improve user experience.

**Feature Enhancements**: Add new features that contribute to community engagement and safety.

**Documentation**: Improve existing documentation or create guides for newcomers.

**Feedback**: Share your ideas and suggestions to shape the platform's future.

## License

KaypohSG - Smart Neighborhood Watch is released under the [MIT License](LICENSE).
