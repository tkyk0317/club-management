.PHONY: all
all: build up

.PHONY: build
build:
	docker-compose build

.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: logs
logs:
	docker-compose logs

.PHONY: migrate
migrate:
	docker exec rust-backend sea-orm-cli migrate up

.PHONY: front-build
front-build:
	docker-compose exec -T frontend npm run build

.PHONY: back-build
back-build:
	docker exec rust-backend cargo build

.PHONY: clippy
clippy:
	docker exec rust-backend cargo clippy

.PHONY: fmt
fmt:
	docker exec -ti rust-backend cargo fmt

.PHONY: front-test
front-test:
	docker-compose exec -T frontend npm test

.PHONY: back-test
back-test:
	docker exec rust-backend cargo test