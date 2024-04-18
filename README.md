# islibraryopen

This project utilizes [Bun](https://bun.sh), a fast all-in-one JavaScript runtime.

## Setup

### Prerequisites

Make sure you have Docker and Docker Compose installed on your system. Additionally, ensure that Docker can run without sudo access for ease of use.

### Installation

1. Clone the repository to your server:

```bash
git clone <repository_url>
```

2. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. The `ADMINS` env var should have a format of `adminname1:token1,adminname2:token2` etc.

### Running the Application

To install dependencies, run:

```bash
bun install
```

To start the application, run:

```bash
bun run index.ts
```

Alternatively, you can use Docker Compose to run the application:

```bash
docker-compose up -d
```
To Update the Image run:
```bash
docker-compose pull && docker-compose up -d
```

The service will be accessible at port 3000.

## Updating the State

To update the state, open this page with a basic form and hit submit after entering tokens defined in .env

```
$sitename/libraryopen/edit/:token

```

Replace `$sitename` with the actual domain or IP address where the service is hosted. Ensure that the `:admintoken` matches the one set in the `.env` file. Admins should keep the token secure.
