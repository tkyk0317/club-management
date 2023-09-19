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

.PHONY: clippy
clippy:
	docker exec -ti rust-backend cargo clippy

.PHONY: fmt
fmt:
	docker exec -ti rust-backend cargo fmt

