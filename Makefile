.PHONY: all

all:

dev:
	npx remix dev -c "node server.mjs"

build:
	npx remix build

