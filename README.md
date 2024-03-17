# issslopen

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

3. Set your custom token ID inside the `SECRET_TOKEN` field in the `.env` file.

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

The service will be accessible at port 3000.

## Updating the State

To update the state, send a GET request to the following URL:

```
$sitename/sslopen/switch-ssl/SECRET_TOKEN
```

Replace `$sitename` with the actual domain or IP address where the service is hosted. Ensure that the `SECRET_TOKEN` matches the one set in the `.env` file. Admins should keep the token secure.