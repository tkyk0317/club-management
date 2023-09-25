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
	docker exec -ti rust-backend sea-orm-cli migrate up

.PHONY: clippy
clippy:
	docker exec -ti rust-backend cargo clippy

.PHONY: fmt
fmt:
	docker exec -ti rust-backend cargo fmt

.PHONY: front-test
front-test:
	docker exec -ti react-frontend npm test

.PHONY: back-test
back-test:
	docker exec -ti rust-backend cargo test