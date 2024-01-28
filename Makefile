DEV_SERVER_DIR := build
IMAGE := kevinrutherford/rookery-ui
IMAGE_VERSION := $(shell git describe --tags)
SRC_DIR := ./app

SOURCES := $(shell find $(SRC_DIR) -type f)

MK_COMPILED := .mk-compiled
MK_IMAGE := .mk-image
MK_LINTED := .mk-linted

.PHONY: all ci-* clean clobber dev prod watch-*

all: $(MK_COMPILED) $(MK_LINTED)

# Software development - - - - - - - - - - - - - - - - - - - - - - - - - - - -

dev: node_modules
	npx remix dev

watch-compiler: node_modules
	npx tsc --watch

$(MK_COMPILED): $(SOURCES) node_modules tsconfig.json
	npx tsc --noEmit
	touch $@

$(MK_LINTED): $(SOURCES) node_modules .eslintrc.json
	npx eslint --ext .js,.ts,.tsx $(SRC_DIR)
	@touch $@

# CI pipeline - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

ci-test: clean $(MK_COMPILED) $(MK_LINTED)

# Production build - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$(MK_IMAGE): $(SOURCES) Dockerfile
	docker build --tag $(IMAGE):$(IMAGE_VERSION) .
	@touch $@

preview: $(MK_IMAGE)
	docker run -p 3000:3000 -it --rm $(IMAGE):$(IMAGE_VERSION)

release: $(MK_IMAGE)
	docker push $(IMAGE):$(IMAGE_VERSION)
	docker tag $(IMAGE):$(IMAGE_VERSION) $(IMAGE):latest
	docker push $(IMAGE):latest

# Artefacts - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

node_modules: package.json
	npm install
	@touch $@

# Utilities - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

clean:
	rm -f .mk-*
	rm -rf ./$(DEV_SERVER_DIR)

clobber: clean
	rm -rf node_modules
	docker system prune --force --volumes

